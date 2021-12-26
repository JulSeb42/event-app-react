const router = require("express").Router()
const Event = require("../models/Event.model")

const fileUploader = require("../config/cloudinary.config")

router.get("/events", (req, res, next) => {
    Event.find()
        .populate("invitedPeople")
        // .populate("posts")
        .populate("organiser")
        .then(eventFromDb => res.status(200).json(eventFromDb))
        .catch(err => next(err))
})

router.get("/events/:id", (req, res, next) => {
    Event.findById(req.params.id)
        .populate("organiser")
        .populate("invitedPeople")
        // .populate("posts")
        .then(eventFromDb => res.status(200).json({ eventFromDb }))
        .catch(err => next(err))
})

router.put(
    "/events/upload-picture",
    fileUploader.single("imageUrl"),
    (req, res, next) => {
        if (!req.file) {
            next(new Error("No file uploaded"))
            return
        }

        res.json({ secure_url: req.file.path })
    }
)

router.put("/events/new-event", (req, res, next) => {
    const {
        title,
        startDate,
        endDate,
        startTime,
        endTime,
        organiser,
        visibility,
        description,
        location,
        imageUrl,
        invitedPeople,
    } = req.body

    Event.create({
        title,
        startDate,
        endDate,
        startTime,
        endTime,
        organiser,
        visibility,
        description,
        location,
        imageUrl,
        invitedPeople,
    })
        .then(createdEvent => res.status(200).json({ createdEvent }))
        .catch(err => next(err))
})

// router.post("/user/edit-picture", (req, res, next) => {
//     const { imageUrl, id } = req.body

//     User.findByIdAndUpdate(id, { imageUrl }, { new: true })
//         .then(updatedUser => {
//             console.log(updatedUser)
//             res.status(200).json(updatedUser)
//         })
//         .catch(err => next(err))
// })

module.exports = router
