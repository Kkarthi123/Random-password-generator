
import { useState } from 'react'
import './App.css'
import { useEffect } from 'react';
import { useCallback } from 'react';
import { useRef } from 'react';

function App() {
  const [password, setPassword] = useState("");
  const [isCharAllowed, setIsCharAllowed] = useState(false);
  const [isNumberAllowed, setIsNumberAllowed] = useState(false);
  const [sliderLength, setSliderLength] = useState(10);
  let inputRef = useRef()


  const generatePassword = useCallback(()=>{
   let pass = "";
   let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
   let num = "0123456789";
   let char = "@#$&*[]><?%()/";

   //include char
   if(isCharAllowed) str += char

   //include num
   if(isNumberAllowed) str += num;


   for(let i = 0; i < sliderLength; i++){
    let randomKey = Math.floor(Math.random()*str.length)
    pass += str[randomKey]
   }
   setPassword(pass)
  }, [sliderLength,isCharAllowed,isNumberAllowed])

  const copyPassword = ()=>{
    navigator.clipboard.writeText(password);
    inputRef.current?.select()
  }

  useEffect(()=>{
    generatePassword()
  },[sliderLength, isCharAllowed, isNumberAllowed])



  return (
    <div className='password-conatiner-wrapper'>
      <h1>Random Password Generator</h1>
      <div className='password-container'>
        <div className='password-inputs'>
          <input type="text" value={password} placeholder='Password' readOnly ref={inputRef}/>
          <button className='password-copy-btn' onClick={copyPassword}>Copy</button>        
        </div>
        <div className='password-generate-options'>
          <div className='password-length-slider'>
            <label htmlFor="length">Length: {sliderLength}</label>
            <input 
              type="range" 
              name="" id="length" 
              min="7" 
              max="20" 
              value={sliderLength} 
              onChange={(event)=> setSliderLength(event.target.value)}
            />
          </div>
          <div className='password-checkbox'>
            
            <input 
              type="checkbox" 
              name="" 
              id="number" 
              defaultChecked={isNumberAllowed}
              onChange={()=> setIsNumberAllowed((prev) => !prev)} 
            />
            <label htmlFor="number">Numbers</label>
          </div>
          <div className='password-checkbox'>
            
            <input 
              type="checkbox" 
              name="" 
              id="character" 
              defaultChecked={isCharAllowed}
              onChange={()=>setIsCharAllowed((prev) => !prev)}
            />
            <label htmlFor="character">Charcters</label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
