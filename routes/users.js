const router = require("express").Router()
const User = require("../models/User.model")
const bcrypt = require("bcryptjs")

const saltRounds = 10

const fileUploader = require("../config/cloudinary.config")

router.get("/users", (req, res, next) => {
    User.find()
        .then(userFromDb => {
            res.status(200).json(userFromDb)
        })
        .catch(err => next(err))
})

router.get("/user/:id", (req, res, next) => {
    User.findById(req.params.id)
        .then(userFromDb => {
            res.status(200).json({ userFromDb })
        })
        .catch(err => next(err))
})

router.put("/user/edit", (req, res, next) => {
    const { id, fullName, gender, dateBirth, city, bio } = req.body

    User.findByIdAndUpdate(
        id,
        { fullName, gender, dateBirth, city, bio },
        { new: true }
    )
        .then(updatedUser => {
            res.status(200).json({ user: updatedUser })
        })
        .catch(err => next(err))
})

router.put("/user/edit-password", (req, res, next) => {
    const { id, password } = req.body

    const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/

    if (!regex.test(password)) {
        return res.status(400).json({
            message:
                "Password needs to have at least 6 chars and must contain at least one number, one lowercase and one uppercase letter.",
        })
    }

    return bcrypt
        .genSalt(saltRounds)
        .then(salt => bcrypt.hash(password, salt))
        .then(hashedPassword => {
            return User.findByIdAndUpdate(id, { password: hashedPassword })
                .then(updatedUser => {
                    res.status(200).json({ user: updatedUser })
                })
                .catch(err => next(err))
        })
})

router.delete("/user/:id/delete", (req, res, next) => {
    User.findByIdAndDelete(req.params.id)
        .then(() => {
            res.status(200).json({ message: "User deleted" })
        })
        .catch(err => next(err))
})

// Upload profile picture
router.put(
    "/user/upload-picture",
    fileUploader.single("imageUrl"),
    (req, res, next) => {
        if (!req.file) {
            next(new Error("No file uploaded"))
            return
        }

        res.json({ secure_url: req.file.path })
    }
)

router.post("/user/edit-picture", (req, res, next) => {
    const { imageUrl, id } = req.body

    User.findByIdAndUpdate(id, { imageUrl }, { new: true })
        .then(updatedUser => {
            console.log(updatedUser)
            res.status(200).json(updatedUser)
        })
        .catch(err => next(err))
})

module.exports = router
