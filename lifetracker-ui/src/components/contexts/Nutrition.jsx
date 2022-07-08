import { createContext, useContext, useEffect, useState } from "react";

const NutritionContext = createContext(null);

export const NutritionContextProvider = ({ children }) => {
    const [nutritions, setNutritions] = useState([
        {
            name: "name01",
            calories: 1,
            imageUrl:
                "https://www.wpclipart.com/animals/cats/kitten-and-butterfly.png",
            category: "category1",
            createdAt: new Date().toLocaleDateString(),
        },
        {
            name: "name02",
            calories: "2",
            imageUrl: "https://openclipart.org/image/800px/337526",
            category: "category2",
            createdAt: new Date().toLocaleDateString(),
        },
        {
            name: "name03",
            calories: "3",
            imageUrl:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCZbU7CG4gQftm1f3CYHzinl3C0yIfcs8h2BHk4YcyjojQUFU&s",
            category: "category3",
            createdAt: new Date().toLocaleDateString(),
        },
    ]);

    const NutritionValue = {
        nutritions,
        setNutritions,
    };

    return (
        <NutritionContext.Provider value={NutritionValue}>
            <>{children}</>
        </NutritionContext.Provider>
    );
};
export const useNutritionContext = () => useContext(NutritionContext);
