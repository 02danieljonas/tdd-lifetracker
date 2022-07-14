import React from "react";
import SummaryStat from "../SummaryStat/SummaryStat";

export default function ActivityFeed({
    totalCaloriesPerDay,
    avgCaloriesPerCategory,
}) {
    let loopTime =
        avgCaloriesPerCategory.length > 6 ? 6 : avgCaloriesPerCategory.length;

    let placeholder = [];
    for (let i = 0; i < loopTime; i++) {
        placeholder.push(avgCaloriesPerCategory[i]);
    }

    return (
        <div className="activity-feed">
            <div className="per-category">
                <h4>Average Calories Per Category</h4>
                {placeholder.map((e, idx) => (
                    <SummaryStat
                        stat={
                            e.calories != 0 && typeof e.calories === "number"
                                ? e.calories.toFixed(1)
                                : e.calories
                        }
                        key={idx}
                        label={e.category}
                        substat={""}
                    >
                        e
                    </SummaryStat>
                ))}
            </div>
            <div className="per-day">
                <h4></h4>
            </div>
            ActivityFeed
        </div>
    );
}
