import { useState } from 'react'
import './App.css'

function App() {
  
            const [password,setPassword] =useState(true);
            function showPassword(){
                setPassword(!password);
            }
            return(
                <>
                    <div><input className="input-text" type="text" placeholder="Email"/></div>
                    <div>
                        <input className="input-pass" type={password ? 'password' : 'text'} placeholder="Password"/>
                        <button className="button-show" onClick={showPassword}>
                            {password ? 'Show Password' : 'Hide Password'}
                        </button>
                    </div>
                    <button className="button-login">Login</button>
                    <button className="button-signup">Sign up</button>
                </>
            );
}


export default App
