const mongoose = require("mongoose")


const Event = require("../models/Event.model")

require("dotenv/config")

const getRandom = require("../utils/getRandom")
const getRandomNumber = require("../utils/getRandomNumber")
const randomDate = require("../utils/randomDate")
const randomTime = require("../utils/randomTime")

mongoose.connect(process.env.MONGODB_URI)

const users = [
    "61fabaff768c8a530ef8796f",
    "61fabaff768c8a530ef8793d",
    "61fabaff768c8a530ef8793e",
    "61fabaff768c8a530ef8793f",
    "61fabaff768c8a530ef87940",
    "61fabaff768c8a530ef87941",
    "61fabaff768c8a530ef87942",
    "61fabaff768c8a530ef87943",
    "61fabaff768c8a530ef87944",
    "61fabaff768c8a530ef87945",
    "61fabaff768c8a530ef87946",
    "61fabaff768c8a530ef87947",
    "61fabaff768c8a530ef87948",
    "61fabaff768c8a530ef87949",
    "61fabaff768c8a530ef8794a",
    "61fabaff768c8a530ef8794b",
    "61fabaff768c8a530ef8794c",
    "61fabaff768c8a530ef8794d",
    "61fabaff768c8a530ef8794e",
    "61fabaff768c8a530ef8794f",
    "61fabaff768c8a530ef87950",
    "61fabaff768c8a530ef87951",
    "61fabaff768c8a530ef87952",
    "61fabaff768c8a530ef87953",
    "61fabaff768c8a530ef87954",
    "61fabaff768c8a530ef87955",
    "61fabaff768c8a530ef87956",
    "61fabaff768c8a530ef87957",
    "61fabaff768c8a530ef87958",
    "61fabaff768c8a530ef87959",
    "61fabaff768c8a530ef8795a",
    "61fabaff768c8a530ef8795b",
    "61fabaff768c8a530ef8795c",
    "61fabaff768c8a530ef8795d",
    "61fabaff768c8a530ef8795e",
    "61fabaff768c8a530ef8795f",
    "61fabaff768c8a530ef87960",
    "61fabaff768c8a530ef87961",
    "61fabaff768c8a530ef87962",
    "61fabaff768c8a530ef87963",
    "61fabaff768c8a530ef87964",
    "61fabaff768c8a530ef87965",
    "61fabaff768c8a530ef87966",
    "61fabaff768c8a530ef87967",
    "61fabaff768c8a530ef87968",
    "61fabaff768c8a530ef87969",
    "61fabaff768c8a530ef8796a",
    "61fabaff768c8a530ef8796b",
    "61fabaff768c8a530ef8796c",
    "61fabaff768c8a530ef8796d",
    "61fabaff768c8a530ef8796e",
]

const titles = [
    "Ironwasted",
    "Voguing Fundamentals With Pray Tell!",
    "Shit Event",
    "Drag Show With Sassy Divas",
    "Get The Answer",
    "Unholy Masquerade With Our Night Creatures",
    "Bring Back The Drama Comedy Show",
]
const descriptions = [
    "Let's celebrate the end of this amazing project ❤️",
    "The Legendary Pray Tell of New York, an emcee in the Ball scene, a member of the Masters of Ceremony Council, and a father figure to the children of ballroom is hosting Voguing Fundamentals in Apartment 306. Angel Evangelista is going to get you moving to the trendiest tunes.\nAngel Evangelista and Pray Tell has a heart for beginners and loves to bring more of you into the scene. No excuse for not showing up!",
    "dfdf",
    "Join us for our second edition of Sassy Divas at Drunken Cat!\nJoining us on the stage are two local drag sensations: Tess Tickles and Clit Eastwood. Oh yes, they are here to heat up your night!\nSo grab your friends, put on your fancy clothes and don't tell your mother. \n2G applies.",
    "Let's hop in the Heart of Gold and get this freaking answer 🚀",
    "The event is hosted by Berlin Vampire Association in cooperation with Vampiric Council organization. The celebration is open to local undead creatures such as vampires, witches, demons, banshees and zombies. Grab your plus one, but humans are a NO NO!\nParty dress or costumes are encouraged, but dressing as nuns or vampire hunters such as Blade is discouraged due to bad taste.\nThere will be blood!",
    "A comedy showcase that delivers the laugh and tears you’ve been looking for! Best comedians in town:\nJackie Shaw\nDonnie Dong\nKennie Song,\nand more....\nso don't miss the opportunity, cause really.... who doesn't like a good comedy show?",
]
const locations = [
    "Ironhack Campus",
    "Apartment 306, Revaler Str. Berlin",
    "Shit Location",
    "Tipsy Dog, Hundstrasse 1, Berlin",
    "Magrathea",
    "Unholy Str. 1, Berlin",
    "Danziger Str. 40, Berlin",
]
const images = [
    "https://res.cloudinary.com/dyfxmafvr/image/upload/v1643898468/Event%20app%20React%20New/akcjaie5cxshwlymno9p.jpg",
    "https://res.cloudinary.com/dyfxmafvr/image/upload/v1643917770/Event%20app%20React%20New/am5vlygwy0mhou3xbz6a_tok6di.jpg",
    "https://res.cloudinary.com/dyfxmafvr/image/upload/v1643917769/Event%20app%20React%20New/kkzk10ffcgoofhquxswb_splqwd.jpg",
    "https://res.cloudinary.com/dyfxmafvr/image/upload/v1643917769/Event%20app%20React%20New/ze4kg4qn6lwx26rvyxa2_b2egx5.jpg",
    "https://res.cloudinary.com/dyfxmafvr/image/upload/v1643917769/Event%20app%20React%20New/bq1lfikw2sjcm4kanzmm_dsfbd0.jpg",
    "https://res.cloudinary.com/dyfxmafvr/image/upload/v1643917769/Event%20app%20React%20New/hp53vkfpvmvbdkrqpuin_xl1phq.jpg",
    "https://res.cloudinary.com/dyfxmafvr/image/upload/v1643917770/Event%20app%20React%20New/q70gftch546huxpr9ve6_dhxnrh.jpg",
]
const isPrivate = [true, false]

let fakeEvents = []

for (i = 0; i < titles.length; i++) {
    fakeEvents.push({
        title: titles[i],
        startDate: randomDate(),
        endDate: randomDate(),
        startTime: randomTime(),
        endTime: randomTime(),
        organiser: getRandom(users),
        isPrivate: getRandom(isPrivate),
        description: descriptions[i],
        location: locations[i],
        imageUrl: images[i],
        price: getRandomNumber(30),
        invitedPeople: [
            getRandom(users),
            getRandom(users),
            getRandom(users),
            getRandom(users),
            getRandom(users),
            getRandom(users),
            getRandom(users),
            getRandom(users),
            getRandom(users),
            getRandom(users),
        ],
    })
}

Event.insertMany(fakeEvents)
    .then(events => {
        console.log(`Success, you added ${events.length} events to the db`)
        mongoose.connection.close()
    })
    .catch(err => console.log(err))
