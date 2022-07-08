import React from "react";
import NutritionOverview from "../NutritionOverview/NutritionOverview";
import NutritionNew from "../NutritionNew/NutritionNew";
import NutritionDetail from "../NutritionDetail/NutritionDetail";
import { Route, Routes } from "react-router-dom";
import NotFound from "components/NotFound/NotFound";
import {
    NutritionContextProvider,
    useNutritionContext,
} from "components/contexts/Nutrition";

export default function NutritionContainer() {
    return (
        <NutritionContextProvider>
            <NutritionPage />
        </NutritionContextProvider>
    );
}

function NutritionPage() {
    const { nutritions } = useNutritionContext();

    return (
        <div className="nutrition-page">
            NutritionPage
            <Routes>
                <Route path="/" element={<NutritionOverview />} />
                <Route path="/create" element={<NutritionNew />} />
                <Route path="/id/:nutritionId" element={<NutritionDetail />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </div>
    );
}
