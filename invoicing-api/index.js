const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const cors = require('cors');
const invoicesRouter = require('./routes/invoices');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected...'))
  .catch((err) => console.error(err));

app.use('/invoices', invoicesRouter);

app.listen(PORT, () => console.log(`Listening at ${PORT}`));
