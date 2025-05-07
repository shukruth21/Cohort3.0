import { createContext, useContext, useState } from 'react'

// problem here is the state is defined in one of the lowest component in the tree 
// due to which the state cant be accessed in the other lowest component 
//toggleBubblestate compnonent here 
//for this we need to roll up the state variable to the least common ancesstor that is 
//Lightbulb component 
/*function App() {
  return <div>
    <LightBulb />
  </div>
}
function LightBulb(){
  return <div>
    <BulbState />
    <ToggleBulbState />
  </div>
}
function BulbState(){
  const [bulbOn,setBulbOn]= useState(true)
  return <div>
    {bulbOn? "bulb on": "bulb off"}
  </div>
}
function ToggleBulbState(){
  return <div>
    <button onclick={handleToggle}>Toggle Bulb</button>
  </div>
}*/

//this to understand rolling up the state 
/*function App() {
  return <div>
    <LightBulb />
  </div>
}
function LightBulb(){
  const [bulbOn,setBulbOn]= useState(true)

  //bulbon is a prop to the bulbstate component 
  // bulbon and setbulbon are props to the togglestate components 
  return <div>
    <BulbState bulbOn={bulbOn} />
    <ToggleBulbState setBulbOn={setBulbOn} />
  </div>
}
function BulbState({bulbOn}){
  return <div>
    {bulbOn? "bulb on": "bulb off"}
  </div>
}
function ToggleBulbState({setBulbOn}){
  function handleToggle(){
    setBulbOn(currentState => !currentState)
  }
  return <div>
    <button onClick={handleToggle}>Toggle Bulb</button>
  </div>
}*/

const BulbContext = createContext()
function App() {
  const [bulbOn,setBulbOn]= useState(true)

  //wrapping the component using the provider 
  return <div>
    <BulbContext.Provider value={{bulbOn, setBulbOn}}>
      <LightBulb />
    </BulbContext.Provider>
  </div>
}
function LightBulb(){
  
  return <div>
    <BulbState />
    <ToggleBulbState  />
  </div>
}
function BulbState(){
  const {bulbOn} = useContext(BulbContext)
  return <div>
    {bulbOn? "bulb on": "bulb off"}
  </div>
}
function ToggleBulbState(){
  const {bulbOn,setBulbOn} = useContext(BulbContext)
  function handleToggle(){
    setBulbOn(!bulbOn)
  }
  return <div>
    <button onClick={handleToggle}>Toggle Bulb</button>
  </div>
}

export default App
