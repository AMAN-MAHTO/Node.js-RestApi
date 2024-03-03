const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, "Name is missing"]
        },
        email:{
            type:String,
            required:[true, "Email is missing"],
            unique:[true,"Email address already taken"]
        },
        password:{
            type:String,
            required: [true, "Password is missing"]
        }
    },
    {
        timestamps:true,
    }
);

module.exports = mongoose.model("User",userSchema);