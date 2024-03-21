// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Homepage from './components/Homepage';
import InvoiceList from './components/InvoiceList';
import InvoiceDetail from './components/InvoiceDetail';
import AddInvoice from './components/AddInvoice';
import EditInvoice from './components/EditInvoice';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" exact element={<Homepage/>} />
          <Route path="/invoices/add" element={<AddInvoice />} />
          <Route path="/invoices/:id/edit" element={<EditInvoice />} />
          <Route path="/invoices/:id" element={<InvoiceDetail />} />
          <Route path="/invoices" element={<InvoiceList />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

function Home() {
  return <h2>Home</h2>;
}

export default App;
