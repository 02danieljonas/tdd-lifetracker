import React from "react";
import NutritionCard from "../NutritionCard/NutritionCard";
import { useNutritionContext } from "components/contexts/Nutrition";

export default function NutritionFeed() {
    const { nutritions } = useNutritionContext();
    console.log(nutritions);
    return (
        <div className="nutrition-feed">
            {nutritions.length == 0 ? (
                <div className="empty-message">Nothing here yet</div>
            ) : (
                nutritions.map((e, i) => (
                    <NutritionCard nutrition={e} key={i} />
                ))
            )}
        </div>
    );
}
