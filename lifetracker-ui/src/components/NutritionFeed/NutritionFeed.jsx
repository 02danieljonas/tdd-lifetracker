import React, { useEffect } from "react";
import NutritionCard from "../NutritionCard/NutritionCard";
import { useNutritionContext } from "components/contexts/Nutrition";
import { useAuthContext } from "components/contexts/Auth";

export default function NutritionFeed() {
    const { nutritions } = useNutritionContext();
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
