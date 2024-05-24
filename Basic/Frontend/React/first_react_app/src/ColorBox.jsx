import "./ColorBox.css"
import { useState } from "react"
export default function ColorBox({colors}) {
    const firstIndex = Math.floor(Math.random() * colors.length)
    const [id, setIndex] = useState(firstIndex)
    const changeColor = () => {
        let anotherIndex = 0
        do {
            anotherIndex = Math.floor(Math.random() * colors.length)
        }
        while(anotherIndex == id)
        setIndex(anotherIndex)
    }
    return <div className="ColorBox" onClick={changeColor} style={{backgroundColor: colors[id]}}>

    </div>
}