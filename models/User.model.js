const { Schema, model } = require("mongoose")

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema(
    {
        // Basic info
        fullName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        city: String,
        imageUrl: String,
        dateBirth: String,
        gender: String,
        bio: String,

        // Events
        organisedEvents: [
            {
                type: Schema.Types.ObjectId,
                ref: "Event",
            },
        ],
        invitedEvents: [
            {
                type: Schema.Types.ObjectId,
                ref: "Event",
            },
        ],

        // Friends
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
            },
        ],
    },
    {
        // this second object adds extra properties: `createdAt` and `updatedAt`
        timestamps: true,
    }
)

const User = model("User", userSchema)

module.exports = User
