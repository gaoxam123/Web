import { useState } from "react"
export default function Counter() {
    let [num, setNum] = useState(0);
    function changeNum() {
        setNum(num + 1)
    }
    return (
        <div>
            <p>Count: {num}</p>
            <button onClick={changeNum}>Click me</button>
        </div>
    )
}