'use client';
import React, { useState, ChangeEvent, FormEvent } from 'react';
import styles from './App.module.css'; // Importing the CSS Module

// Define the type for the form data
interface FormData {
  id: string;
  pin: string;
}

const App: React.FC = () => {
  // State to hold form data
  const [formData, setFormData] = useState<FormData>({
    id: '',
    pin: ''
  });

  // Handle input changes
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Add your logic for form submission here
    console.log('Form submitted:', formData);
  };

  return (
    <div className={styles.formContainer}>
      <h1 className={styles.title}>Submit Your ID and PIN</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="id" className={styles.label}>ID:</label>
          <input
            type="text"
            id="id"
            name="id"
            value={formData.id}
            onChange={handleChange}
            required
            placeholder="Enter your ID"
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="pin" className={styles.label}>PIN:</label>
          <input
            type="password"
            id="pin"
            name="pin"
            value={formData.pin}
            onChange={handleChange}
            required
            placeholder="Enter your PIN"
            className={styles.input}
          />
        </div>
        <button type="submit" className={styles.submitButton}>Submit</button>
      </form>
    </div>
  );
}

export default App;
