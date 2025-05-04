import { Children, useEffect, useState } from "react"

/*function App() {
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
}*/

// Card component 
/*function App(){
  return (
    <div>
      <Card>
        <h2>Card 1</h2>
        <p> details of card</p>
      </Card>
      <Card>
        <h2>
          Card 2
        </h2>
        <p>details of card</p>

      </Card>

    </div>
    
    
  )

}
function Card({children}){
  return (
    <div>
      <div style={{
            border: '1px solid #ccc',
            borderRadius: '5px',
            padding: '20px',
            margin: '10px',
            boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.1)',
          }}>{children}</div>
    </div>
  )

}*/

//lists and keys
const ItemList = ({ items }) => {
  return (
      <ul>
          {items.map(item => (
              <li key={item.id}>{item.name}</li>
          ))}
      </ul>
  );
};

const App = () => {
  const items = [
      { id: 1, name: 'Item 1' },
      { id: 2, name: 'Item 2' },
      { id: 3, name: 'Item 3' },
  ];

  return <ItemList items={items} />;
};
export default App
/// but in this after counter component re appears the count starts from 0 again
