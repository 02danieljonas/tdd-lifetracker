const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { PORT } = require("./config");

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

app.listen(PORT, () => {
    console.log(`👾 Server running https://localhost:${PORT}`);
});
