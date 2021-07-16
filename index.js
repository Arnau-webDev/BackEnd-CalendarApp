
const express = require("express");
require("dotenv").config();

// Create express server
const app = express();

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