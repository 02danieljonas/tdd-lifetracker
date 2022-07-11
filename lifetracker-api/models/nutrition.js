const {
    UnauthorizedError,
    NotFoundError,
    BadRequestError,
    ForbiddenError,
} = require("../utils/errors");

const db = require("../db");

class Nutrition {
    static async createNutrition(email, data) {
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
        VALUES ($1, $2, $3, $4, $5, (select id from users where email = $6))
        RETURNING name,
        category,
        quantity,
        calories,
        image_url AS "imageUrl",
        user_id AS "userId",
        created_at AS "CreatedAt"
        `,
            [
                data.name,
                data.category,
                data.quantity,
                data.image_url,
                data.calories,
                email,
            ]
        );
        return result.rows[0];
    }

    static async fetchNutritionById(nutritionId) {
        const result = await db.query(
            `SELECT n.id
            FROM nutrition as n
                JOIN users AS u ON u.id = b.user_id
            WHERE id = $1`,
            [nutritionId]
        );
        if (result.rows.length == 0) {
            throw new NotFoundError();
        }
        return result.rows;
    }

    static async listNutritionForUser(email) {
        const result = await db.query(
            "SELECT * FROM nutrition WHERE user_id = (select id from users where email = $1)",
            [email]
        );
        return result.rows;
    }
}

module.exports = Nutrition;
