const express = require('express');
const dotenv = require("dotenv").config();
const contactRoutes = require("./routes/contactRoutes");
const userRoutes = require("./routes/UserRoutes");
const errorHandler = require("./middleware/errorHandler");
const connectDb = require('./config/dbConnection');

// connecting to mongo db
connectDb();
const app = express();
const port = process.env.PORT || 5000;

// app midleware
app.use(express.json()); // data parser
app.use("/api/contacts",contactRoutes);
app.use("/api/user",userRoutes);
app.use(errorHandler);






app.listen(port, ()=>console.log(`app listening on port ${port}`));