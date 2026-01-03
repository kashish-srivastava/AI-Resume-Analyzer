import { useEffect, useState } from "react";
import ResumeForm from "./ResumeForm";
import ResumeCard from "./ResumeCard";
import "./ResumeList.css";

const ResumeList = () => {
  const [resumes, setResumes] = useState([]);
  const [editResume, setEditResume] = useState(null);

  const fetchData = async () => {
    const res = await fetch("http://localhost:5000/api/resume");
    const data = await res.json();
    setResumes(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const deleteResume = async (id) => {
    await fetch(`http://localhost:5000/api/resume/${id}`, {
      method: "DELETE",
    });
    fetchData();
  };

  return (
    <div className="resume-container">
      <ResumeForm fetchData={fetchData} editResume={editResume} />
      {resumes.map((r) => (
        <ResumeCard
          key={r._id}
          resume={r}
          onDelete={deleteResume}
          onEdit={setEditResume}
        />
      ))}
    </div>
  );
};

export default ResumeList;
