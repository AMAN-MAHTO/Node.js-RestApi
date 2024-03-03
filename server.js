const express = require('express');
const dotenv = require("dotenv").config();
const contactRoutes = require("./routes/contactRoutes");
const userRoutes = require("./routes/UserRoutes");
const errorHandler = require("./middleware/errorHandler");
const connectDb = require('./config/dbConnection');
const fs = require("fs");

// connecting to mongo db
connectDb();
const app = express();
const port = process.env.PORT || 5000;

// app midleware
app.use(express.json()); // data parser
app.get("/",(req, res) => {
    // Read the content of the documentation file
    fs.readFile("readme.md", 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading documentation file:', err);
        res.status(500).send('Internal Server Error');
        return;
      }
      // Send the documentation content as response
      res.send(data);
    });
  })
app.use("/api/contacts",contactRoutes);
app.use("/api/user",userRoutes);
app.use(errorHandler);






app.listen(port, ()=>console.log(`app listening on port ${port}`));