import { Link } from "react-router-dom"
import useProjects from "../components/hooks/useProjects";
import ProjectCard from "../components/ProjectCard";
import "./styles.css"

function HomePage() {
    const { projects } = useProjects();
    console.log("projects", projects)

    return (
        <div id="project-list">
                {projects.map((projectData, key) => {                
                    return <ProjectCard key={key} projectData={projectData} />;            
                })}
        </div>
    );
}

export default HomePage;