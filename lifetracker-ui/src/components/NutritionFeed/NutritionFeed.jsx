import React from "react";
import NutritionCard from "../NutritionCard/NutritionCard"
import {useAuthContext} from "components/contexts/AuthContext";

export default function NutritionFeed() {
    const {nutritions} = useAuthContext()
    //https://www.clipartspy.com/?clip-art=cute
    return (
        <div className="nutrition-feed">
            NutritionFeed

            {nutritions.length == 0 ? (
                <div className="empty-message">Nothing here yet</div>
            ) : (
                nutritions.map((e, i)=>
                    <NutritionCard nutrition={e} key={i}/>)
                
            )}
        </div>
    );
}
