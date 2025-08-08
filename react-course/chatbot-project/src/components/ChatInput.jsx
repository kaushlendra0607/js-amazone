import { useState, useRef, useEffect } from 'react'
import {Chatbot} from 'supersimpledev'
import './ChatInput.css'

export function ChatInput({ chatMessages, setChatMessages }) {//now we can access this state
            const [inputText, setInputText] = useState('');
            function saveInputText(event) {//event is an object which contains the properties of       onchange element.
                setInputText(event.target.value);
            }

            function sendMessage() {
                const newChatMessages = [
                    ...chatMessages,//syntax of spread oprtr
                    {//this the new data to be updated
                        message: inputText,
                        sender: "user",
                        id: crypto.randomUUID()
                    }
                ]
                setChatMessages(newChatMessages);

                const response = Chatbot.getResponse(inputText);
                setChatMessages([
                    ...newChatMessages,//syntax of spread oprtr
                    {//this the new data to be updated
                        message: response,
                        sender: "robot",
                        id: crypto.randomUUID()
                    }
                ]);

                setInputText('');

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
                </div>
            );
        }