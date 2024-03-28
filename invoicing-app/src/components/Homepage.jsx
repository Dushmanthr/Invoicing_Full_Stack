import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Homepage.css'; 
import { FaUser } from 'react-icons/fa';

import Dashboard from './Dashboard';
import InvoiceList from './InvoiceList';
import AddInvoice from './AddInvoice';
import EditInvoice from './EditInvoice';

const Homepage = () => {
  const [currentContent, setCurrentContent] = useState('Dashboard');

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleLoginStatus = () => {
    setIsLoggedIn(!isLoggedIn);
  };


  const handleSidebarClick = (content) => {
    setCurrentContent(content);
  };

  return (
    <div className="homepage-container"> 
        <div className="sidebar">
            <div className="sidebar-header">
                <h2>ABC Systems</h2>
            </div>
            <ul className="sidebar-menu">
                <li onClick={() => handleSidebarClick('Dashboard')} className={currentContent === 'Dashboard' ? 'current' : ''}>
                    <Link to="/" style={{ color: '#fff' }}>Dashboard</Link>
                </li>
                <li onClick={() => handleSidebarClick('Add Invoice')} className={currentContent === 'Add Invoice' ? 'current' : ''}>
                    <Link to="/invoices/add" style={{ color: '#fff' }}>Add Invoice</Link>
                </li>
                <li onClick={() => handleSidebarClick('Invoice List')} className={currentContent === 'Invoice List' ? 'current' : ''}>
                    <Link to="/invoices" style={{ color: '#fff' }}>Invoice List</Link>
                </li>
            </ul>
        </div>

      <div className="main-content">
        <nav className="top-nav">
          <ul>
          <li className="login-icon" onClick={toggleLoginStatus}>
              <FaUser />
            </li>
          </ul>
        </nav>

        <div className="content">
          {currentContent === 'Dashboard' && <Dashboard />}
          {currentContent === 'Invoice List' && <InvoiceList />}
          {currentContent === 'Add Invoice' && <AddInvoice />}
          {currentContent === 'Edit Invoice' && <EditInvoice />}
        </div>
      </div>
    </div>
  );
};

export default Homepage;
