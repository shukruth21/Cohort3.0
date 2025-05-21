//custom hook example 

import { useEffect, useState } from "react"

/*import { useState } from 'react'

//custom hook - encapsulate repeated logic 
function useCounter(){
  //use another hook and return some value 
  const [count, setCount] = useState(0)
  function increaseCount(){
    setCount(count+1)
  }
  return {count,increaseCount}
}
function App() {
  // move these 
  /*const [count, setCount] = useState(0)
  function increaseCount(){
    setCount(count+1)
  }*/
 //using the custom hook 
 /*const {count,increaseCount} = useCounter()

  return (
    <div>
      <button onClick={increaseCount}>Increase {count}</button>
    </div>
  )*/
  /*return <div>
    <Counter />
    <Counter />
    <Counter />
  </div>
}
function Counter(){
  const {count,increaseCount} = useCounter()

  return (
    <div>
      <button onClick={increaseCount}>Increase {count}</button>
    </div>
  )
}*/ 

// useFetch()

// in this we have put all the logic to get the title of a post 

/*function App(){
  const [post,setPost] = useState({})
  async function getPosts() {
    const response = await fetch('https://dummyjson.com/posts/1')
    const json = await response.json()
    setPost(json)
  }
// runs the first time component is mounted since the dependency array is empty 
  useEffect(()=>{
    getPosts()
  },[])

  return (
    <div>
      {post.title}
    </div>
  )
}

*/

// but we can just put this logic in a custom hook and use it again and again 

/*import { useState,useEffect } from "react"

function usePostTitle(){
  const [post,setPost] = useState({})
  async function getPosts() {
    const response = await fetch('https://dummyjson.com/posts/1')
    const json = await response.json()
    setPost(json)
  }
// runs the first time component is mounted since the dependency array is empty 
  useEffect(()=>{
    getPosts()
  },[])
  return post.title 
}

function App(){
  const postTitle = usePostTitle()

  return (
    <div>
      {postTitle}
    </div>
  )
}*/

// more generic version of the above custom hook

/*function useFetch(url){
  const [data,setData]= useState({})
  async function getData() {
    const response = await fetch(url)
    const json = await response.json()
    setData(json)
  }
  useEffect(()=>{
    getData()
  },[])
  return {data}
}
function App(){
  const {data} = useFetch('https://jsonplaceholder.typicode.com/todos/1')
  return (
    <div>
      {JSON.stringify(data)}
    </div>
  )

}*/
// this will not work if the fetch url is dynamic
// because when the the component rerenders when new url is given by clicking a button 
// but in the usefetch we need to add dependency for url so that this works when url changes 
/*function useFetch(url){
  const [data,setData]= useState({})
  async function getData() {
    const response = await fetch(url)
    const json = await response.json()
    setData(json)
  }
  useEffect(()=>{
    getData()
  },[url])
  return {data}
}
function App(){
  const [todo,setTodo]= useState({})
  const {data} = useFetch('https://jsonplaceholder.typicode.com/todos/'+todo)
  return (
    <div>
      <button onClick={()=> setTodo(1)}>1</button>
      <button onClick={()=> setTodo(2)}>2</button>
      <button onClick={()=> setTodo(3)}>3</button>
      {JSON.stringify(data)}
    </div>
  )

}*/

//useEffect with refetching so that you request the backend for the current data every now and then 
// so that you give  fresh data as output 
// you can use setInterval to call getData function after every 10s 

/*

export const useFetch = (url: string, interval: number | null = null) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(url);
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(); // Initial fetch

    if (interval !== null) {
      const fetchInterval = setInterval(() => {
        fetchData();
      }, interval);

      return () => clearInterval(fetchInterval); // Clear interval on cleanup
    }
  }, [url, interval]);

  return { data, loading, error };
}
*/

//usePrev

const usePrev = (value) => {
  const ref = useRef();

  // Update the ref with the current value after each render
  useEffect(() => {
    ref.current = value;
  }, [value]);

  // Return the previous value (current value of ref before it is updated)
  return ref.current;
};

function App() {
  const [count, setCount] = useState(0);
  const prevCount = usePrev(count); // Track the previous count value

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Counter with usePrev Hook</h1>
      <p>Current Count: {count}</p>
      <p>Previous Count: {prevCount}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)} style={{ marginLeft: '10px' }}>Decrement</button>
    </div>
  );
}

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
      const handler = setTimeout(() => {
          setDebouncedValue(value);
      }, delay);

      return () => {
          clearTimeout(handler);
      };
  }, [value, delay]);

  return debouncedValue;
};



export default App
