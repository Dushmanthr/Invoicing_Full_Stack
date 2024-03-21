// src/components/AddInvoice.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AddInvoice.css';
import InvoicePreview from './InvoicePreview';

const AddInvoice = () => {
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [invoiceDate, setInvoiceDate] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [items, setItems] = useState([]);
  const [showMessage, setShowMessage] = useState(false);
  const [previewModalIsOpen, setPreviewModalIsOpen] = useState(false);

  useEffect(() => {
    generateInvoiceNumber();
  }, []);

  const generateInvoiceNumber = () => {
    // Generate a random invoice number for demonstration purposes
    const randomNumber = Math.floor(Math.random() * 1000000) + 1;
    setInvoiceNumber(`INV-${randomNumber}`);
  };

  const calculateTotal = () => {
    // Calculate the total amount based on item prices and quantities
    return items.reduce((total, item) => total + item.quantity * item.unitPrice, 0);
  };

  const handleAddItem = () => {
    setItems([...items, { description: '', quantity: 1, unitPrice: 0 }]);
  };

  const handleSave = () => {
    // Send data to backend to save the invoice
    axios.post('http://localhost:5000/invoices', { invoiceNumber, invoiceDate, dueDate, items })
      .then(response => {
        console.log('Invoice created successfully:', response.data);
        setShowMessage(true); // Show success message
        // Reset form fields after successful submission
        setInvoiceNumber('');
        setInvoiceDate('');
        setDueDate('');
        setItems([]);
      })
      .catch(error => {
        console.error('Error creating invoice:', error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSave();
  };

  const handlePreview = () => {
    setPreviewModalIsOpen(true); // Open the preview modal
  };

  const closePreviewModal = () => {
    setPreviewModalIsOpen(false); // Close the preview modal
  };

  return (
    <div>
      <div className="invoice-header">
        <div>
          <h2 className="text-center">INVOICE</h2>
        </div>
        <div>
            <p className="system-name">System Name</p>
        </div>
      </div>
      <div className="intro">
        <div>
          <p className="bill-to-label">BILL TO:</p>
          <p className='name'>Name</p>
          <p className='address'>Address</p>
        </div>
        <div className="invoice-detail">
          <p>Invoice Detail:</p>
          <p>Invoice No: {invoiceNumber}</p>
          <p>Invoice Date: <input type="date" value={invoiceDate} onChange={(e) => setInvoiceDate(e.target.value)} /></p>
          <p>Due Date: <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} /></p>
        </div>
      </div>
      <table className="w-full">
        <thead >
          <tr>
            <th className="border-bottom border">Description</th>
            <th className="border-bottom border">Quantity</th>
            <th className="border-bottom border">Unit Price</th>
            <th className="border-bottom border">Amount</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              <td><input type="text" value={item.description} onChange={(e) => setItems([...items.slice(0, index), { ...item, description: e.target.value }, ...items.slice(index + 1)])} /></td>
              <td><input type="number" value={item.quantity} onChange={(e) => setItems([...items.slice(0, index), { ...item, quantity: parseInt(e.target.value) }, ...items.slice(index + 1)])} /></td>
              <td><input type="number" value={item.unitPrice} onChange={(e) => setItems([...items.slice(0, index), { ...item, unitPrice: parseFloat(e.target.value) }, ...items.slice(index + 1)])} /></td>
              <td>{item.quantity * item.unitPrice}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="button-container">
        <button onClick={handleAddItem}>Add New Item</button>
      </div>
      <div className="flex justify-end">
        <div className='total'>
          <p className="total-label">Total:</p> {/* Add styles for Total label */}
          <p className="total-amount">{calculateTotal()}</p> {/* Add styles for Total amount */}
        </div>
      </div>

      <div className="button-container">
        <button id="preview-button" onClick={handlePreview}>Preview</button>
      </div>

      {/* Render the InvoicePreview component */}
      <InvoicePreview
        isOpen={previewModalIsOpen}
        onClose={closePreviewModal}
        invoiceData={{
          invoiceNumber,
          invoiceDate,
          dueDate,
          items
        }}
      />

      {showMessage && (
        <div className="message">Invoice saved successfully!</div>
      )}

      <div className="button-container">
        <button onClick={handleSubmit}>Save</button>
        
      </div>

      



    </div>
  );
};

export default AddInvoice;
