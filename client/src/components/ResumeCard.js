const calculateScore = (skills) => {
  const requiredSkills = ["React", "Node", "MongoDB"];
  let score = 0;

  requiredSkills.forEach((skill) => {
    if (skills.toLowerCase().includes(skill.toLowerCase())) {
      score += 30;
    }
  });

  return score;
};

const ResumeCard = ({ resume, onDelete, onEdit }) => {
  return (
    <div className="resume-card">
      <h3>{resume.name}</h3>
      <p>Email: {resume.email}</p>
      <p>Skills: {resume.skills}</p>

      <button onClick={() => onEdit(resume)}>Edit</button>
      <button
        className="delete-btn"
        onClick={() => onDelete(resume._id)}
      >
        Delete
      </button>
    </div>
  );
};

export default ResumeCard;
