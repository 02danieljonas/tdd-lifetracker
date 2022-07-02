const {
    BCRYPT_WORK_FACTOR,
    SECRET_KEY,
    REFRESH_SECRET_KEY,
} = require("../config");

const jwt = require("jsonwebtoken");

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
        req.user = user
        next()
    });

}
