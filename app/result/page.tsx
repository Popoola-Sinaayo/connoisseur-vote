'use client';
import React, { useState } from 'react';
import styles from './App.module.css'; // Importing the CSS Module

// Define the type for the candidate data
interface Candidate {
  id: number;
  name: string;
  party: string;
  votes: number; // Added votes to track the accumulated votes
}

// Example candidate data with initial votes set to 0
const initialCandidates: Candidate[] = [
  { id: 1, name: 'John Doe', party: 'Party A', votes: 0 },
  { id: 2, name: 'Jane Smith', party: 'Party B', votes: 0 },
  { id: 3, name: 'Michael Johnson', party: 'Party C', votes: 0 }
];

const App: React.FC = () => {
  const [candidates, setCandidates] = useState<Candidate[]>(initialCandidates);

  // Handle vote action and accumulate votes
  const handleVote = (candidateId: number) => {
    setCandidates(candidates.map(candidate =>
      candidate.id === candidateId
        ? { ...candidate, votes: candidate.votes + 1 }
        : candidate
    ));
  };

  return (
    <div className={styles.container}>
      <h1>Voting Results</h1>

      <div className={styles.candidatesList}>
        {candidates.map((candidate) => (
          <div key={candidate.id} className={styles.candidateCard}>
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
