import { useState } from "react";
export default function ShoppingListForm({addItem}) {
    const [formData, setFormData] = useState({product: "", quantity: 0})
    const [isValid, setIsValid] = useState(false)
    const validate = (product) => {
        if(product.length === 0) {
            setIsValid(false)
        }
        else {
            setIsValid(true)
        }
    }
    const handleChange = (evt) => {
        if(evt.target.name === "product") validate(evt.target.value)
        setFormData(currData => {
            return {
                ...currData,
                [evt.target.name]: evt.target.value
            }
        })
    }
    const handleSubmit = (evt) => {
        evt.preventDefault()
        if(isValid) {
            addItem(formData)
            setFormData({product: "", quantity: 0})
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <h1>Product is: {formData.product} and quatity is: {formData.quantity}</h1>
            <label htmlFor="product">Product Name</label>
            <input type="text" placeholder="product name" name="product" id="product" onChange={handleChange} value={formData.product}/>
            {!isValid && <p style={{color: "red"}}>Product name cant be empty</p>}
            <label htmlFor="quantity">Quantity</label>
            <input type="number" placeholder="1" name="quantity" id="quantity" onChange={handleChange} value={formData.quantity}/>
            <button disabled={!isValid}>Add Item</button>
        </form>
    )
}