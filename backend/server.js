require("dotenv").config({ path: "./.env" });
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const taskRoutes = require("./routes/taskRoutes");
const app = express();
const port = process.env.PORT || 4500;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

app.use(cors({
  origin: 'https://task-manager-0001.netlify.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use("/api", taskRoutes);

mongoose
  .connect(process.env.DB_URI)
  .then(() => {
    console.log("Successfully connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error", err);
  });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});