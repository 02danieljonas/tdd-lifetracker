const express = require("express");
const User = require("../models/user")
const router = express.Router()
const { UnauthorizedError, BadRequestError } = require("../utils/errors");


router.post("/login", async (req, res, next)=>{
    try{
        
        const user = await User.loging(req.body)
        return res.status(200).json({user})
    }catch(err){
        next(err)
    }
})

router.post("/register", async (req, res, next)=>{
    try{
        const user = await User.register(req.body)
        return res.status(201).json({user})
    }catch(err){
        next(err)
    }
})


module.exports = router