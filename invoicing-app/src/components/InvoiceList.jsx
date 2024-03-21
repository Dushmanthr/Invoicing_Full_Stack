import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './InvoiceList.css';

const InvoiceList = () => {
  const [invoices, setInvoices] = useState([]);
  const [totalInvoices, setTotalInvoices] = useState(0);

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = () => {
    axios.get('http://localhost:5000/invoices')
      .then(response => {
        setInvoices(response.data);
        setTotalInvoices(response.data.length);
      })
      .catch(error => {
        console.error('Error fetching invoices:', error);
      });
  };

  const handleRemoveInvoice = (id) => {
    axios.delete(`http://localhost:5000/invoices/${id}`)
      .then(() => {
        fetchInvoices();
      })
      .catch(error => {
        console.error('Error removing invoice:', error);
      });
  };

  

  return (
    <div>
      <h2 className='h2-invoices'>Invoices</h2>
      <div className='header-invoice-list'>
        <p className='total-invoices'>Total Invoices: {totalInvoices}</p>
      
        <button id='add-new-button'>Add New</button>
      </div>
      <table className='invoice-table'>
        <thead>
          <tr>
            <th>Invoice No</th>
            <th>Name</th>
            <th>Date</th>
            <th>Cash</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map(invoice => (
            <tr key={invoice._id}>
              <td>{invoice.invoiceNumber}</td>
              <td>{invoice.name}</td>
              <td>{invoice.invoiceDate}</td>
              <td>{invoice.total}</td>
              <td>
                <Link to={`/invoice/${invoice._id}`}>
                  <button>View</button>
                </Link>
                <button onClick={() => handleRemoveInvoice(invoice._id)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  
};

export default InvoiceList;
