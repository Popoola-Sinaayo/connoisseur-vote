'use client'
import React, { useState } from 'react';
import styles from './App.module.css'; // Importing the CSS Module

// Define the type for the candidate data
interface Candidate {
  id: number;
  name: string;
  party: string;
}

// Example candidate data
const candidates: Candidate[] = [
  { id: 1, name: 'John Doe', party: 'Party A' },
  { id: 2, name: 'Jane Smith', party: 'Party B' },
  { id: 3, name: 'Michael Johnson', party: 'Party C' }
];

const App: React.FC = () => {
  const [selectedCandidate, setSelectedCandidate] = useState<number | null>(null);

  // Handle vote action
  const handleVote = (candidateId: number) => {
    setSelectedCandidate(candidateId);
    alert(`You have voted for candidate ${candidateId}`);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <button className={styles.progressReportButton}>Progress Report</button>
      </header>

      <div className={styles.candidatesList}>
        <h1>Candidates</h1>
        {candidates.map((candidate) => (
          <div key={candidate.id} className={styles.candidateCard}>
            <h2 className={styles.h2}>{candidate.name}</h2>
            <p className={styles.p}>Party: {candidate.party}</p>
            <button
              onClick={() => handleVote(candidate.id)}
              className={styles.voteButton}
            >
              Vote
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
