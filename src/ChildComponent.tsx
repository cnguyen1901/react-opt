import React from 'react'

interface ChildComponentProps {
  count: number
  incrementCount: () => void
}

// React.memo will cache the component and only re-render it if the props chnage
// the drawback of .memo is it only do shallow comparison on primitive values such
// as number, text. If the props being passed are non-primitives such as
// an object or function. we'll need to wrap it around useCallback
const ChildComponent = ({ count, incrementCount }: ChildComponentProps) => {
  console.log("child component is rendering")
  return (
    <>
    <button onClick={incrementCount}>Increment count</button>
    <div><p>Count: ${count}</p></div>
    </>
  )
}

export default React.memo(ChildComponent)