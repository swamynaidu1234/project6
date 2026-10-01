import React, { useCallback, useState } from 'react'
import Button from "../desigh-system/Button/Button"
export default function abc() {
  const [x,updateX]=useState(10)
  const displayData=useCallback(()=>{
        alert("Called")

  },[])
  
  return (
    <div>
      
    </div>
  )
}
