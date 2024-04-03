import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AddInvoice.css';
import InvoicePreview from './InvoicePreview';
import InvoiceList from './InvoiceList';


const AddInvoice = () => {
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [invoiceDate, setInvoiceDate] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [previewModalIsOpen, setPreviewModalIsOpen] = useState(false);
  const [invoiceSaved, setInvoiceSaved] = useState(false);

  useEffect(() => {
    generateInvoiceNumber();
  }, []);

  useEffect(() => {
    if (invoiceSaved) {
      setInvoiceNumber('');
      setInvoiceDate('');
      setDueDate('');
      setItems([]);
      setName('');
      setAddress('');
    }
  }, [invoiceSaved]);

  const generateInvoiceNumber = () => {
    const randomNumber = Math.floor(Math.random() * 1000000) + 1;
    setInvoiceNumber(`INV-${randomNumber}`);
  };

  const calculateTotal = () => {
    return items.reduce((total, item) => total + item.quantity * item.unitPrice, 0);
  };

  const handleAddItem = () => {
    setItems([...items, { description: '', quantity: 1, unitPrice: 0 }]);
  };

  const handleSave = async () => {
    try {
      const response = await axios.post('http://localhost:5000/invoices', { invoiceNumber, invoiceDate, dueDate, items });
      console.log('Invoice created successfully:', response.data);
      setShowMessage(true);
      setInvoiceSaved(true);
      console.log('Invoice saved:', invoiceSaved);
      setInvoiceNumber('');
      setInvoiceDate('');
      setDueDate('');
      setItems([]);
      setName('');
      setAddress('');
    } catch (error) {
      console.error('Error creating invoice:', error.response);
    }
  }; 

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSave();
  };

  const handlePreview = () => {
    setPreviewModalIsOpen(true); 
  };

  const closePreviewModal = () => {
    setPreviewModalIsOpen(false); 
  };

  return (
    <div>
      <div className="invoice-header">
        <div>
          <h2 className="text-center">INVOICE</h2>
        </div>
        <div>
            <p className="system-name">ABC Systems</p>
        </div>
      </div>
      <div className="intro">
        <div>
          <p className="bill-to-label">BILL TO:</p>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
          <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Address" />
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
          <p className="total-amount">Total: {calculateTotal()}</p> 
        </div>
      </div>

      <div className="button-container">
        <button id="preview-button" onClick={handlePreview}>Preview</button>
      </div>

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

      {invoiceSaved && <InvoiceList refreshList={() => setInvoiceSaved(false)}/>}

      <div className="button-container">
        <button onClick={handleSubmit}>Save</button>
        
      </div>


    </div>
  );
};

export default AddInvoice;
