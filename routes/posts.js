const router = require("express").Router()
const Post = require("../models/Post")

router.get("/post", (req, res, next) => {
    Post.find()
        .populate("poster")
        .populate("event")
        .then(postFromDb => {
            res.status(200).json(postFromDb)
        })
        .catch(err => next(err))
})

router.put("/post/new-post", (req, res, next) => {
    const { message, poster, datePost, timePost, event } = req.body

    Post.create({ message, poster, datePost, timePost, event })
        .then(createdPost => {
            res.status(200).json({ createdPost })
        })
        .catch(err => next(err))
})

router.delete("/post/:id/delete", (req, res, next) => {
    Post.findByIdAndDelete(req.params.id)
        .then(() => {
            res.status(200).json({ message: "Message deleted" })
        })
        .catch(err => next(err))
})

// router.delete("/user/:id/delete", (req, res, next) => {
//     User.findByIdAndDelete(req.params.id)
//         .then(() => {
//             res.status(200).json({ message: "User deleted" })
//         })
//         .catch(err => next(err))
// })

module.exports = router
