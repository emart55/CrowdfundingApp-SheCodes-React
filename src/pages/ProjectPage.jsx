import { Link, useParams } from "react-router-dom";
import useProject from "../components/hooks/useProject";
import { useAuth } from "../components/hooks/use-auth";
import useMyProjects from "../components/hooks/useProject";
import "./ProjectPage.css";

function formatDate(dateString) {
    // Create a JavaScript Date object from the ISO date string
    const date = new Date(dateString);
  
    // Format the date to a readable format, e.g., "Month Day, Year"
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString(undefined, options);
  }
  
  function ProjectPage() {
    const { id } = useParams();
    const { project, isLoading, error } = useProject(id);
  
    if (isLoading) {
      return <p>Loading.</p>;
    }
  
    if (error) {
      return <p>{error.message}</p>;
    }
  
    const formattedDate = formatDate(project.date_created);
  
    return (
      <div className="container">
        <h2 className="project-title">{project.title}</h2>
        <div className="project-info">
          <h3>Created at: {formattedDate}</h3>
          <h3>{`Status: ${project.is_open ? "Open" : "Closed"}`}</h3>
        </div>
        <h3>Pledges:</h3>
        <ul className="pledge-list">
          {project.pledges.map((pledgeData, key) => (
            <li className="pledge-item" key={key}>
              <div className="pledge-details">
                <div className="pledge-amount">
                  <strong>Amount:</strong> {pledgeData.amount}
                </div>
                <div className="pledge-supporter">
                  <strong>From:</strong>{" "}
                  {pledgeData.supporter
                    ? pledgeData.supporter.username
                    : "Anonymous"}
                </div>
                {pledgeData.comment && (
                  <div className="pledge-comment">
                    <strong>Comment:</strong> {pledgeData.comment}
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  
  export default ProjectPage;
  