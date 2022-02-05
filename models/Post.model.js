const { Schema, model } = require("mongoose")

const postSchema = new Schema(
    {
        message: {
            type: String,
            required: true,
        },

        poster: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },

        datePost: String,
        timePost: String,
        edited: Boolean,

        event: {
            type: Schema.Types.ObjectId,
            ref: "Event",
        },
    },
    { timestamps: true }
)

const Post = model("Post", postSchema)

module.exports = Post
