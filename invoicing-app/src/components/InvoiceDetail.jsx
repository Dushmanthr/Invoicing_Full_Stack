import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const InvoiceDetail = () => {
  const { id } = useParams();
  const [invoice, setInvoice] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/invoices/${id}`)
      .then(response => {
        setInvoice(response.data);
      })
      .catch(error => {
        console.error('Error fetching invoice details:', error);
      });
  }, [id]);

  return (
    <div>
      <h2>Invoice Detail</h2>
      {invoice && (
        <div>
          <p>Invoice Number: {invoice.invoiceNumber}</p>
          <p>Amount: {invoice.amount}</p>
        </div>
      )}
    </div>
  );
};

export default InvoiceDetail;
