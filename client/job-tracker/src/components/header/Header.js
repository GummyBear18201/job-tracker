import "../../styles.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import React from "react";
import { useNavigate } from "react-router-dom";

function Header(props) {
  const navigate = useNavigate();
  return (
    <div>
      <header className="header">
        <p className="text-center text-8xl mb-4 font-serif">Job Tracker</p>
      </header>

      {props.loggedIn && (
        <div className="absolute top-4 right-8 flex gap-4">
          {props.aiAna ? (
            <button
              type="button"
              className="rounded-full border-[5px] border-[rgb(35,7,69)] bg-[rgb(227,227,255)] text-purple-900 px-7 py-2 hover:bg-purple-300 transition"
              onClick={() => navigate("/job-table")}
            >
              Back
            </button>
          ) : (
            <button
              type="button"
              className="rounded-full border-[5px] border-[rgb(35,7,69)] bg-[rgb(227,227,255)] text-purple-900 px-7 py-2 hover:bg-purple-300 transition"
              onClick={() => navigate("/AiAnalyzer")}
            >
              AI analyzer
            </button>
          )}

          <button
            type="button"
            className="rounded-full border-[5px] border-[rgb(35,7,69)] bg-[rgb(227,227,255)] text-purple-900 px-10 py-2 hover:bg-purple-300 transition"
            onClick={() => navigate("/log-in")}
          >
            Log out
          </button>
        </div>
      )}
    </div>
  );
}

export default Header;
