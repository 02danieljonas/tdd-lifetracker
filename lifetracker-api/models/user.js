const {
    UnauthorizedError,
    NotFoundError,
    BadRequestError,
    ForbiddenError,
} = require("../utils/errors");
const {
    BCRYPT_WORK_FACTOR,
    SECRET_KEY,
    REFRESH_SECRET_KEY,
} = require("../config");
const bcrypt = require("bcrypt");

const db = require("../db");
const jwt = require("jsonwebtoken");
const Tokens = require("../utils/tokens");

class User {
    static async makePublicUser(user) {
        let info = {
            username: user.username,
            email: user.email,
            first_name: user.first_name,
            id: user.id,
            last_name: user.last_name
        };
        const token = await Tokens.createToken(info);
        return { user: info, accessToken: token };
    }

    static async login(credentials, header) {
        //['authorization'].split(' ')[1]

        //user should submit email and passowrd
        //if any fileds are missing throw an error

        if (!credentials) {
            throw new BadRequestError(`Request body is wrong`);
        }
        //user should submit their info
        //if any of this fields are missing throw an error
        const requiredFiled = ["email", "password"];
        requiredFiled.forEach((field) => {
            if (!credentials.hasOwnProperty(field)) {
                throw new BadRequestError(`Missing ${field} in request body`);
            }
        });

        //then look up user in the db by email
        const user = await User.fetchUserByEmail(credentials.email);

        //if a user is found compare the submitted password
        //with the password in the db
        //if there is a match return the user
        if (user) {
            // console.log(credentials.password);
            // console.log(user.password);
            const isValid = await bcrypt.compare(
                credentials.password,
                user.password
            );
            if (isValid) {
                return User.makePublicUser(user);
            }
        } else {
            const isValid = await bcrypt.compare(
                credentials.password,
                "$2b$13$aEFwdMYtTBwfmToeSBFz4OtrRcAGTUC3CjSsERRP4qO3A2Pk7Ivbq"
            );
        }

        //if any of this goes wrong throw an error
        throw new UnauthorizedError("Invalid email or password");
    }
    static async register(credentials) {
        if (!credentials) {
            throw new BadRequestError(`Request body is wrong`);
        }
        //user should submit their info
        //if any of this fields are missing throw an error
        const requiredFiled = [
            "email",
            "password",
            "firstName",
            "lastName",
            "username",
        ];
        requiredFiled.forEach((field) => {
            if (!credentials.hasOwnProperty(field)) {
                throw new BadRequestError(`Missing ${field} in request body`);
            }
        });

        if (credentials.email.indexOf("@") <= 0) {
            throw new BadRequestError(`Invalid email`);
        }

        //make sure no user exist in the ysstem with that email
        //if one does throw an error
        const existingUser = await User.fetchUserByEmail(credentials.email);
        if (existingUser) {
            throw new BadRequestError(`Duplicate email: ${credentials.email}`);
        }

        //take users password and hash it
        const hashedPw = await bcrypt.hash(
            credentials.password,
            BCRYPT_WORK_FACTOR
        );

        //take users email and lowercase it
        const lowercaseEmail = credentials.email.toLowerCase();

        //create a new user in the db with all their info
        const result = await db.query(
            `
        INSERT INTO users (
            email,
            password,
            first_name,
            last_name,
            username
        )
        VALUES ($1, $2, $3, $4, $5)
        RETURNING email, password, first_name, last_name, username, created_at, update_at
        `,
            [
                lowercaseEmail,
                hashedPw,
                credentials.firstName,
                credentials.lastName,
                credentials.username,
            ]
        );
        const user = result.rows[0];
        return User.makePublicUser(user);
    }
    static async fetchUserByEmail(email) {
        if (!email) {
            throw new BadRequestError("No email provided");
        }
        const query = "SELECT * FROM users WHERE email = $1";

        const result = await db.query(query, [email.toLowerCase()]);

        const user = result.rows[0];

        return user;
    }

    static async authenticateToken(token) {
        // const authHeader = req.headers["authorization"];
        // const token = authHeader && authHeader.split(" ")[1];
        if (token == null) {
            throw new BadRequestError("Token is empty");
        }

        let userRes;
        jwt.verify(token, SECRET_KEY, (err, user) => {
            if (err) {
                throw new BadRequestError(`Token is invalid`);
            }
            userRes = user;
        });
        return userRes;
    }
}

module.exports = User;
