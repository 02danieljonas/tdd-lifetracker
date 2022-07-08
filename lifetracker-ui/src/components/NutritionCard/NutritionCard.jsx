import React from "react";

export default function NutritionCard({ nutrition }) {
    return (
        <div className="nutrition-card">
            <div className="nutrition-name">{nutrition.name}</div>
            <img
                className="nutrition-image"
                src={nutrition.imageUrl}
                name={`image for ${nutrition.name}`}
            />
            <div className="nutrition-calories">{nutrition.calories}</div>
            <div className="nutrition-category">{nutrition.category}</div>
            <div className="nutrition-date">{nutrition.createdAt}</div>
        </div>
    );
}
