import React from 'react'
import NutritionFeed from "../NutritionFeed/NutritionFeed";
import { Link } from 'react-router-dom';

export default function NutritionOverview() {
  return (
    <div className='nutrition-overview'>
      <Link to="/nutrition/create">Record Nutrition</Link>
      <NutritionFeed />
      </div>
  )
}
