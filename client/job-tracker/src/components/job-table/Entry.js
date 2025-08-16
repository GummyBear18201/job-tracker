import React, { useEffect, useState } from "react";
import NewEntry from "./NewEntry";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";

function Entry(props) {
  const [updateMode, setUpdateMode] = useState(false);
  const [date, setDate] = useState(props.date);
  useEffect(() => {
    setDate(new Date(props.date).toLocaleDateString());
  }, [props.date]);
  function sendUpdateItem(date, company, links, status, notes) {
    const jobData = {
      date,
      company,
      status,
      links,
      notes,
      id: props.id,
      user_id: props.userId,
    };
    console.log("Sending updated data:", jobData);

    fetch("http://192.168.0.172:5000/api/jobTable/edit", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jobData),
    })
      .then((res) => res.json())
      .then(() => {
        setUpdateMode(false);
        props.fetchJobs();
      })
      .catch((err) => console.error("POST failed:", err));
  }

  return (
    <div>
      {updateMode ? (
        <NewEntry
          sendData={sendUpdateItem}
          initialData={{
            date: props.date,
            company: props.company,
            links: props.links,
            status: props.status,
            notes: props.notes,
          }}
          isUpdate={true}
        />
      ) : (
        <div className={`container text-center my-2 py-2 border rounded `}>
          <div className="row align-items-start">
            <div className="col">{props.number}</div>
            <div className="col">{date}</div>
            <div className="col">{props.company}</div>
            <div className="col">{props.links}</div>
            <div className="col">{props.status}</div>
            <div className="col">{props.notes}</div>
            <div className="col">
              <button class="btn btn-info" onClick={() => setUpdateMode(true)}>
                <FontAwesomeIcon icon={faPencil} title="Edit" />
              </button>{" "}
            </div>

            <div className="col">
              <button
                class="btn btn-danger"
                onClick={() => {
                  props.onDelete(props.id);
                }}
              >
                <FontAwesomeIcon icon={faTrash} title="Delete" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default Entry;
