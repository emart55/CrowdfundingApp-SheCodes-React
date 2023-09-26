import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import ProjectForm from "../components/ProjectForm"; 

function NewProjectPage() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [formIsInvalid, setFormIsInvalid] = useState("");
  
  return (
    <div>
      <h1>Create a New Project</h1>
      <ProjectForm
        navigate={navigate}
        setErrorMessage={setErrorMessage}
        setFormIsInvalid={setFormIsInvalid}
      />
    </div>
  );
}

export default NewProjectPage;
