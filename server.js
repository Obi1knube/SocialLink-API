const express = require("express");
const db = require("./config/connection");
const routes = require("./routes");
//const { sequelize } = require('./models'); // Import your Sequelize instance

// Setting up the port for the server
const PORT = process.env.PORT || 3001;
const app = express();

// Middleware for parsing JSON and urlencoded data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

// // Sync all models with the database
// sequelize.sync({ force: false }) // Set force to true to drop tables and re-create them
//   .then(() => {
//     console.log('Database synced');
//   })
//   .catch((err) => {
//     console.error('Error syncing database:', err);
//   });

// Starting the server once the database connection is open
db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});
