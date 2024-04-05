
const express = require("express")

const mongoose = require("mongoose")
require("dotenv").config()

const cors = require("cors")

const app = express()
const PORT = process.env.PORT | '5000'

app.use(express.json())
app.use(cors())

mongoose
.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected..."))
.catch((err) => console.log(err));

app.listen(PORT, () => console.log(`Listening at ${PORT}`));



const invoicesRouter = require('./routes/invoices');

app.get('/invoices', (req, res) => {
  Invoice.find({}, (err, invoices) => {
      if (err) {
          console.error('Error fetching invoices:', err);
          res.status(500).json({ error: 'Failed to fetch invoices' });
      } else {
          res.status(200).json(invoices);
      }
  });
});


app.use('/invoices', invoicesRouter);


