import React, { useState, useEffect } from "react";
import Header from "../header/Header";
function AiAnalyzer() {
  const [resumeFile, setResumeFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [coverLetter, setCoverLetter] = useState("");
  const [displayError, setDisplayError] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!resumeFile || !jobDescription.trim()) {
      setDisplayError(true);
      return;
    }

    setLoading(true);
    setCoverLetter("");

    const formData = new FormData();
    formData.append("resume", resumeFile);
    formData.append("jobDescription", jobDescription);

    try {
      const res = await fetch(
        "http://192.168.0.172:5000/api/generateCoverLetter",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
      setCoverLetter(data.coverLetter || "No cover letter generated.");
    } catch (err) {
      console.error("Error generating cover letter:", err);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-gradient-to-t from-purple-300 to-transparent h-screen flex flex-col">
      <Header loggedIn={true} aiAna={true} />
      <h1 className="text-2xl font-bold mb-4 text-center">
        AI Cover Letter Generator
      </h1>
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="space-y-4 max-w-xl mx-auto w-full"
      >
        <div>
          <label className="block mb-1 font-medium">Upload Resume</label>
          <input
            type="file"
            accept=".pdf,.docx"
            onChange={(e) => setResumeFile(e.target.files[0])}
            className="w-full border rounded p-2"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">
            Paste Job Description
          </label>
          <textarea
            placeholder="Paste the full job description here..."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            rows={6}
            className="w-full border rounded p-2"
          />
        </div>
        <div className="flex justify-center">
          {displayError && (
            <p className="text-red-500 mb-2">
              Please fill in all fields before submitting.
            </p>
          )}{" "}
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            {loading ? "Generating..." : "Generate Cover Letter"}
          </button>
        </div>
      </form>

      {coverLetter && (
        <div className="mt-6">
          <h2 className="text-lg font-bold mb-2">Your Cover Letter</h2>
          <pre className="whitespace-pre-wrap bg-gray-100 p-4 rounded border">
            {coverLetter}
          </pre>
        </div>
      )}
    </div>
  );
}
export default AiAnalyzer;
