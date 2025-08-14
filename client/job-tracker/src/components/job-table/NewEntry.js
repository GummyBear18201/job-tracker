import React, { useEffect, useState } from "react";
function NewEntry(props) {
  const [date, setDate] = useState("");
  const [company, setCompany] = useState("");
  const [links, setLinks] = useState("");
  const [status, setStatus] = useState("Applied");
  const [notes, setNotes] = useState("");
  function onChangeDate(event) {
    const newDate = event.target.value;
    setDate(newDate);
  }
  function onChangeCompany(event) {
    const newCompany = event.target.value;
    setCompany(newCompany);
  }
  function onChangeLinks(event) {
    const newLinks = event.target.value;
    setLinks(newLinks);
  }
  function onChangeStatus(event) {
    const newStatus = event.target.value;
    setStatus(newStatus);
  }
  function onChangeNotes(event) {
    const newNotes = event.target.value;
    setNotes(newNotes);
  }
  useEffect(() => {
    if (props.initialData) {
      setDate(props.initialData.date?.slice(0, 10));
      setCompany(props.initialData.company || "");
      setLinks(props.initialData.links || "");
      setStatus(props.initialData.status || "Applied");
      setNotes(props.initialData.notes || "");
    }
  }, [props.initialData]);

  return (
    <div className={`container text-center my-2 py-2 border rounded `}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          props.sendData(date, company, links, status, notes);
        }}
      >
        <div className="row align-items-start">
          <div className="col">
            <input
              type="date"
              value={date}
              onChange={onChangeDate}
              placeholder="Date Applied"
              className="form-control"
            />
          </div>
          <div className="col">
            <input
              type="text"
              value={company}
              onChange={onChangeCompany}
              placeholder="Company"
              className="form-control"
            />
          </div>
          <div className="col">
            <input
              type="url"
              value={links}
              onChange={onChangeLinks}
              placeholder="Links"
              className="form-control"
            />
          </div>
          <div className="col">
            <select
              onChange={onChangeStatus}
              value={status}
              className="form-select"
            >
              <option value="Applied">Applied</option>
              <option value="Interviewed">Interviewed</option>
              <option value="Rejected">Rejected</option>
              <option value="Hired">Hired</option>
            </select>
          </div>
          <div className="col">
            <textarea
              onChange={onChangeNotes}
              value={notes}
              placeholder="Notes"
              className="form-control"
            />
          </div>
          <div className="col">
            <button type="submit" className="btn btn-success">
              {props.isUpdate ? "Update Job" : "Add Job"}
            </button>{" "}
          </div>
        </div>
      </form>
    </div>
  );
}
export default NewEntry;
