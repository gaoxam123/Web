import { useState } from "react";
import {v4 as uuid} from "uuid"
export default function EmojiClicker() {
    const [emojies, setEmojies] = useState([{id: uuid(), emoji: ":)"}])
    const addEmoji = () => {
        let newEmojies = [...emojies]
        newEmojies.push({id: uuid(), emoji: ":'("})
        setEmojies(oldEmojies => newEmojies)
    }
    const deleteEmoji = (id) => {
        let newEmojies = []
        emojies.filter(e => e.id !== id).forEach(e => newEmojies.push(e))
        setEmojies(oldEmojies => newEmojies)
    }
    return (
        <>
            {emojies.map(emoji => (<span onClick={() => {deleteEmoji(emoji.id)}} key={emoji.id} style={{fontSize: "4rem"}}>{emoji.emoji}</span>))}
            <br/>
            <button onClick={addEmoji}>Add Emoji</button>
        </>
    )
}