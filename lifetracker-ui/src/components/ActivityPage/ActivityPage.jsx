import React, { useEffect } from 'react'
import Loading from "../Loading/Loading";
import ActivityFeed from "../ActivityFeed/ActivityFeed";
import { useAuthContext } from "components/contexts/Auth";
import { useActivityContext } from "components/contexts/activity";
import {  } from "components/contexts/activity";
import { useNavigate } from 'react-router-dom';

export default function ActivityPage() {
  const navigate = useNavigate()
  const {isLoggedIn} = useAuthContext()
  const {isProcessing} = useActivityContext()
  useEffect(()=>{
  if(!isLoggedIn){
    navigate("/login")
  }
},[])
  return (
    <div className='activity-page'>
      {/* <ActivityFeed/> */}
      {isProcessing?<Loading/>:<ActivityFeed/>}
    </div>
  )
}
