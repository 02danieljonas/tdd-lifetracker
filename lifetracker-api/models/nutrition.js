const {
    UnauthorizedError,
    NotFoundError,
    BadRequestError,
    ForbiddenError,
} = require("../utils/errors");

const db = require("../db");

class Nutrition {
    static async createNutrition(user_id, data) {
        const requiredFiled = [
            "name",
            "category",
            "quantity",
            "image_url",
            "calories",
        ];
        requiredFiled.forEach((field) => {
            if (!data.hasOwnProperty(field)) {
                throw new BadRequestError(`Missing ${field} in request body`);
            }
        });
        const result = await db.query(
            `
        INSERT INTO nutrition (
            name,
            category,
            quantity,
            image_url,
            calories,
            user_id
        )
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING name,
        category,
        quantity,
        calories,
        image_url,
        user_id,
        created_at
        `,
            [
                data.name,
                data.category,
                data.quantity,
                data.image_url,
                data.calories,
                user_id,
            ]
        );
        return result.rows[0];
    }

    static async fetchNutritionById(id) {
        const result = await db.query(
            "SELECT * FROM nutrition WHERE id = $1",
            [id]
        );
        return result.rows;
    }

    static async listNutritionForUser(user) {
        const result = await db.query(
            "SELECT * FROM nutrition WHERE user_id = $1",
            [user]
        );
        return result.rows;
    }
}

module.exports = Nutrition;
