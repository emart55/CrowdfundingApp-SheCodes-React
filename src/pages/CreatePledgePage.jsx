import React, { useEffect, useState } from "react";
import PledgeForm from "../components/PledgeForm";
import getPledges from "../api/getPledges";

function CreatePledgePage() {
  const [pledges, setPledges] = useState([]); // Initialize state to store pledges

  // Fetch pledges when the component mounts
  useEffect(() => {
    fetchPledges();
  }, []);

  // Function to fetch pledges
  const fetchPledges = async () => {
    try {
      const response = await getPledges(); // Use the appropriate function to fetch pledges
      setPledges(response); // Update the state with fetched pledges
    } catch (error) {
      console.error("Error fetching pledges: ", error);
    }
  };

  // Function to add a new pledge to the pledges state
  const addPledge = (newPledge) => {
    setPledges([...pledges, newPledge]);
  };

  return (
    <div>
      <h1>Pledge to LendAHand.</h1>
      <PledgeForm onPledgeSubmit={addPledge} />
      <div>
        <ul>
          {pledges.map((pledge) => (
            <li key={pledge.id}>
              Amount: {pledge.amount}, Comment: {pledge.comment}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default CreatePledgePage;

