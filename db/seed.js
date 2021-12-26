const faker = require("faker")
const mongoose = require("mongoose")

const User = require("../models/User.model")

require("dotenv/config")

const bcrypt = require("bcryptjs")
const password = "Password42"
const salt = bcrypt.genSaltSync()
const hash = bcrypt.hashSync(password, salt)

const cities = require("./citiesGermany.json")

let allCities = []

cities.forEach(city => {
    allCities.push(city.name)
})

const getRandomCity = () => {
    const randomNumber = Math.floor(Math.random() * allCities.length)
    return allCities[randomNumber]
}

mongoose.connect(process.env.MONGODB_URI)

let maleUsers = []
let maleAvatars = []
let femaleUsers = []
let femaleAvatars = []

for (let i = 0; i < 50; i++) {
    maleAvatars.push(`https://randomuser.me/api/portraits/men/${i}.jpg`)
    femaleAvatars.push(`https://randomuser.me/api/portraits/women/${i}.jpg`)
}

for (let i = 0; i < 50; i++) {
    maleUsers.push({
        fullName: faker.name.findName(),
        email: faker.internet.email(),
        password: hash,
        city: getRandomCity(),
        imageUrl: maleAvatars[i],
        dateBirth: faker.date.between("1940-01-01", "2002-12-31"),
        gender: "man",
        bio: "",
        organisedEvents: [],
        invitedEvents: [],
    })

    femaleUsers.push({
        fullName: faker.name.findName(),
        email: faker.internet.email(),
        password: hash,
        city: getRandomCity(),
        imageUrl: femaleAvatars[i],
        dateBirth: faker.date.between("1940-01-01", "2002-12-31"),
        gender: "woman",
        bio: "",
        organisedEvents: [],
        invitedEvents: [],
    })
}

User.insertMany(maleUsers)
    .then(user => {
        console.log(`Success, you inserted ${user.length} male users!`)
    })
    .catch(err => console.log(err))

User.insertMany(femaleUsers)
    .then(user => {
        console.log(`Success, you inserted ${user.length} female users!`)
        mongoose.connection.close()
    })
    .catch(err => console.log(err))
