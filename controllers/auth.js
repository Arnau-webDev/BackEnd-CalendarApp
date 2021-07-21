const { response } = require("express");
const User = require("../models/User");
const generateJWT = require("../helpers/jwt");

const bcrypt = require("bcryptjs");

// express.response as default argument just to get intelliSense

const createUser = async (req, res = response) => {

    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email: email });

        // console.log(user);

        // If user exists return error
        if (user) {
            return res.status(400).json({
                ok: false,
                msg: "User already exists with this email, try to log in"
            })
        }

        user = new User(req.body);

        // Encrypt password
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password.toString(), salt);

        await user.save();

        // Generate JWT
        const token = await generateJWT(user.id, user.name);

        res.status(201).json({
            ok: true,
            msg: "Created successfully",
            uid: user.id,
            name: user.name,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Please contact the administrator"
        })
    }
};

const userLogin = async (req, res = response) => {

    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email: email });

        // console.log(user);

        // If user doesn't exist return error
        if (user === null) {
            return res.status(400).json({
                ok: false,
                msg: "User not found with this email"
            })
        }

        // Confirm passwords (returns true or false)
        const passwordsMatch = bcrypt.compareSync(password.toString(), user.password);

        if (passwordsMatch) {

            // Generate JWT
            const token = await generateJWT(user.id, user.name);

            return res.json({
                ok: true,
                msg: "login",
                uid: user.id,
                name: user.name,
                token
            });
        } else {
            return res.status(400).json({
                ok: false,
                msg: "Incorrect password for specified email"
            })
        }


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "User not found with this email"
        })
    }

};

const revalidateToken = async (req, res = response) => {

    const { uid, name } = req;

    // Generate new JWT
    const token = await generateJWT(uid, name);

    res.json({
        ok: true,
        msg: "token renewed",
        token
    });
};

module.exports = {
    createUser,
    userLogin,
    revalidateToken
};