import './App.css'
import Chicken from './Chicken'
import Greeter from './Greeter'
import Die from './Die'
import List from './List'
import DoubleDice from './DoubleDice'
import ColorList from './ColorList'
import Slots from './Slots'
import ShoppingList from './ShoppingList'
import PropertyList from './PropertyList'
import Clicker from './Clicker'
import Form from './Form'
import Counter from './Counter'
import Toggler from './Toggler'
import ToggleCounter from './ToggleCounter'
import ColorBox from './ColorBox'
import ColorBoxGrid from './ColorBoxGrid'

const data = [
    {id: 1, name: "eggs", quantity: 12, completed: false},
    {id: 2, name: "milk", quantity: 1, completed: true},
    {id: 3, name: "chicken", quantity: 4, completed: false},
    {id: 4, name: "carrots", quantity: 6, completed: true},
]

const properties = [
    {id: 129031, name: "Dessert Yurt", rating: 4.9, price: 150},
    {id: 129331, name: "Lone Mountain Cabin", rating: 4.8, price: 250},
    {id: 129032, name: "Cactus Retreat", rating: 4.75, price: 300},
    {id: 129033, name: "Redwood Treehouse Escape", rating: 4.9, price: 120},
    {id: 129034, name: "Ocean View Condo", rating: 4.7, price: 140},
    {id: 129035, name: "Gold Miner Campground", rating: 4.69, price: 96},
]

const colors = [
    "red",
    "green",
    "blue",
    "yellow",
    "cyan",
    "white",
    "baige"
]

function App() {
    return <div>
        <ColorBoxGrid colors={colors}/>
    </div>
}

export default App
