import React, { useState, useCallback, useMemo, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import ChildComponent from './ChildComponent';

// function FormInput() {
//   const [value, setValue] = useState('')
//   return <div><p>Input 1</p><input value={value} type="text" onChange={(e) => setValue(e.target.value)} /></div>
// }

const expensiveFunction = (count: number) => {
  // artificial delay (expensive computation)
  for (let i = 0; i < 1000000000; i++) { }
  return count * 3;
}

function App() {
  const [value, setValue] = useState('')
  const [count, setCount] = useState(0)
  const [cats, setCats] = useState([])

  const calculateDaysBetweenDates = () => {
    
  }

  const incrementCount = useCallback(() => setCount(count + 1), [count])

  const myCount = useMemo(() => expensiveFunction(count), [count])

  useEffect(() => {
    const get_cats = async () => {
      const aList = ["a", "b", "c"]
      const fetch_cats = aList.map(async (item) => {
        const resp = await fetch("https://cat-fact.herokuapp.com/facts")
        return resp.json()
      })
      const cats = await Promise.all(fetch_cats)
      // @ts-ignore
      setCats(cats)
      console.log(cats)
    }

    get_cats().catch((e) => console.log(e))
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        {/* <FormInput /> */}
        <p>Input 2</p>
        <input value={value} type="text" onChange={(e) => setValue(e.target.value)} />
        <br />
        <h3>my count {myCount}</h3>
        <ChildComponent count={count} incrementCount={incrementCount} />
      </header>
    </div>
  );
}

export default App;
