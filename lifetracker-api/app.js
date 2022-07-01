const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { PORT, BCRYPT_WORK_FACTOR,
    SECRET_KEY,
    REFRESH_SECRET_KEY, } = require("./config");
const authRoutes = require("./routes/auth");
const security = require("./models/security");

const jwt = require("jsonwebtoken");

const { BadRequestError, NotFoundError } = require("./utils/errors");

const app = express();

//enables cors for all origins
app.use(
    cors({
        origin: "*",
    })
);

//parse incoming request bodies with JSON playloads
app.use(express.json());

app.use(morgan("tiny"));

app.get("/", (req, res, next) => {
    res.status(200).json({ ping: "gnop" });
});

app.get("/authToken", authenticateToken, (req, res)=>{
    res.json({res: req.header})
});


app.use("/auth", authRoutes);

app.use((req, res, next) => {
    return next(new NotFoundError());
});

app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message;

    return res.status(status).json({
        error: { message, status },
    });
});

function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) {
        return res.sendStatus(401);
    }
    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }
        req.header = user

        next()
        // return res.status(200).json(req);
    });

}


module.exports = app;
