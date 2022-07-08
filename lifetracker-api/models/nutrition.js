const {
    UnauthorizedError,
    NotFoundError,
    BadRequestError,
    ForbiddenError,
} = require("../utils/errors");

const db = require("../db");


class Nutrition {
    static async createNutrition(nutrition) {
        
        const result = await db.query(
            `
        INSERT INTO nutrition (
            name,
            category,
            calories,
            image_url,
            quantity
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

        return {};
    }

    static async fetchNutritionById(credentials, header) {
    }

    static async listNutritionForUser(credentials, header) {
    }
}


module.exports = Nutrition;