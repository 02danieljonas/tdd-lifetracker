import React from 'react'
import { useParams } from 'react-router-dom'

export default function NutritionDetail() {
  let s = useParams()
  console.log(s.nutritionId)
  return (
    <div>NutritionDetail</div>
  )
}
