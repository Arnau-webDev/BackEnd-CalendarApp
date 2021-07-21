const mongoose = require("mongoose");

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.DB_CON, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });

        console.log("Connected to database!");

    } catch (error) {
        console.log(error);
        throw new Error("Error initializing database")
    }
}

module.exports = dbConnection;