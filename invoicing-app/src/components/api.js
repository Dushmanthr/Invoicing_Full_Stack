import axios from 'axios';

const BASE_URL = 'http://localhost:5000'; 

export const fetchInvoices = () => {
  return axios.get(`${BASE_URL}/invoices`);
};

export const getAllInvoices = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/invoices`);
    return response.data;
  } catch (error) {
    console.error('Error fetching invoices:', error);
    return [];
  }
};

export const createInvoice = async (invoiceData) => {
  try {
    const response = await axios.post(`${BASE_URL}/invoices`, invoiceData);
    return response.data;
  } catch (error) {
    console.error('Error creating invoice:', error);
    throw error;
  }
};

export const updateInvoice = async (invoiceId, updatedData) => {
  try {
    const response = await axios.put(`${BASE_URL}/invoices/${invoiceId}`, updatedData);
    return response.data;
  } catch (error) {
    console.error('Error updating invoice:', error);
    throw error;
  }
};

export const deleteInvoice = async (invoiceId) => {
  try {
    await axios.delete(`${BASE_URL}/invoices/${invoiceId}`);
  } catch (error) {
    console.error('Error deleting invoice:', error);
    throw error;
  }
};
