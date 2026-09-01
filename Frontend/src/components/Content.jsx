import React, { useCallback, useState } from 'react'
import Button from "../desigh-system/Button/Button"
export default function abc() {
  const [x,updateX]=useState(10)
  const displayData=useCallback(()=>{
        alert("Called")

  },[])
  
  return (
    <div>
      Content - {x}
      <Button btnType="medium" text="Click Me" clickEvent={displayData}/>
      <input type='button' value="Increase" onClick={()=>updateX(200)} />
      
    </div>
  )
}
