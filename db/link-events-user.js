require("dotenv/config")
const mongoose = require("mongoose")
mongoose.connect(process.env.MONGODB_URI)

const User = require("../models/User.model")

const idJulien = "61fabaff768c8a530ef8796f"
const eventsJulien = ["61fbe68c16b5bdd9ffe53008"]

User.findOneAndUpdate(
    { _id: idJulien },
    { $push: { organisedEvents: eventsJulien } },
    { new: true }
)
    .then(events => {
        console.log(events)
    })
    .catch(err => console.log(err))

const idMatilda = "61fabaff768c8a530ef87953"
const eventsMatilda = ["61fc363c294367e307ba127f"]

User.findOneAndUpdate(
    { _id: idMatilda },
    { $push: { organisedEvents: eventsMatilda } },
    { new: true }
)
    .then(events => {
        console.log(events)
    })
    .catch(err => console.log(err))

const idMia = "61fabaff768c8a530ef87941"
const eventsMia = ["61fc363c294367e307ba1280", "61fc363c294367e307ba1283"]

User.findOneAndUpdate(
    { _id: idMia },
    { $push: { organisedEvents: eventsMia } },
    { new: true }
)
    .then(events => {
        console.log(events)
    })
    .catch(err => console.log(err))

const idJamie = "61fabaff768c8a530ef87949"
const eventsJamie = ["61fc363c294367e307ba1281"]

User.findOneAndUpdate(
    { _id: idJamie },
    { $push: { organisedEvents: eventsJamie } },
    { new: true }
)
    .then(events => {
        console.log(events)
    })
    .catch(err => console.log(err))

const idOwen = "61fabaff768c8a530ef87955"
const eventsOwen = ["61fc363c294367e307ba1282"]

User.findOneAndUpdate(
    { _id: idOwen },
    { $push: { organisedEvents: eventsOwen } },
    { new: true }
)
    .then(events => {
        console.log(events)
    })
    .catch(err => console.log(err))

const idJude = "61fabaff768c8a530ef87969"
const eventsJude = ["61fc363c294367e307ba1284"]

User.findOneAndUpdate(
    { _id: idJude },
    { $push: { organisedEvents: eventsJude } },
    { new: true }
)
    .then(events => {
        console.log(events)
    })
    .catch(err => console.log(err))

const idArchie = "61fabaff768c8a530ef87964"
const eventsArchie = ["61fc363c294367e307ba1285"]

User.findOneAndUpdate(
    { _id: idArchie },
    { $push: { organisedEvents: eventsArchie } },
    { new: true }
)
    .then(events => {
        console.log(events)
        mongoose.connection.close()
    })
    .catch(err => console.log(err))
