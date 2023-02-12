import { useState } from 'react'
import './App.css'
import { Counter } from './Components/Counter'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <div className="App">
      <div>
        <h2>Counter</h2>
        <div>
          <Counter />
        </div>
      </div>
    </div>
  )
}

export default App
