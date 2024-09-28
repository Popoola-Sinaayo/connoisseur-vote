'use client';
import React, { useEffect, useState } from 'react';
import styles from './App.module.css'; // Importing the CSS Module
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';

// Define the type for the candidate data
interface Candidate {
  _id: number;
  name: string;
  party: string;
  votes: number; // Added votes to track the accumulated votes
}


const App: React.FC = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);

 useEffect(() => {
   const getCandidates = async () => {
     const response = await axios.get("/api/candidates");
     if (response.status === 200) {
       console.log(response.data);
       setCandidates(response.data);
     }
   };
   getCandidates();
 }, []);

  return (
    <div className={styles.container}>
      <h1>Voting Results</h1>

      <div className={styles.candidatesList}>
        {candidates.map((candidate) => (
          <div key={candidate._id} className={styles.candidateCard}>
            <h2 className={styles.h2}>{candidate.name}</h2>
            <p className={styles.p}>Party: {candidate.party}</p>
            <p className={styles.p}>Votes: {candidate.votes}</p> {/* Display the accumulated votes */}
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
