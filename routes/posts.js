const router = require("express").Router()
const Post = require("../models/Post.model")
const Event = require("../models/Event.model")

// Get all posts
router.get("/posts", (req, res, next) => {
    Post.find()
        .populate("event")
        .populate("poster")
        .then(foundPosts => res.status(200).json(foundPosts))
        .catch(err => next(err))
})

// Get post by Id
router.get("/post/:id", (req, res, next) => {
    Post.findById(req.params.id)
        .populate("event")
        .populate("poster")
        .then(foundPost => res.status(200).json(foundPost))
        .catch(err => next(err))
})

// Create post
router.post("/new-post", (req, res, next) => {
    const { message, poster, datePost, timePost, event } = req.body

    Post.create({ message, poster, datePost, timePost, event, edited: false })
        .then(createdPost => {
            Event.findByIdAndUpdate(
                event,
                { $push: { posts: createdPost } },
                { new: true }
            ).then(updatedEvent => {
                res.status(200).json({ createdPost, updatedEvent })
            })
        })
        .catch(err => next(err))
})

// Edit post
router.put("/edit-post/:id", (req, res, next) => {
    const { message } = req.body
    Post.findByIdAndUpdate(
        req.params.id,
        { message, edited: true },
        { new: true }
    )
        .then(updatedPost => res.status(200).json(updatedPost))
        .catch(err => next(err))
})

// Delete post
router.delete("/delete-post/:id", (req, res, next) => {
    Post.findByIdAndDelete(req.params.id)
        .then(() => res.status(200).json({ message: "Post deleted" }))
        .catch(err => next(err))
})

module.exports = router
