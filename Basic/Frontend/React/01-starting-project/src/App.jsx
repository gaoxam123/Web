import Calculator from "./Calculator"
import Log from "./Log"
import Header from "./Header"
import { useState } from "react"
import './index.css'

function App() {
    const [data, setData] = useState({
        initialInvestment: 10000,
        annualInvestment: 1200,
        expectedReturn: 6,
        duration: 10
    })
    function handleDataChange (inputIndex, newValue) {
        setData(oldData => { return {
            ...oldData, [inputIndex]: newValue}
        })
    }
    return (
        <div>
              <Header/>
              <Calculator data={data} onChangeData={handleDataChange}/>
              <div>
                  <Log data={data}/>
              </div>
        </div>
    )
}

export default App
