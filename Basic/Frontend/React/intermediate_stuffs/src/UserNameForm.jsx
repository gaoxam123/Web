import { useState } from "react";
export default function UserNameForm() {
    const [username, setUsername] = useState("abs")
    const updateUsername = (evt) => {
        setUsername(evt.target.value)
    }
    return (
        <div>
            <input type="text" placeholder="username" value={username} onChange={updateUsername}/>
            <button>Submit</button>
        </div>
    )
}