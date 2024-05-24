import { useState } from "react"
import Rating from "@mui/material/rating"
export default function RatingDemo() {
    const [score, setScore] = useState(3)
    return (
        <div>
            <h1>Current Score: {score}</h1>
            <Rating name="simple-controlled" value={score} onChange={(evt, newValue) => {
                setScore(newValue)
            }}/>
        </div>
    )
}