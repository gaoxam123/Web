import { useState } from "react";
export default function SignupForm() {
    const [firstname, setFirstname] = useState("")
    const updateFirstname = (evt) => {
        setFirstname(evt.target.value)
    }
    const [lastname, setLastname] = useState("")
    const updateLastname = (evt) => {
        setLastname(evt.target.value)
    }
    const handleSubmit = () => {

    }
    return (
        <div>
            <label htmlFor="firstname"></label>
            <input id="firstname" type="text" placeholder="firstname" value={firstname} onChange={updateFirstname}/>
            <label htmlFor="lastname"></label>
            <input id="lastname" type="text" placeholder="lastname" value={lastname} onChange={updateLastname}/>
            <button onClick={handleSubmit}>Submit</button>
        </div>
    )
}