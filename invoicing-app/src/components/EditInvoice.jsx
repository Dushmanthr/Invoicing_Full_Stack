import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const EditInvoice = () => {
  const { id } = useParams();
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [amount, setAmount] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:5000/invoices/${id}`)
      .then(response => {
        const { invoiceNumber, amount } = response.data;
        setInvoiceNumber(invoiceNumber);
        setAmount(amount);
      })
      .catch(error => {
        console.error('Error fetching invoice details:', error);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:5000/invoices/${id}`, { invoiceNumber, amount })
      .then(response => {
        console.log('Invoice updated successfully:', response.data);
      })
      .catch(error => {
        console.error('Error updating invoice:', error);
      });
  };

};

export default EditInvoice;
