import React from "react";
import Confetti from "react-confetti";
import Die from "./components/die";
import "./App.css";
import { nanoid } from "nanoid";

function App() {
  const generateNewDie = () => {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  };

  const allNewDice = () => {
    const arr = [];
    for (let i = 0; i < 10; i++) {
      arr.push(generateNewDie());
    }
    return arr;
  };

  const height = window.innerHeight;
  const width = window.window.innerWidth;

  const [tenzies, setTenzies] = React.useState(false);
  const [dice, setDice] = React.useState(allNewDice());
  const [count, setCount] = React.useState(0);
  const [time, setTime] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => setTime((oldTime) => oldTime + 1), 1000);

    if (tenzies) {
      clearInterval(timer);
    }
    
    return () => clearInterval(timer);
  }, [tenzies]);

  React.useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    const firstValue = dice[0].value;

    const allSameValue = dice.every((die) => die.value === firstValue);

    if (allHeld && allSameValue) {
      setTenzies(true);
    }
  }, [dice]);

  const diceElements = dice.map((die) => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
    />
  ));

  const rollDice = () => {
    if (!tenzies) {
      setCount((oldCount) => oldCount + 1);
      setDice((oldDice) =>
        oldDice.map((die) => {
          return die.isHeld ? die : generateNewDie();
        })
      );
    } else {
      setTenzies(false);
      setDice(allNewDice());
      setCount(0);
    }
  };

  const holdDice = (id) => {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  };

  return (
    <main>
      {tenzies && <Confetti width={width} height={height} />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.{" "}
      </p>
      <div className="dice-container">{diceElements}</div>
      <div className="bottomElements">
        <h3>total Count: {count}</h3>
        <button className="roll-dice" onClick={rollDice}>
          {tenzies ? "New Game" : "Roll"}
        </button>
        <h3>total Time: {time}s</h3>
      </div>
    </main>
  );
}

export default App;
