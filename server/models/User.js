const {Schema,model} = require("mongoose")

const userSchema = new Schema (
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
    }
)
const User= model ("User",userSchema)
model.exports = User