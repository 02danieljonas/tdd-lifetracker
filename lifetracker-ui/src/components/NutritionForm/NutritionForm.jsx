import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "components/contexts/AuthContext";

export default function NutritionForm() {
    const { nutritions, setNutritions} = useAuthContext()



    const [name, setName] = useState("");
    const [calories, setCalories] = useState(1);
    const [imageUrl, setImageUrl] = useState("");
    const [category, setCategory] = useState("");
    const navigate = useNavigate()


    const [error, setError] = useState(null);
    const createNewNutrition = () => {
        setError(null);
        {
            // if (name == "") {
            //     setError("name");
            //     console.log(error);
            // }
            // if (calories == "") {
            //     setError("calories");
            //     console.log(error);
            // }
            // if (imageUrl == "") {
            //     setError(error + "imageUrl");
            //     console.log(error);
            // }
            // if (category == "") {
            //     setError(error + " category");
            //     console.log(error);
            // }
        }
        if (name == "" || calories == "" || imageUrl == "" || category == "") {
            setError("Error");
        } else {
            setNutritions([
                ...nutritions,
                { name, calories, imageUrl, category },
            ]);
            console.log(nutritions);
            navigate("/nutrition")
        }
    };

    return (
        <div className="nutrition-form">
            <div className={error ? "error" : "hidden error"}>
                You are missing value(s)
            </div>
            <label>name</label>
            <input
                type="text"
                className="form-input"
                onChange={(e) => {
                    setName(e.target.value);
                }}
                id="name"
                name="name"
            />
            <label>calories</label>
            <input
                type="number"
                className="form-input"
                onChange={(e) => {
                    setCalories(e.target.value);
                }}
                id="calories"
                name="calories"
                defaultValue="1"
            />
            <label>imageUrl</label>
            <input
                type="text"
                className="form-input"
                onChange={(e) => {
                    setImageUrl(e.target.value);
                }}
                id="imageUrl"
                name="imageUrl"
            />
            <label>category</label>
            <input
                type="text"
                className="form-input"
                onChange={(e) => {
                    setCategory(e.target.value);
                }}
                id="category"
                name="category"
            />
            <button
                className="submit-nutrition"
                onClick={() => {
                    createNewNutrition();
                }}
            >
                Save
            </button>
        </div>
    );
}
