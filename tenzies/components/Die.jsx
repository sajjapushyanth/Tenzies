export default function Die(props){
   

    return(
        <div
         className={`die-face ${props.isHeld?"true":""}`}
         onClick={props.holdDice}
         >
            <h2 className="die-value">{props.value}</h2>
            
        </div>
    )
  
}