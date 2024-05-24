import { useState } from "react";
import ShoppingListForm from "./ShoppingListForm";
import {v4 as uuid} from "uuid"
export default function ShoppingList() {
    const [items, setItems] = useState([{id: uuid(), product: "egg", quantity: 2}, {id: uuid(), product: "egg", quantity: 23}])
    const addItem = (item) => {
        if(!item.product) return
        setItems(currItems => {
            return [...currItems, {...item, id: uuid()}]
        })
    }
    return (
        <div>
            <h1>Shopping List</h1>
            <ul>
                {items.map(i => <li key={i.id}>{i.product} - {i.quantity}</li>)}
            </ul>
            <ShoppingListForm addItem={addItem}/>
        </div>
    )
}