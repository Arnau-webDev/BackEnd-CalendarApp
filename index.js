
const express = require("express");
const dbConnection = require("./database/config");
const cors = require("cors");

require("dotenv").config();

// Create express server
const app = express();

// Database
dbConnection();

// CORS
app.use(cors());

// Public dir
app.use(express.static("public"));

// Read and parse body request
app.use(express.json());

//Routes
app.use("/api/auth", require("./routes/auth"));

// Listen for requests
app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
})