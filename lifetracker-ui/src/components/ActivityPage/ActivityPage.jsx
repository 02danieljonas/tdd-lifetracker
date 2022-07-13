import React, { useEffect } from 'react'
import Loading from "../Loading/Loading";
import ActivityFeed from "../ActivityFeed/ActivityFeed";
import { useAuthContext } from "components/contexts/Auth";
import { useNutritionContext } from "components/contexts/Nutrition";
import { useActivityContext } from "components/contexts/activity";
import {  } from "components/contexts/activity";
import { useNavigate } from 'react-router-dom';

export default function ActivityPage() {
  const navigate = useNavigate()
  const {isLoggedIn} = useAuthContext()
  const {isProcessing} = useActivityContext()
  const { nutritions } = useNutritionContext();

  let sum = 0;
  nutritions.forEach((element) => {
      sum += element.calories;
  });

  useEffect(()=>{
  if(!isLoggedIn){
    navigate("/login")
  }
},[])
  return (
    <div className='activity-page'>
      {isProcessing?<Loading/>:<ActivityFeed avgCaloriesPerCategory={[
        {
            calories: sum,
            category: "Avg Daily Calories",
        }
    ]}/>}
    </div>
  )
}
