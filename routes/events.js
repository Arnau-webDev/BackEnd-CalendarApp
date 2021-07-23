/*
    User routes / Events
    localhost + /api/events
*/

const { Router } = require("express");
const { check } = require("express-validator");
const { getEvents, createEvent, updateEvent, deleteEvent } = require("../controllers/events");
const isDate = require("../helpers/isDate");
const { validateFields } = require("../middlewares/validateFields");
const validateJWT = require("../middlewares/validateJWT");
const router = Router();

router.use(validateJWT);

router.get("/", getEvents);

router.post("/",
    [ // Middlewares
        check("title", "Event title is mandatory").not().isEmpty(),
        check("start", "Event date start is mandatory").not().isEmpty(),
        check("start", "Event date start is not a date").custom(isDate),
        check("end", "Event date end is mandatory").not().isEmpty(),
        check("end", "Event date end is not a date").custom(isDate),
        validateFields
    ],
    createEvent
);

router.put("/:id", updateEvent);

router.delete("/:id", deleteEvent);

// Get events


module.exports = router;
