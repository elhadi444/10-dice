import { useEffect, useState } from 'react'
import Die from './Die'
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'

function App() {

  //const [gameWon, setGameWon] = useState(false)

  // useEffect(() => {
  //   const firstValue = dice[0].value;
  //   const allHeld = dice.every(die => die.isHeld);
  //   const allSameValue = dice.every(die => die.value === firstValue);

  //   if (allHeld && allSameValue) {
  //     setGameWon(true);
  //     console.log("You won!");
  //   }
  // }, [dice])

  const [dice, setDice] = useState(() => generateAllNewDice())
  const [rolls, setRolls] = useState(0)
  
  const gameWon = dice.every(die => die.isHeld) && dice.every(die => die.value === dice[0].value);

  function generateAllNewDice() {
    const newDice = []
    for (let i = 0; i < 10; i++) {
      newDice.push({
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid()
      })
    }
    return newDice
  }

  function reroll() {
    setDice(oldDice => oldDice.map(die =>
      die.isHeld ? die : {
        ...die,
        value: Math.ceil(Math.random() * 6),
      }
    ))
    setRolls(prevRolls => prevRolls + 1)
  }

  function holdDie(id) {
    setDice(oldDice => oldDice.map(die =>
      die.id === id ? { ...die, isHeld: !die.isHeld } : die
    ))
  }

  const diceElements = dice.map((die) => (
    <Die
      hold={() => holdDie(die.id)}
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
    />
  ))

  return (
    
    <main className='bg-gray-100 max-w-110 max-h-110 h-full w-full flex flex-col justify-evenly items-center rounded-2xl'>

      {gameWon && <Confetti />}


      <div>
        <h1 className="text-4xl font-bold m-0 mb-1 text-center">10 Dice</h1>
        <p className="my-0 mx-18 font-medium text-center text-blue-900">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      </div>
      <div className='grid grid-cols-5 grid-rows-2 gap-5 '>
        {diceElements}
      </div>

      <p className="my-0 mx-18 font-medium text-center text-blue-900">number of rolls: { rolls }</p>
      
      {gameWon? 
        <button className='px-10 h-12 bg-indigo-600 text-white rounded-md drop-shadow-md text-lg' onClick={()=>{setDice(generateAllNewDice); setRolls(0)}}>New Game</button> : 
        <button className='px-10 h-12 bg-indigo-600 text-white rounded-md drop-shadow-md text-lg' onClick={reroll}>Roll</button>
      }
      
    </main>
  )
}

export default App
