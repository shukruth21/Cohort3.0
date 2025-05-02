import { useEffect, useState } from "react"

function App() {
  let [visibility,setVisibility] = useState(true)
  useEffect(function(){
    let visible= setInterval(function(){
      setVisibility(c => !c)
    },5000)
    return ()=> clearInterval(visible)
  },[])

  return (
    <div>
      hi 
      { visibility && <Counter></Counter> }
      hello
    </div>
  )
}

function Counter() {
  const [count, setCount] = useState(0); // Initialize count state
  console.log("inside counter component");

  useEffect(function () {
    const interval = setInterval(function () {
      setCount((prevCount) => prevCount + 1); // Use functional form to ensure the latest state is used
    }, 1000);

    return  () => clearInterval(interval);// Cleanup interval on unmount
  }, []);

  return (
    <div>
      <h1>{count}</h1>
    </div>
  );
}

export default App
/// but in this after counter component re appears the count starts from 0 again
