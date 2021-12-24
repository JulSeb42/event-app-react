const router = require("express").Router()
const bcrypt = require("bcryptjs")
const mongoose = require("mongoose")

const saltRounds = 10

const User = require("../models/User.model")

const isLoggedIn = require("../middleware/isLoggedIn")
const isLoggedOut = require("../middleware/isLoggedOut")

router.get("/loggedin", (req, res) => {
    res.json(req.user)
})

router.put("/signup", isLoggedOut, (req, res, next) => {
    const { fullName, email, password, city, imageUrl, gender, dateBirth } =
        req.body

    if (!fullName) {
        return res
            .status(400)
            .json({ message: "Please provide your full name." })
    }

    const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/

    if (!regex.test(password)) {
        return res.status(400).json({
            message:
                "Password needs to have at least 6 chars and must contain at least one number, one lowercase and one uppercase letter.",
        })
    }

    User.findOne({ email }).then(found => {
        if (found) {
            return res.status(400).json({ message: "Email already taken." })
        }

        return bcrypt
            .genSalt(saltRounds)
            .then(salt => bcrypt.hash(password, salt))
            .then(hashedPassword => {
                return User.create({
                    fullName,
                    email,
                    password: hashedPassword,
                    city,
                    imageUrl,
                    gender,
                    dateBirth,
                })
            })
            .then(user => {
                req.session.user = user
                res.status(201).json(user)
            })
            .catch(err => {
                if (err instanceof mongoose.Error.ValidationError) {
                    return res.status(400).json({ message: err.message })
                }

                if (err.code === 11000) {
                    return res.status(400).json({
                        message:
                            "Email need to be unique. The email you chose is already in use.",
                    })
                }

                return res.status(500).json({ message: err.message })
            })
    })
})

router.put("/login", isLoggedOut, (req, res, next) => {
    const { email, password } = req.body

    if (!email) {
        return res.status(400).json({ message: "Please provide your email." })
    }

    if (password.length < 6) {
        return res.status(400).json({
            error: "Your password needs to be at least 6 characters long.",
        })
    }

    User.findOne({ email })
        .then(user => {
            if (!user) {
                return res
                    .status(400)
                    .json({ message: "This user does not exist." })
            }

            bcrypt.compare(password, user.password).then(isSamePassword => {
                if (!isSamePassword) {
                    return res
                        .status(400)
                        .json({ message: "Wrong credentials." })
                }

                req.session.user = user

                return res.json(user)
            })
        })
        .catch(err => next(err))
})

router.get("/logout", isLoggedIn, (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ message: err.message })
        }
        res.json({ message: "Done" })
    })
})

module.exports = router
