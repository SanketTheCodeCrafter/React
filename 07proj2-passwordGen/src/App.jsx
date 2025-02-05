import { useState } from 'react'
import { useCallback } from 'react';
import  {useEffect} from 'react';
import { useRef } from 'react';
import './App.css'

function App() {
  const [length, setLength]=useState(8);
  const [numAllowed, setNumAllowed]=useState(false);
  const [charAllowed, setCharAllowed]=useState(false);
  const [password, setPassword]=useState('');

  //useRef hook
  const passwordRef=useRef(null);

  const passwordGen=useCallback(()=>{
    let pass='';
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    
    if(numAllowed){
      str+="0123456789";
    }
    if(charAllowed){
      str+="!@#$%^&*()_+";
    }
    for(let i=0;i<length;i++){
      let char=Math.floor(Math.random()*str.length+1);
      pass+=str.charAt(char);
    }

    setPassword(pass);

    console.log(pass)
  }, [length, numAllowed, charAllowed, setPassword]);

  useEffect(()=>{
    passwordGen();
  }, [length, numAllowed, charAllowed, setPassword])


  const copyPasswordToClipboard=useCallback(()=>{
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 99);
    window.navigator.clipboard.writeText(password);  
  })
  

  return (
    <>
      <div className="main-container">
        <h1>Password Generator</h1>
        <div className="pass-container">
          <input type="text" value={password} ref={passwordRef} readOnly placeholder='Password'/>

          <button onClick={copyPasswordToClipboard}
          >Copy</button>
        </div>

        <input type="range" min={8} maxLength={100} value={length} 
        onChange={(e) => setLength(e.target.value)} />
        <label>Length: {length}</label>

        <input type="checkbox" defaultChecked={numAllowed}
        onChange={() => setNumAllowed((prev) => !prev)} />
        <label>Numbers</label>

        <input type="checkbox" defaultChecked={charAllowed}
        onChange={() => setCharAllowed((prev) => !prev)} />
        <label>Characters</label>
      </div>
    


    </>
  )
}

export default App
