import React from 'react'
import "./Button.css"
function Button(props:{btnType:string,text:string,clickEvent:any}) {
  console.log("Button Integrated")
  function dummyFunction(){
    alert("dummy called")
  }
  return (
    <>
      <button className={props.btnType} onClick={props.clickEvent ? props.clickEvent : dummyFunction}>
{props.text}
      </button>
    </>
  )
}
export default React.memo(Button)