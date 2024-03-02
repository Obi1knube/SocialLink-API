// Importing necessary modules and files
const express = require("express");
const db = require("./config/connection");
const routes = require("./routes");

// Setting up the port for the server
const PORT = process.env.PORT || 3001;
const app = express();

// Middleware for parsing JSON and urlencoded data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

// Starting the server once the database connection is open
db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});
