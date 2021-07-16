const { response } = require("express");

// express.response as default argument just to get intelliSense

const createUser = (req, res = response) => {

    const { name, email, password } = req.body;

    res.status(201).json({
        ok: true,
        msg: "Created successfully",
        name,
        email,
        password
    });
};

const userLogin = (req, res = response) => {

    const { email, password } = req.body;

    res.json({
        ok: true,
        msg: "login",
        email,
        password
    });
};

const revalidateToken = (req, res = response) => {
    res.json({
        ok: true,
        msg: "renew"
    });
};

module.exports = {
    createUser,
    userLogin,
    revalidateToken
};