import { useState, useEffect } from 'react'
import { ChatInput } from './components/ChatInput'
import ChatMessages from './components/ChatMessages';

import './App.css';
import { Chatbot } from 'supersimpledev';

function App() {
            const [chatMessages, setChatMessages] = useState(/*no need to use the word React as we imported the useState directly*/
                JSON.parse(localStorage.getItem('messages')) ||  [
                    {
                        message: " hello sir..",
                        sender: "user",
                        id: "id1"
                        ,timestamp: Date.now()
                    }, {
                        message: "Hello! How can I help you?",
                        sender: "robot",
                        id: "id2"
                        ,timestamp: Date.now()
                    }, {
                        message: "flip a damn coin",
                        sender: "user",
                        id: "id3"
                        ,timestamp: Date.now()
                    }, {
                        message: "Sure! You got heads",
                        sender: "robot",
                        id: "id4"
                        ,timestamp: Date.now()
                    }
                ]
            );
            //we removed above code from ChatMessages funcn to its parent component i.e. App this makes the availability of state to all the child component of App nad this process is called lifting the state up
            useEffect(()=>{
                localStorage.setItem('messages',JSON.stringify(chatMessages));
            },[chatMessages]);
            useEffect(() => {
                    Chatbot.addResponses({
                    'goodbye': 'Goodbye. Have a great day!',
                    'give me a unique id': function() {
                        return `Sure! Here's a unique ID: ${crypto.randomUUID()}`;
                    }
                    });

                // [] tells useEffect to only run once. We only want to run
                // this setup code once because we only want to add these
                // extra responses once.
            }, []);
             if (chatMessages.length===0){
                return(
                    <div className="app-container">
                    <div className="initial-message">Welcome to chatbot Project.Send a message using textbox below</div>
                    <ChatMessages chatMessages={chatMessages} />
                    <ChatInput chatMessages={chatMessages} setChatMessages={setChatMessages}/>
                    </div>
                )
            }
            return (
                <div className="app-container">{/*Here we now add some props (attributes) to our created element ChatInput */}
                    
                    <ChatMessages chatMessages={chatMessages} />
                    {/*we generally use same name*/}
                    <ChatInput
                        chatMessages={chatMessages}
                        setChatMessages={setChatMessages}
                    />
                </div>
            );
        }

export default App
