/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React, { useEffect, useState } from "react";
import styles from "./App.module.css"; // Importing the CSS Module
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

// Define the type for the candidate data
interface Candidate {
  _id: number;
  name: string;
  party: string;
}

// Example candidate data
// const candidates: Candidate[] = [
//   { id: 1, name: "John Doe", party: "Party A" },
//   { id: 2, name: "Jane Smith", party: "Party B" },
//   { id: 3, name: "Michael Johnson", party: "Party C" },
// ];

const App: React.FC = () => {
  const router = useRouter();

  const [candidates, setCandidates] = useState<Array<Candidate>>([]);

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

  // Handle vote action
  const handleVote = async (candidateId: number) => {
    try {
      // Call the vote API
      const response = await axios.post("/api/vote", {
        token: localStorage.getItem("token"),
        candidateId,
      });
      if (response.status === 200) {
        toast.success(response.data.message);
        router.push("/result");
        // alert(`You have voted for candidate ${candidateId}`);
      } else {
        toast.error(response.data.message ?? "An error occurred");
      }
    } catch (error) {
      const errorDetails: any = error;
      console.log(errorDetails?.response?.data);
      toast.error(
        errorDetails?.response?.data?.message ??
          "An error occurred while submitting the form"
      );
    }
    // alert(`You have voted for candidate ${candidateId}`);
  };

  return (
    <div className={styles.container}>
      <ToastContainer />
      <header className={styles.header}>
        <button
          className={styles.progressReportButton}
          onClick={() => {
            router.push("/result");
          }}
        >
          Progress Report
        </button>
      </header>

      <div className={styles.candidatesList}>
        <h1>Candidates</h1>
        {candidates.map((candidate) => (
          <div key={candidate._id} className={styles.candidateCard}>
            <h2 className={styles.h2}>{candidate.name}</h2>
            <p className={styles.p}>Party: {candidate.party}</p>
            <button
              onClick={() => handleVote(candidate._id)}
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
