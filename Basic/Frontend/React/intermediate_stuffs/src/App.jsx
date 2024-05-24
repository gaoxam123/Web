import './App.css'
import Counter from './Counter'
import Dumbo from './Dumbo'
import ScoreKeeper from './ScoreKeeper'
import EmojiClicker from './EmojiClicker'
import Die from './Die'
import Dice from './Dice'
import LuckyN from './LuckyN'
import UserNameForm from './UserNameForm'
import SignupForm from './SignupForm'
import BetterSignupForm from './BetterSignupForm'
import ShoppingListForm from './ShoppingListForm'
import ShoppingList from './ShoppingList'
import RatingDemo from './RatingDemo'

function sum(nums) {
  return nums.reduce((prev, curr) => prev + curr, 0)
}

function lessthan4(dice) {
  return sum(dice) < 4
}

function allSameValue(dice) {
  return dice.every(v => v === dice[0])
}

function App() {

  return (
    <>
      <RatingDemo/>
    </>
  )
}

export default App
