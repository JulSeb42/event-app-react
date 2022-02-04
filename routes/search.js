const router = require("express").Router()
const Event = require("../models/Event.model")
const User = require("../models/User.model")

router.put("/search/:keyword", (req, res, next) => {
    Event.find({ title: { $regex: req.params.keyword } })
        .then(postFromDb => {
            User.find({ fullName: { $regex: req.params.keyword } }).then(
                userFromDb => {
                    res.status(200).json({ postFromDb, userFromDb })
                }
            )
        })
        .catch(err => next(err))
})

module.exports = router
