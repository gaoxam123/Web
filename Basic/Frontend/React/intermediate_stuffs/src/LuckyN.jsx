import { useState } from "react";
import Dice from "./Dice";
import Button from "./Button";
function d6() {
    return Math.floor(Math.random() * 6) + 1
}
function getRolls(n) {
    return Array.from({length: n}, () => d6())
}
function sum(nums) {
    return nums.reduce((prev, curr) => prev + curr, 0)
}
export default function LuckyN({numDice=2, winCheck}) {
    const [dice, setDice] = useState(getRolls(numDice))
    const isWinner = winCheck(dice)
    const roll = () => {
        setDice(oldDice => getRolls(numDice))
    }
    return (
        <main className="LuckyN">
            <h1>Lucky {isWinner && "You Win"}</h1>
            <Dice dice={dice}/>
            {/* <button onClick={roll}>Click me</button> */}
            <Button click={roll}/>
        </main>
    )
}