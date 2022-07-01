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

    static async undoToken(token, header) {
        console.log(token, header)
        return token, header
    }
}

module.exports = Token;
