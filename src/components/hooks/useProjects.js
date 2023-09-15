import { useEffect, useState } from 'react';
import getProjects from "../../api/getProjects";

export default function useProjects() {
    
    const [projects, setProjects] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState();

    useEffect(() =>{
        getProjects()
        .then((projects) => {
            console.log("GET PROJECTS", projects)
            setProjects(projects);
            setIsLoading(false);
        })
        .catch((error) =>{
            setError(error);
            setIsLoading(false);
        });
    }, []);

    return{ projects, isLoading, error };
}
