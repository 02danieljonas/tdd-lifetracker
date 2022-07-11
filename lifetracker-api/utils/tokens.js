const {
    BCRYPT_WORK_FACTOR,
    SECRET_KEY,
    REFRESH_SECRET_KEY,
} = require("../config");
const jwt = require("jsonwebtoken");

class Token {
    static async createToken(info) {
        const token = jwt.sign(info, SECRET_KEY);
        return token;
    }
}

module.exports = Token;
