
import { useEffect, useState } from "react"
import Die from "./components/Die"
import { nanoid } from "nanoid"
import Confetti from "react-confetti"
export default function App() {

    const [dice,setDice]=useState(allNewDice())
    const [tenzies,setTenzies]=useState(false)

    useEffect(()=>{
        const allHeld=dice.every(die=>die.isHeld)
        const diceValue=dice.every(die=>die.value===dice[0].value)

        if (allHeld&&diceValue){
            setTenzies(true)
            

        }


    },[dice])


    console.log(dice)

    function generateNewDice(){
        return{value:Math.ceil(Math.random()*6),
            isHeld:false,
            id:nanoid()}
    }
    function allNewDice(){
        let newArray=[]
        for(let i=0;i<10;i++){
            newArray.push(generateNewDice())

        }
        return newArray
    }
    function holdDice(id){
        setDice(preDice=>preDice.map(die=>{
            return die.id===id?{...die,isHeld:!die.isHeld}:die
        }))
    }

    function rollDice(){
        if(!tenzies){
            setDice(prevDice=>prevDice.map(die=>{
                return die.isHeld?die:generateNewDice()
            }))
        }else{
            setTenzies(false)
            setDice(allNewDice())
        }
        
    }
    const dieElements=dice.map(die=><Die value={die.value}
         isHeld={die.isHeld} 
         holdDice={()=>holdDice(die.id)}/>)
   
    return(
        <main>
            {tenzies && <Confetti />}
            <div className="die-all">
               {dieElements}
            </div>
           <button className="roll-dice" onClick={rollDice}>{tenzies?"New Game":"Roll"}</button>
        </main>
    )
}
