import { useState, useEffect } from "react";

export default function Counter() {
    const [count, setCount] = useState(0)
    const increment = () => {
        return setCount((c) => c + 1)
    }
    useEffect(function myEffect() {
        
    })
    return (
        <div>
            <h1>{count}</h1>
            <button onClick={increment}>Click me</button>
        </div>
    )
}