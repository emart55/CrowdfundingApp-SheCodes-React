import React from "react";
import { Link } from "react-router-dom";
import useProjects from "../components/hooks/useProjects";
import ProjectCard from "../components/ProjectCard";
import { useAuth } from "../components/hooks/use-auth";
import "./styles.css";

function HomePage() {
  const { projects, isLoading, error } = useProjects();
  const { auth } = useAuth();

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>{error.message}</p>;
  }

  return (
    <div>
      <div id="project-list">
        {projects
          .filter((project) => project["is_open"])
          .map((projectData, key) => (
            <ProjectCard key={key} projectData={projectData} />
          ))}
      </div>
      <div className="buttons-container">
        {auth.token ? (
          <Link to="/new-project" className="button">
            Start Fundraising
          </Link>
        ) : (
          <Link to="/login" className="button">
            Log In to Start Fundraising
          </Link>
        )}
        <Link to="/projects" className="button">
          Explore More Projects
        </Link>
      </div>
    </div>
  );
}

export default HomePage;

