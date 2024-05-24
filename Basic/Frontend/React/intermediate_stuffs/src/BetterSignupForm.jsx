import { useState } from "react";

export default function BetterSignupForm() {
    const [formData, setFormData] = useState({firstName: "", lastName: ""})
    const handleChange = (evt) => {
        const field = evt.target.name
        const newValue = evt.target.value
        setFormData(oldFormData => {
            return {
                ...oldFormData,
                [field]: newValue
            }
        })
    }
    return (
        <div>
            <label htmlFor="firstname"></label>
            <input id="firstname" type="text" placeholder="firstname" value={formData.firstName} onChange={handleChange} name="firstName"/>
            <label htmlFor="lastname"></label>
            <input id="lastname" type="text" placeholder="lastname" value={formData.lastName} onChange={handleChange} name="lastName"/>
            <button onClick={handleChange}>Submit</button>
        </div>
    )
}