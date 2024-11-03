import React, { useState, useEffect } from 'react';
import NewClient from './NewClient';
import styles from '../styles/Dashboard.module.css';
import axios from 'axios';
import avatar from '../resources/avatar.png';
import logo from '../resources/logo.png';
const Dashboard = ({ onLogout }) => {
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    // Fetch clients from the API when the component mounts
   const fetchClients = async () => {
   const response = await axios.get('http://localhost:5001/api/allclients');
          const data  = response.data;
          setClients(data);

     /* try {       
        const response = await fetch('http://localhost:5001/api/clients');
        const data = await response.json();
        setClients(data);
      } catch (error) {
        console.error('Failed to fetch clients:', error);
      }*/
    };

    fetchClients();
  }, []);
  useEffect(() => {
    // Fetch clients from the API when the component mounts
    const fetchClients = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/allclients');
        const data = await response.json();
        setClients(data);
      } catch (error) {
        console.error('Failed to fetch clients:', error);
      }
    };

    fetchClients();
  }, [isCreating]);
  const handleRowClick = (client) => {
    setSelectedClient(client);
  };

  const handleCloseDetail = () => {
    setSelectedClient(null);
  };

  const handleSaveClient =  (newClient) => {
    console.log("This function is triggered!"+newClient);
    setClients((prevClients) => [...prevClients, newClient]);
   
    /*try {
        const response = await fetch('/api/clients',{
            method: 'POST', // Specify the HTTP method
            headers: {
                'Content     -Type': 'application/json', // Specify the content type
            },
            body: newClient, // Convert the JavaScript object to a JSON string
        });
        const data = await response.json();
        //setClients(data);
      } catch (error) {
        console.error('Failed to fetch clients:', error);
      }*/
        axios.post( 'http://localhost:5001/api/clients', newClient)
        .then(result => {
            console.log(result);
            if(result.data === "success"){
                alert("success!");
            
            }
            else{
                alert("Error")

            }
            
        })
        .catch(err => console.log(err));
        setIsCreating(false);
  };

  const handleCancelNewClient = () => {
    setIsCreating(false);
  };

  return (
    <div className={styles.dashboardContainer}>
      {/* Top Bar */}
      <div className={styles.topBar}>
        <div className={styles.siteIcon}>
          <img src={logo} alt="Site Icon" />
        </div>
        <div className={styles.dashboardTitle}>Client Management Dashboard</div>
        <div className={styles.userSection}>
          <span>Welcome, alex!</span>
          <div className={styles.avatar} onClick={() => onLogout()}>
            <img src={avatar} alt="User Avatar" />
            <div className={styles.logoutDropdown}>
              <button onClick={onLogout}>Logout</button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={styles.content}>
        <div className={styles.clientsSection}>
          <h3>{clients.length} clients</h3>
          <button className={styles.newButton} onClick={() => setIsCreating(true)}>
            New
          </button>

          {/* Clients Table */}
          <table className={styles.clientsTable}>
            <thead>
              <tr>
              <th>     </th>
                <th>Name</th>
                <th>Company</th>
                <th>Reg. Date</th>
                <th>Plan</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client) => (
                <tr key={client.id} onClick={() => handleRowClick(client)}>
                <td></td>
                  <td>{client.name}</td>
                  <td>{client.company}</td>
                  <td>{client.registrationDate}</td>
                  <td>{client.plan}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Detail View or New Client Form */}
        {selectedClient && (
          <div className={styles.detailPanel}>
            <h4>Client Details</h4>
            <p><strong>Name:</strong> {selectedClient.name}</p>
            <p><strong>Company:</strong> {selectedClient.company}</p>
            <p><strong>Registration Date:</strong> {selectedClient.registrationDate}</p>
            <p><strong>Plan:</strong> {selectedClient.plan}</p>
            <button onClick={handleCloseDetail} className={styles.closeButton}>Close</button>
          </div>
        )}
        
        {isCreating && (
          <div className={styles.newClientPanel}>
            <NewClient onSave={handleSaveClient} onCancel={handleCancelNewClient} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
