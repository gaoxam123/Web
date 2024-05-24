import { useState } from "react";
export default function ScoreKeeper({numPlayers=3, target=5}) {
    const [scores, setScores] = useState(new Array(numPlayers).fill(0))
    const [hasScored, setHasScored] = useState(false)
    const increment = (idx) => {
        if(hasScored) return
        setScores(oldScores => {
            return oldScores.map((score, i) => {
                if(i === idx) {
                    if(score + 1 === target) setHasScored(true)
                    return score + 1
                }
                else return score
            })
        })
    }
    const reset = () => {
        setScores(new Array(numPlayers).fill(0))
        setHasScored(false)
    }
    return (
        <div>
            <ul>
            {scores.map((score, idx) => <li key={idx}>Player{idx + 1}: {score} <button onClick={() => increment(idx)}>+1</button> 
                {(score >= target && <span>Winner</span>)}
            </li>)}
            </ul>
            <button onClick={reset}>Reset</button>
        </div>
    )
}