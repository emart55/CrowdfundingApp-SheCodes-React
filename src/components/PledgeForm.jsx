import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import postPledge from "../api/postPledge";
import getProjects from "../api/getProjects";

function PledgeForm({ onPledgeSubmit }) {
  const location = useLocation();
  const projectId = new URLSearchParams(location.search).get("project");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formIsInvalid, setFormIsInvalid] = useState("");
  const [pledgeDetails, setPledgeDetails] = useState({
    amount: "",
    comment: "",
    anonymous: false,
    project: projectId || "", // Initialize with the projectId from the URL
  });
  const [projects, setProjects] = useState([]); // State to store projects

  // Fetch projects when the component mounts
  useEffect(() => {
    fetchProjects();
  }, []);

  // Function to fetch projects
  const fetchProjects = async () => {
    try {
      const response = await getProjects(); 
      setProjects(response); 
    } catch (error) {
      console.error("Error fetching projects: ", error);
    }
  };

  const handleChange = (event) => {
    const { id, value } = event.target;
    setPledgeDetails((prevDetails) => ({
      ...prevDetails,
      [id]: value,
    }));
    const checked = event.target.checked;
    const checkedName = event.target.name;
    console.log(checked, checkedName);
    if (checkedName === "anonymous") {
      pledgeDetails.anonymous = checked;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setFormIsInvalid("");
    setErrorMessage("");
    if (pledgeDetails.amount && pledgeDetails.project) {
      postPledge(
        pledgeDetails.amount,
        pledgeDetails.comment,
        pledgeDetails.anonymous,
        pledgeDetails.project
      )
        .then((response) => {
          // Update pledges state with the newly submitted pledge
          onPledgeSubmit(response);

          // Clear the form and show the success message
          setIsSubmitted(true);
        })
        .catch((error) => {
          setErrorMessage(error.message.split(","));
        });
    } else {
      setFormIsInvalid("Enter pledge amount and select a project.");
    }
  };

  return (
    <section>
      <form className={isSubmitted ? "hidden" : "form"}>
        <div>
          <label htmlFor="amount">Amount:</label>
          <input
            type="float"
            name="amount"
            id="amount"
            placeholder="Enter amount"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="comment">Comment:</label>
          <input
            type="text"
            name="comment"
            id="comment"
            placeholder="comment"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="project">Select a Project:</label>
          <select
            name="project"
            id="project"
            onChange={handleChange}
            value={pledgeDetails.project} 
          >
            <option value="">Select a project</option>
            {projects.map((project) => (
              <option key={project.id} value={project.id}>
                {project.title}
              </option>
            ))}
          </select>
        </div>
        <div className="checkbox">
          <label htmlFor="anonymous">Want to remain anonymous?</label>
          <input
            type="checkbox"
            name="anonymous"
            id="anonymous"
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="button" onClick={handleSubmit}>
          Submit
        </button>
        <p className="error-message">{errorMessage}</p>
        <p>{formIsInvalid}</p>
      </form>
      <article className={isSubmitted ? "desktop-inline-buttons" : "hidden"}>
        {isSubmitted && (
          <>
            <b>You've Lent more than AHand in making a difference!</b>
            <li>
              <Link to="/projects">View other projects</Link>
            </li>
          </>
        )}
      </article>
    </section>
  );
}

export default PledgeForm;
