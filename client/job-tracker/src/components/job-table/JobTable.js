import Entry from "./Entry";
import React, { useEffect, useState } from "react";
import NewEntry from "./NewEntry";
import Header from "../header/Header";
import { useNavigate } from "react-router-dom";
import GoalTracker from "./GoalTracker";
function JobTable(props) {
  const [table, setTable] = useState([]);
  const [showNewEntry, setShowNewEntry] = useState(false);
  const [totalJobs, setTotalJobs] = useState(0);
  const navigate = useNavigate();
  const fetchJobs = () => {
    fetch(`http://192.168.0.172:5000/api/jobTable/${props.userId}`)
      .then((res) => res.json())
      .then((data) => setTable(Array.isArray(data) ? data : []));
  };

  useEffect(() => {
    if (!props.userId) {
      navigate("/log-in");
    } else {
      fetchJobs();
    }
  }, [props.userId]);

  useEffect(() => {
    setTotalJobs(table.length);
  }, [table]);

  function sendAddItem(date, company, links, status, notes) {
    const jobData = {
      date,
      company,
      status,
      links,
      notes,
      user_id: props.userId,
    };

    fetch("http://192.168.0.172:5000/api/jobTable/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jobData),
    })
      .then((res) => res.json())
      .then(() => {
        setShowNewEntry(false);
        fetchJobs();
      })
      .catch((err) => console.error("POST failed:", err));
  }
  function create(entry, index) {
    return (
      <Entry
        key={entry.id}
        id={entry.id}
        number={index + 1}
        date={entry.date}
        links={entry.links}
        company={entry.company}
        status={entry.status}
        notes={entry.notes}
        userId={props.userId}
        onDelete={deleteItem}
        fetchJobs={fetchJobs}
      />
    );
  }
  function deleteItem(id) {
    console.log("Delete item with id:", id);
    fetch(`http://192.168.0.172:5000/api/jobTable/delete/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.message);
        fetchJobs();
      })
      .catch((err) => console.error("DELETE failed:", err));
  }

  return (
    <div className="bg-gradient-to-t from-purple-300 to-transparent h-screen flex flex-col">
      <Header loggedIn={true} />

      <div className="flex flex-row flex-1">
        <div className="w-1/3 p-4">
          <GoalTracker userID={props.userId} total={totalJobs} />
        </div>

        <div className="w-2/3 p-4 flex flex-col">
          {table.map(create)}

          {showNewEntry && <NewEntry sendData={sendAddItem} />}

          <div className="flex justify-center mt-3">
            <button
              onClick={() => setShowNewEntry(!showNewEntry)}
              className={`px-4 py-2 rounded-lg font-semibold text-white shadow transition 
        ${
          showNewEntry
            ? "bg-red-500 hover:bg-red-600"
            : "bg-blue-500 hover:bg-blue-600"
        }`}
            >
              {showNewEntry ? "Abort Entry" : "Add new job"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobTable;
