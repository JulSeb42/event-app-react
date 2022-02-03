const { Schema, model } = require("mongoose")

const eventSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        startDate: {
            type: String,
            required: true,
        },
        endDate: {
            type: String,
            required: true,
        },
        startTime: {
            type: String,
            required: true,
        },
        endTime: {
            type: String,
            required: true,
        },
        organiser: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        isPrivate: Boolean,
        description: String,
        location: String,
        imageUrl: String,
        price: Number,

        invitedPeople: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
            },
        ],

        posts: [
            {
                type: Schema.Types.ObjectId,
                ref: "Post",
            },
        ],
    },
    {
        timestamps: true,
    }
)

const Event = model("Event", eventSchema)

module.exports = Event
