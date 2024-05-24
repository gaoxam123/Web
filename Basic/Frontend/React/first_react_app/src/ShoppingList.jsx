import ShoppingListItem from "./ShoppingListItem"
export default function ShoppingList({items}) {
    return (
        <ul>
            {items.map(item => <ShoppingListItem key={item.id} {...item}/>)}
        </ul>
    )
}