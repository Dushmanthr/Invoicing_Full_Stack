import React from 'react';
import Modal from 'react-modal';
import './InvoicePreview.css'; 

const InvoicePreview = ({ invoiceData, isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={onClose}>
      <div>
        <div className="preview-content">
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
              <p className='name'>Name</p>
              <p className="address">Address</p>
            </div>
            <div className="invoice-detail">
              <p>Invoice Detail:</p>
              <p>Invoice No: {invoiceData.invoiceNumber}</p>
              <p>Invoice Date: {invoiceData.invoiceDate}</p>
              <p>Due Date: {invoiceData.dueDate}</p>
            </div>
          </div>
          <table className="w-full">
            <thead>
              <tr>
                <th className="border-bottom border">Description</th>
                <th className="border-bottom border">Quantity</th>
                <th className="border-bottom border">Unit Price</th>
                <th className="border-bottom border">Amount</th>
              </tr>
            </thead>
            <tbody>
              {invoiceData.items.map((item, index) => (
                <tr key={index}>
                  <td>{item.description}</td>
                  <td>{item.quantity}</td>
                  <td>{item.unitPrice}</td>
                  <td>{item.quantity * item.unitPrice}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-end">
            <div className='total'>
              <p className="total-label">Total:</p>
              <p className="total-amount">
                {invoiceData.items.reduce(
                  (total, item) => total + item.quantity * item.unitPrice,
                  0
                )}
              </p>
            </div>
          </div>
        </div>
        <button id='close' onClick={onClose}>Close</button>
      </div>
    </Modal>
  );
};

export default InvoicePreview;
