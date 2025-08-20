import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'//axios is like fetch for more do gpt
import { useEffect } from 'react';

function App() {
  const [jokes , setJokes] = useState([]);
  useEffect(()=>{
    axios.get('/api/jokes')//we have created a proxy look in vite.config.js whcih will replace the /api part and mark a proxy so that the browser thinks that the request is coming fromm the same origin and cors protocols will pass
    .then((res)=>{//for proxy we should give the same initial part of url on which the server is running
      setJokes(res.data);
    })
    .catch(()=>{
      console.log('Eerrrooorrrr');
      
    })
  },[])

  return (
    <> 
       <h1> Chai Aur Code </h1>
       <p>JOKES: {jokes.length}</p>
       {
        jokes.map((joke)=>(
          <div key={joke.id}>
            <h3> {joke.title} </h3>
            <p>{joke.content}</p>
          </div>
        ))
       }
    </>
  )
}

export default App
