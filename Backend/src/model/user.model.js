const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true,"usernsme is requires"],
        unique:[true,"username should we unique"]
    },
    email:{
        type:String,
        required:[true,"Email is requires"],
        unique:[true,"Email should we unique"]
    },
    password:{
        type:String,
        required:[true,"Password is required"],
        select:false
    }
})

const userModel = mongoose.model("User", userSchema)

module.exports = userModel