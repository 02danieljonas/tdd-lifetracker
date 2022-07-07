const express = require("express");
const User = require("../models/user");
const router = express.Router();
const { UnauthorizedError, BadRequestError } = require("../utils/errors");

router.get("/me", async (req, res, next) => {
    try{
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    const user = await User.authenticateToken(token);
    res.json({ user: user });
    }catch (err){
        next(err)
    }
});

router.post("/login", async (req, res, next) => {
    console.log("req", req)
    try {
        const user = await User.login(req.body, req.headers);
        return res.status(200).json({ user });
    } catch (err) {
        next(err);
    }
});

router.post("/register", async (req, res, next) => {
    try {
        const user = await User.register(req.body);
        console.log(user);
        return res.status(201).json({ user });
    } catch (err) {
        next(err);
    }
});

module.exports = router;
