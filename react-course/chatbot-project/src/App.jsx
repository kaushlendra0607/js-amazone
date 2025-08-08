import { useState, useRef, useEffect } from 'react'
import { ChatInput } from './components/ChatInput'
import ChatMessages from './components/ChatMessages';

import './App.css';

function App() {
            const [chatMessages, setChatMessages] = useState(/*no need to use the word React as we imported the useState directly*/
                [
                    {
                        message: " hello sir..",
                        sender: "user",
                        id: "id1"
                    }, {
                        message: "Hello! How can I help you?",
                        sender: "robot",
                        id: "id2"
                    }, {
                        message: "flip a damn coin",
                        sender: "user",
                        id: "id3"
                    }, {
                        message: "Sure! You got heads",
                        sender: "robot",
                        id: "id4"
                    }
                ]
            );
            //we removed above code from ChatMessages funcn to its parent component i.e. App this makes the availability of state to all the child component of App nad this process is called lifting the state up
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
