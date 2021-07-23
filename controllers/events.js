const { response } = require("express");
const Event = require("../models/event")

const getEvents = async (req, res = response) => {

    const events = await Event.find().populate("user", "name");

    res.status(200).json({
        ok: true,
        msg: "getEvents",
        events
    })
};

const createEvent = async (req, res = response) => {

    console.log(req.body);

    const event = new Event(req.body);

    try {
        console.log(req.uid)
        event.user = req.uid;

        const savedEvent = await event.save();

        res.status(201).json({
            ok: true,
            event: savedEvent
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Please contact the administrator"
        })
    }
};

const updateEvent = async (req, res = response) => {

    const eventId = req.params.id;
    const uid = req.uid;

    try {
        const event = await Event.findById(eventId);

        if (!event) {
            return res.status(404).json({
                ok: false,
                msg: "Event doesn't exist with this ID"
            })
        }

        if (event.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: "Not authorized for editing this event"
            })
        }

        const newEvent = {
            ...req.body,
            user: uid
        };

        const eventUpdated = await Event.findByIdAndUpdate(eventId, newEvent, { new: true });

        res.status(200).json({
            ok: true,
            event: eventUpdated
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Please contact the administrator"
        })
    }
};

const deleteEvent = async (req, res = response) => {

    const eventId = req.params.id;
    const uid = req.uid;

    try {
        const event = await Event.findById(eventId);

        if (!event) {
            return res.status(404).json({
                ok: false,
                msg: "Event doesn't exist with this ID"
            })
        }

        if (event.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: "Not authorized for deleting this event"
            })
        }

        const eventDeleted = await Event.findByIdAndRemove(eventId)

        res.status(200).json({
            ok: true,
            msg: "deleteEvent",
            event: eventDeleted
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Please contact the administrator"
        })
    }


};

module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent
}