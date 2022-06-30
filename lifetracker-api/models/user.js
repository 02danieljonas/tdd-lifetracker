const { UnauthorizedError, NotFoundError, BadRequestError } = require("../utils/errors");

const db = require("../db");

class User {
    static async login(credentials) {
        //user should submit email and passowrd
        //if any fileds are missing throw an error

        //then look up user in the db by email
        //if a user is found compare the submitted password
        //with the password in the db
        //if there is a match return the user

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
            "username"
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
                credentials.password,
                credentials.firstName,
                credentials.lastName,
                credentials.username
            ]
        );
        console.log("12db.query");


        const user = result.rows[0];
        return user;
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
}

module.exports = User;
