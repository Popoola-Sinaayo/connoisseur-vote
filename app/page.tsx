/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import styles from "./App.module.css"; // Importing the CSS Module
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useRouter } from "next/navigation";

// Define the type for the form data
interface FormData {
  id: string;
  pin: string;
}

const App: React.FC = () => {
  const router = useRouter();
  // State to hold form data
  const [formData, setFormData] = useState<FormData>({
    id: "",
    pin: "",
  });

  // Handle input changes
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      if (!formData.id || !formData.pin) {
        toast.error("Please fill all fields");
        return;
      }
      console.log(formData);
      const response = await axios.post("/api/login", formData);
      console.log(response?.data);
      console.log(response?.status);
      if (response.status === 200) {
        toast.success("Login successful");
        localStorage.setItem("token", response?.data?.token);
        router.push("/vote");
      } else {
        toast.error(response?.data?.message ?? "An error occurred");
      }
    } catch (error) {
      const errorDetails: any = error;
      console.log(errorDetails?.response?.data);
      // console.log(errorDetails?.data);
      toast.error(
        errorDetails?.response?.data?.message ??
          "An error occurred while submitting the form"
      );
    }
    // Add your logic for form submission her
  };

  return (
    <div className={styles.formContainer}>
      <ToastContainer />
      <h1 className={styles.title}>Submit Your ID and PIN</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="id" className={styles.label}>
            ID:
          </label>
          <input
            type="text"
            id="id"
            name="id"
            value={formData.id}
            onChange={handleChange}
            // required
            placeholder="Enter your ID"
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="pin" className={styles.label}>
            PIN:
          </label>
          <input
            type="password"
            id="pin"
            name="pin"
            value={formData.pin}
            onChange={handleChange}
            // required
            placeholder="Enter your PIN"
            className={styles.input}
          />
        </div>
        <button type="submit" className={styles.submitButton}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default App;
