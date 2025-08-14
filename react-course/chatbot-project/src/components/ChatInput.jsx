import { useState } from 'react'
import {Chatbot} from 'supersimpledev'
import './ChatInput.css'

export function ChatInput({ chatMessages, setChatMessages }) {//now we can access this state after lifting state up
            const [inputText, setInputText] = useState('');
            function saveInputText(event) {//event is an object which contains the properties of onchange element.
                setInputText(event.target.value);
            }

            function sendMessage() {
                 const userMessage = {
                    message: inputText,
                    sender: "user",
                    id: crypto.randomUUID(),
                    timestamp: Date.now()
                };
                const newChatMessages = [
                    ...chatMessages,//syntax of spread oprtr
                    //this the new data to be updated
                    userMessage
                ]
                setChatMessages(newChatMessages);

                const response = Chatbot.getResponse(inputText);
                const botMessage = {
                    message: response,
                    sender: "robot",
                    id: crypto.randomUUID(),
                    timestamp: Date.now()
                };

                setChatMessages([
                    ...newChatMessages,//syntax of spread oprtr
                    //this the new data to be updated
                     botMessage
                ]);

                setInputText('');

            }
            function clearMessages() {
                setChatMessages([]);

                // Here, you could also run:
                // localStorage.setItem('messages', JSON.stringify([]));

                // However, because chatMessages is being updated, the
                // useEffect in the App component will run, and it will
                // automatically update messages in localStorage to be [].
            }

            return (
                <div className="chat-input-container">
                    <input
                        type="text"
                        placeholder="Send message to Chatbot"
                        onChange={saveInputText}
                        value={inputText}
                        className="chat-input"
                    />
                    <button onClick={sendMessage} className="send-button">Send</button>
                    <button onClick={clearMessages} style={{padding:'12px',borderRadius:'8px',border:'none',backgroundColor:'rgb(180,180,180)'}}>Clear</button>
                </div>
            );
        }