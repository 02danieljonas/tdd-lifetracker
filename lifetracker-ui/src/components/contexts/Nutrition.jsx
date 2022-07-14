import { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "components/contexts/Auth";
import axios from "axios";
import ApiClient from "components/services/ApiClient";
import constant from "../../../constant";

const NutritionContext = createContext(null);

export const NutritionContextProvider = ({ children }) => {
    const { user, fetchUser } = useAuthContext();

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
    //${user}
    const fetcNutritions = () => {
        axios
            .get(`${constant()}/nutrition/`, {
                headers: {
                    Authorization: `Bearer ${user}`,
                },
            })
            .then(({ data }) => {
                setNutritions(data.nutritions);
            });
    };

    const createNutrition = async (data) => {
        ApiClient.createNutrition(data);
    
        // axios
        //     .get(`${constant()}/nutrition/`, body, {
        //         headers: {
        //             'Content-Type': 'application/json',
        //             Authorization: `Bearer ${user}`,
        //         },
        //     })
    };

    const NutritionValue = {
        nutritions,
        setNutritions,
        fetcNutritions,
        createNutrition,
    };

    return (
        <NutritionContext.Provider value={NutritionValue}>
            <>{children}</>
        </NutritionContext.Provider>
    );
};
export const useNutritionContext = () => useContext(NutritionContext);
