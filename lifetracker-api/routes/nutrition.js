const express = require("express");
const Nutrition = require("../models/nutrition");
const router = express.Router();
const { UnauthorizedError, BadRequestError } = require("../utils/errors");

router.get("/", async (req, res, next) => {
    try {
        const nutritions = await Nutrition.listNutritionForUser(
            res.locals.email
        );
        res.json({ nutritions });
    } catch (err) {
        next(err);
    }
});

router.post("/", async (req, res, next) => {
    try {
        const nutritions = await Nutrition.createNutrition(
            res.locals.email,
            req.body
        );
        res.json({ nutritions });
    } catch (err) {
        next(err);
    }
});

router.get("/:nutritionId", async (req, res, next) => {
    try {
        const { nutritionId } = req.params;
        const nutrition = await Nutrition.fetchNutritionById(nutritionId);

        res.json({ nutrition });
    } catch (err) {
        next(err);
    }
});

router.get("/nutrition", async (req, res, next) => {
    try {
        const nutrition = await Nutrition.createNutrition({ user: res.locals });
        res.json({ nutrition: nutrition });
    } catch (err) {
        next(err);
    }
});

module.exports = router;
