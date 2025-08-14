import React, { useEffect, useState } from "react";

function GoalTracker(props) {
  const radius = 400;
  const stroke = 50;
  const normalizedRadius = radius - stroke * 2;

  const [editing, setEditing] = useState(false);
  const [goal, setGoal] = useState(50);
  const [tempGoal, setTempGoal] = useState(goal);
  useEffect(() => {
    fetch(`http://localhost:5000/getGoal/${props.userID}`)
      .then((res) => res.json())
      .then((goal) => setGoal(goal || 50));
  }, [props.userID]);

  const percent = Math.min(100, (props.total / goal) * 100);
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percent / 100) * circumference;
  const saveGoal = () => {
    if (!isNaN(tempGoal) && Number(tempGoal) > 0) {
      setGoal(Number(tempGoal));
      setEditing(false);

      fetch("http://localhost:5000/editGoal", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: props.userID, goal: Number(tempGoal) }),
      })
        .then((res) => res.json())
        .then(() => {
          console.log("Goal updated successfully");
        });
    }
  };

  return (
    <div
      className="relative flex flex-col items-center"
      style={{ width: radius * 2, height: radius * 2 }}
    >
      <svg height={radius * 2} width={radius * 2}>
        <circle
          stroke="#c4b5fd"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <circle
          stroke="#7c3aed"
          fill="transparent"
          strokeWidth={stroke}
          strokeDasharray={circumference + " " + circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          style={{ transition: "stroke-dashoffset 0.5s ease" }}
        />
      </svg>

      <div
        className="absolute flex flex-col align-items-center justify-content-center w-100 h-100"
        style={{
          top: 0,
          left: 0,
          height: "100%",
          width: "100%",
          pointerEvents: "none",
        }}
      >
        <div className="text-purple-900 fw-bold fs-4 mb-1">Goal Progress</div>
        <div className="text-purple-700 fw-semibold fs-5 mb-2">
          {props.total} / {goal} ({percent.toFixed(0)}%)
        </div>

        {editing ? (
          <div
            className="d-flex gap-2 align-items-center"
            style={{ pointerEvents: "auto" }}
          >
            <input
              type="number"
              value={tempGoal}
              onChange={(e) => setTempGoal(e.target.value)}
              className="form-control text-center"
              style={{ width: "80px" }}
            />
            <button onClick={saveGoal} className="btn btn-success btn-sm">
              Save
            </button>
            <button
              onClick={() => setEditing(false)}
              className="btn btn-secondary btn-sm"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={() => {
              setTempGoal(goal);
              setEditing(true);
            }}
            className="btn btn-outline-primary btn-sm"
            style={{ pointerEvents: "auto" }}
          >
            ✏️ Edit Goal
          </button>
        )}
      </div>
    </div>
  );
}

export default GoalTracker;
