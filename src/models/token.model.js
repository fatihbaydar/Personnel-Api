"use strict"

const {mongoose} = require("../configs/dbConnection")

const TokenSchema = new mongoose.Schema(

    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Personnel",
            index:true,
            required:true,
            unique:true
        },
        token:{
            type:String,
            trim:true,
            required:true,
            index:true,
            unique:true
        }
    }, {
        collection:"tokens", timestamps:true
    }
)

module.exports = mongoose.model("Token", TokenSchema)