import "bootstrap/dist/css/bootstrap.min.css";
import JobTable from "./components/job-table/JobTable";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LogIn from "./components/log-in/LogIn";
import { useState } from "react";
import AiAnalyzer from "./components/ai-analyzer/ai-analyzer";
function App() {
  const [userId, setUserId] = useState("");
  function settingUserId(id) {
    setUserId(id);
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LogIn setUserId={settingUserId} />} />
        <Route path="/job-table" element={<JobTable userId={userId} />} />
        <Route path="/log-in" element={<LogIn setUserId={settingUserId} />} />
        <Route path="/ai-analyzer" element={<AiAnalyzer />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
