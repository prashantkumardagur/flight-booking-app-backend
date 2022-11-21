require("dotenv").config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');


// =====================================================================================


// // Setting up mongoDB / mongoose
// const mongoose = require('mongoose');
// const dbURL = process.env.DB_URI;


// // Connecting to mongoDB
// mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('MongoDB Connected'))
//   .catch(err => process.exit());


// =====================================================================================


// Setting up express
const app = express();

// Setting up middlewares
app.use(helmet());
app.use(cors());

// Setting up express middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


// =====================================================================================


// Importing routes
const publicRoutes = require('./routes/public-routes');


// Setting up routes
app.use('/public', publicRoutes);


// Home route
app.get('/', (req, res) => {
  res.send("Welcome to flight app backend homepage");
});


// =====================================================================================


app.listen(7000, () => {
  console.log("Server is running on port 8080");
});