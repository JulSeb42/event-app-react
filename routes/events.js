const router = require("express").Router()
const Event = require("../models/Event.model")
const User = require("../models/User.model")

// Get all events
router.get("/events", (req, res, next) => {
    Event.find()
        .populate("organiser")
        .populate("invitedPeople")
        .populate("posts")
        .then(postFromDb => res.status(200).json(postFromDb))
        .catch(err => next(err))
})

// Get event by Id
router.get("/event/:id", (req, res, next) => {
    Event.findById(req.params.id)
        .populate("organiser")
        .populate("invitedPeople")
        .populate("posts")
        .then(postFromDb => res.status(200).json(postFromDb))
        .catch(err => next(err))
})

// Create event
router.post("/new-event", (req, res, next) => {
    const {
        title,
        startDate,
        endDate,
        startTime,
        endTime,
        organiser,
        isPrivate,
        description,
        location,
        imageUrl,
        price,
        invitedPeople,
    } = req.body

    if (!title) {
        return res.status(400).json({ message: "The title can not be empty." })
    }

    if (!startDate) {
        return res
            .status(400)
            .json({ message: "The start date can not be empty." })
    }

    if (!endDate) {
        return res
            .status(400)
            .json({ message: "The end date can not be empty." })
    }

    if (!startTime) {
        return res
            .status(400)
            .json({ message: "The start time can not be empty." })
    }

    if (!endTime) {
        return res
            .status(400)
            .json({ message: "The end time can not be empty." })
    }

    if (!location) {
        return res
            .status(400)
            .json({ message: "The location time can not be empty." })
    }

    Event.create({
        title,
        startDate,
        endDate,
        startTime,
        endTime,
        organiser,
        isPrivate,
        description,
        location,
        imageUrl,
        price,
        invitedPeople,
    })
        .then(createdEvent => {
            User.findByIdAndUpdate(
                organiser,
                { $push: { organisedEvents: createdEvent } },
                { new: true }
            ).then(updatedUser => {
                res.status(200).json({ user: updatedUser, createdEvent })
            })
        })
        .catch(err => next(err))
})

// Edit event
router.put("/event/:id/edit", (req, res, next) => {
    const {
        title,
        startDate,
        endDate,
        startTime,
        endTime,
        isPrivate,
        description,
        location,
        imageUrl,
        price,
        invitedPeople,
    } = req.body

    if (!title) {
        return res.status(400).json({ message: "The title can not be empty." })
    }

    if (!startDate) {
        return res
            .status(400)
            .json({ message: "The start date can not be empty." })
    }

    if (!endDate) {
        return res
            .status(400)
            .json({ message: "The end date can not be empty." })
    }

    if (!startTime) {
        return res
            .status(400)
            .json({ message: "The start time can not be empty." })
    }

    if (!endTime) {
        return res
            .status(400)
            .json({ message: "The end time can not be empty." })
    }

    if (!location) {
        return res
            .status(400)
            .json({ message: "The location time can not be empty." })
    }

    Event.findByIdAndUpdate(
        req.params.id,
        {
            title,
            startDate,
            endDate,
            startTime,
            endTime,
            isPrivate,
            description,
            location,
            imageUrl,
            price,
            invitedPeople,
        },
        { new: true }
    )
        .then(updatedEvent => res.status(200).json(updatedEvent))
        .catch(err => next(err))
})

// Delete event
router.delete("/delete-event/:id", (req, res, next) => {
    const id = req.params.id

    Event.findByIdAndDelete(id)
        .then(() => {
            res.status(200).json({ message: "Event deleted" })
        })
        .catch(err => next(err))
})

module.exports = router
