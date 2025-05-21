import { useContext } from "react"
import { useState } from "react"
import { createContext } from "react"

//Context api vs Recoil 

// context api -drilling down the states to lower nodes of the component tree
/*
const CountContext= createContext()
function CountContextProvider({children}){
  const [count,setCount]=useState(0)
  return (
    <CountContext.Provider value={{count,setCount}}>
      {children}
    </CountContext.Provider>
  )

}
function App() {

  return <CountContextProvider>
    <Increase />
    <Decrease />
    <Value />
  </CountContextProvider>
}
function Increase(){
  const {count,setCount} = useContext(CountContext)
  return (
    <button onClick={()=>{
      setCount(count+1)
    }}>Increase</button>
  )
}
function Decrease(){
  const {count,setCount} = useContext(CountContext)
  return (
    <button onClick={()=>{
      setCount(count-1)
    }}>Decrease</button>
  )
}
function Value(){
  const {count}= useContext(CountContext)
  return <div>
    <p>Count = {count}</p>
  </div>
}
*/
 //import { RecoilRoot } from "recoil";
 //import { atom } from "recoil";
//wrap application with recoilroot

/*function App() {

  return (
    <RecoilRoot>
      <Counter />
    </RecoilRoot>
  )
}
//create an atom of counter state 
/*
const counter = atom({
	key: "counter",
	default: 0
})

// create buttons
function Buttons() {
  const setCount = useSetRecoilState(counter);

  function increase() {
    setCount(c => c + 1)
  }
  
  function decrease() {
    setCount(c => c - 1)
  }
  
  return <div>
    <button onClick={increase}>Increase</button>
    <button onClick={decrease}>Decrease</button>
  </div>
}
//create counter component 
function Counter() {
  const count = useRecoilValue(counter);

  return <div>
    {count}
    <Buttons />
  </div>
}
*/
import { RecoilRoot } from "recoil";
import { atom } from "recoil";
const networkNotificationAtom = atom({
  key: "network",
  default: 102
})
const jobsNotificationAtom = atom({
  key: "jobs",
  default: 0
})
const messageNotificationAtom = atom({
  key: "messages",
  default: 4
})
function App(){
  return <RecoilRoot>
    <MainApp />
  </RecoilRoot>
}
function MainApp(){
  const networkNotification = useRecoilValue({networkNotificationAtom})
  const jobsNotification = useRecoilValue({jobsNotificationAtom})
  const messageNotification = useRecoilValue({messageNotificationAtom})
  return (
    <div>
      <button>My network({networkNotification >=100 ? "99+":networkNotification})</button>
      <button>Jobs{jobsNotification}</button>
      <button>Message{messageNotification}</button>
    </div>
  )

}


export default App
