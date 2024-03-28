const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
  invoiceNumber: String,
  invoiceDate: Date,
  dueDate: Date,
  items: [{ description: String, quantity: Number, unitPrice: Number }],
  name: String,
  address: String,
});

module.exports = mongoose.model('Invoice', invoiceSchema);
