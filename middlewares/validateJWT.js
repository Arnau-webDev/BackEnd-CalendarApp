const { response } = require("express");
const jwt = require("jsonwebtoken");

const validateJWT = (req, res = response, next) => {

    const token = req.header("x-token");
    console.log(token)
    // Check if token is null
    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: "Unauthorized operation, missing token in request"
        })
    }

    try {
        const { uid, name } = jwt.verify(
            token,
            process.env.SECRET_JWT_SEED
        );

        req.uid = uid;
        req.name = name;

    } catch (error) {
        console.log(error);
        return res.status(401).json({
            ok: false,
            msg: "Invalid token from request"
        })
    }
    next();
}

module.exports = validateJWT;