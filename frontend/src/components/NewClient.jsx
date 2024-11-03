import React, { useState } from 'react';
import styles from '../styles/NewClient.module.css';

const NewClient = ({ onSave, onCancel }) => {
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [registrationDate, setRegistrationDate] = useState('');
  const [plan, setPlan] = useState('Free');
  const [avatar, setAvatar] = useState(null);
  const [error, setError] = useState('');

  const handleAvatarChange = (event) => {
    setAvatar(event.target.files[0]);
  };

  const handleSave = () => {
    if (!name || !company || !registrationDate) {
      setError('Please fill out all fields.');
      return;
    }

    // Create a new client object
    const newClient = {
      id: Date.now(),
      name,
      company,
      registrationDate,
      plan,
      avatar
    };

    onSave(newClient); // Pass new client data back to Dashboard
  };

  return (
    <div className={styles.newClientContainer}>
      <h3>New Client</h3>
      {error && <p className={styles.error}>{error}</p>}
      
      <div className={styles.formGroup}>
        <label>Name</label>
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          placeholder="Enter client's name"
        />
      </div>
      
      <div className={styles.formGroup}>
        <label>Company</label>
        <input 
          type="text" 
          value={company} 
          onChange={(e) => setCompany(e.target.value)} 
          placeholder="Enter company name"
        />
      </div>
      
      <div className={styles.formGroup}>
        <label>Registration Date</label>
        <input 
          type="date" 
          value={registrationDate} 
          onChange={(e) => setRegistrationDate(e.target.value)} 
        />
      </div>
      
      <div className={styles.formGroup}>
        <label>Plan</label>
        <select value={plan} onChange={(e) => setPlan(e.target.value)}>
          <option value="Free">Free</option>
          <option value="Silver">Silver</option>
          <option value="Gold">Gold</option>
        </select>
      </div>

      <div className={styles.formGroup}>
        <label>Avatar</label>
        <input type="file" onChange={handleAvatarChange} />
      </div>

      <div className={styles.buttonGroup}>
        <button onClick={handleSave} className={styles.saveButton}>Save</button>
        <button onClick={onCancel} className={styles.cancelButton}>Cancel</button>
      </div>
    </div>
  );
};

export default NewClient;
