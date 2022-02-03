// const faker = require("faker")
const mongoose = require("mongoose")

const User = require("../models/User.model")

require("dotenv/config")

const bcrypt = require("bcryptjs")
const password = "Password42"
const salt = bcrypt.genSaltSync()
const hash = bcrypt.hashSync(password, salt)
const getRandom = require("../utils/getRandom")
const slugify = require("../utils/slugify")
const randomDateBirth = require("../utils/randomDateBirth")
const getRandomString = require("../utils/getRandomString")

const cities = require("../client/src/components/data/cities.json")
const users = require("./seeds/fake-users.json")

let allCities = []

cities.forEach(city => {
    allCities.push(`${city.name}, ${city.country}`)
})

mongoose.connect(process.env.MONGODB_URI)

let fakeUsers = []

for (let i = 0; i < 50; i++) {
    fakeUsers.push({
        fullName: `${users[i].GivenName} ${users[i].Surname}`,
        email: `${slugify(
            `${users[i].GivenName} ${users[i].Surname}`
        )}@email.com`,
        password: hash,
        city: getRandom(allCities),
        imageUrl: `https://randomuser.me/api/portraits/${users[i].Gender === "woman" ? "women" : "men"}/${i}.jpg`,
        dateBirth: randomDateBirth(),
        gender: users[i].Gender,
        bio: "",
        organisedEvents: [],
        invitedEvents: [],
        verified: true,
        verifyToken: getRandomString(20),
    })
}

let realUser = {
    fullName: "Julien Sebag",
    email: "julien.sebag@me.com",
    password: hash,
    city: "Berlin, Germany",
    imageUrl:
        "https://res.cloudinary.com/dyfxmafvr/image/upload/v1643818316/Event%20app%20React%20New/rbyc63csialybldov3bd.jpg",
    dateBirth: "1992-09-17",
    gender: "man",
    bio: "Dont't panic.",
    organisedEvents: [],
    invitedEvents: [],
    verified: true,
    verifyToken: getRandomString(20),
}

User.insertMany(fakeUsers)
    .then(user => {
        console.log(`Success, you inserted ${user.length} users!`)
    })
    .catch(err => console.log(err))

User.insertMany(realUser)
    .then(user => {
        console.log(`Success, you inserted ${user.length} users!`)
        mongoose.connection.close()
    })
    .catch(err => console.log(err))