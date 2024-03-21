import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Homepage.css'; // Import stylesheet for homepage styles
import { FaUser } from 'react-icons/fa';

import Dashboard from './Dashboard';
import InvoiceList from './InvoiceList';
import AddInvoice from './AddInvoice';
import EditInvoice from './EditInvoice';

const Homepage = () => {
  const [currentContent, setCurrentContent] = useState('Dashboard');

  const handleSidebarClick = (content) => {
    setCurrentContent(content);
  };

  return (
    <div className="homepage-container"> 
        {/* Sidebar */}
        <div className="sidebar">
            <div className="sidebar-header">
                <h2>Company Name</h2>
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
                <li onClick={() => handleSidebarClick('Edit Invoice')} className={currentContent === 'Edit Invoice' ? 'current' : ''}>
                    <Link to="/invoices/:id/edit" style={{ color: '#fff' }}>Edit Invoice</Link>
                </li>
            </ul>
        </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Top Navigation */}
        <nav className="top-nav">
          <ul>
            <li className="login-icon">
              <FaUser />
              {/* You can implement login functionality here */}
              {/* When user clicks on the icon, display user details */}
              {/* Add relevant CSS for user details dropdown */}
            </li>
          </ul>
        </nav>

        {/* Content */}
        <div className="content">
          {/* Render content based on current selection */}
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
