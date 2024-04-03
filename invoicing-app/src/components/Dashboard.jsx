import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css';

const Dashboard = () => {
  const [totalInvoices, setTotalInvoices] = useState(0);
  const [totalCustomers, setTotalCustomers] = useState(0);

  useEffect(() => {
    axios.get('/api/invoices/count')
      .then(response => {
        setTotalInvoices(response.data.totalInvoices);
      })
      .catch(error => {
        console.error('Error fetching total invoices count:', error.response);
      });
  
    axios.get('/api/customers/count')
      .then(response => {
        setTotalCustomers(response.data.totalCustomers);
      })
      .catch(error => {
        console.error('Error fetching total customers count:', error.response);
      });
  }, []);  

  return (
    <div className="dashboard">
      <h2>WELCOME !</h2>
      <div className="dashboard-stats">
        <div className="dashboard-stat">
          <div className="stat-value">{totalInvoices}</div>
          <div className="stat-label">Total Invoices</div>
        </div>
        <div className="dashboard-stat">
          <div className="stat-value">{totalCustomers}</div>
          <div className="stat-label">Total Customers</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

