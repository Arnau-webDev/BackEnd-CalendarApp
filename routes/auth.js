/*
    User routes / Auth
    localhost + /api/auth
*/

const { Router } = require("express");
const { check } = require("express-validator");
const router = Router();

const { createUser, userLogin, revalidateToken } = require("../controllers/auth");
const { validateFields } = require("../middlewares/validateFields");

router.post(
    "/new",
    [ // middlewares
        check("name", "Name is mandatory").not().isEmpty(),
        check("email", "Email is mandatory").isEmail(),
        check("password", "Password must be at least 6 characters long").isLength({ min: 6 }),
        validateFields
    ],
    createUser
);

router.post(
    "/",
    [ // middlewares
        check("email", "Email is mandatory").isEmail(),
        check("password", "Password must be at least 6 characters long").isLength({ min: 6 }),
        validateFields
    ],
    userLogin
);

router.get("/renew", revalidateToken);

module.exports = router;