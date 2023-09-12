import { useEffect, useState } from 'react';
import getProjects from"../../api/getProject";

export default function useProjects() {
    
    const [projects, setProjects] =useState([]);
    const [isLoading, setIsLoading] =useState(true);
    const [error, setError] =useState();

    useEffect(() =>{
        getProjects()
        .then((projects) =>{
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
