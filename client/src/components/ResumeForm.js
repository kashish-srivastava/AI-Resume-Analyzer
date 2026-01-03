import React, { useState, useEffect } from "react";

const ResumeForm = ({ fetchData, editResume }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [skills, setSkills] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [aiResult, setAiResult] = useState(null);

  // Auto-fill form when editResume changes
  useEffect(() => {
    if (editResume) {
      setName(editResume.name);
      setEmail(editResume.email);
      setSkills(editResume.skills.join(", "));
      setAiResult(null); // clear AI result on edit
    }
  }, [editResume]);

  // Handle Add / Update submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const url = editResume
        ? `http://localhost:5000/api/resume/${editResume._id}`
        : "http://localhost:5000/api/resume";

      const method = editResume ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          skills: skills.split(",").map((s) => s.trim()),
        }),
      });

      if (!res.ok) throw new Error("Failed");

      setMessage(editResume ? "Resume updated ✅" : "Resume added ✅");

      // Reset form
      setName("");
      setEmail("");
      setSkills("");
      setAiResult(null);

      fetchData();
    } catch (err) {
      console.log(err);
      setMessage("Something went wrong ❌");
    } finally {
      setLoading(false);
    }
  };

  // Handle AI analyze
  const handleAnalyze = async () => {
    if (!skills) return alert("Please enter skills first");

    try {
      const res = await fetch("http://localhost:5000/api/ai/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          skills: skills.split(",").map((s) => s.trim()),
        }),
      });

      const data = await res.json();
      setAiResult(data);
    } catch (err) {
      console.log(err);
      alert("AI Analysis failed ❌");
    }
  };

  return (
    <div style={{ margin: "20px 0" }}>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          placeholder="Skills (comma separated)"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          required
        />
        <div style={{ display: "flex", gap: "10px" }}>
          <button type="submit" disabled={loading}>
            {loading
              ? "Saving..."
              : editResume
              ? "Update Resume"
              : "Add Resume"}
          </button>
          <button type="button" onClick={handleAnalyze}>
            Analyze Skills
          </button>
        </div>
      </form>

      {message && <p style={{ marginTop: "10px", color: "green" }}>{message}</p>}

      {aiResult && (
        <div style={{ marginTop: "10px", padding: "10px", border: "1px solid #ccc" }}>
          <h4>AI Skill Analysis</h4>
          <p><strong>Matched Skills:</strong> {aiResult.matched.join(", ") || "None"}</p>
          <p><strong>Missing Skills:</strong> {aiResult.missing.join(", ") || "None"}</p>
          <p><strong>Score:</strong> {aiResult.score}%</p>
          <div style={{ background: "#eee", width: "100%", height: "10px", borderRadius: "5px" }}>
            <div style={{
              width: `${aiResult.score}%`,
              height: "100%",
              background: aiResult.score > 50 ? "green" : "red",
              borderRadius: "5px"
            }} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeForm;