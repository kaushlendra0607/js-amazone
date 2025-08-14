import { useState } from 'react'
import {Chatbot} from 'supersimpledev'
import './ChatInput.css'
import loadingSpinner from '../assets/loading-spinner.gif'

export function ChatInput({ chatMessages, setChatMessages }) {//now we can access this state after lifting state up
            const [inputText, setInputText] = useState('');
            const [isLoading, setIsLoading] = useState(false);
            function saveInputText(event) {//event is an object which contains the properties of onchange element.
                setInputText(event.target.value);
            }

           async function sendMessage() {
                 if (isLoading || inputText === '') {
                    return;//if isLoading is true which means the chatbot is still processing a previous message (waiting for the bot’s response).This prevents from sending another message when the bot hasnt replied yet
                }
                setIsLoading(true);
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
                setChatMessages([
                    ...newChatMessages,
                    {
                        message: <img src={loadingSpinner} alt="Loading..." style={{width:'40px',margin:'-15px'}} />,
                        sender: 'robot',
                        id: "loading-message"
                    }
                ]);

                const response = await Chatbot.getResponseAsync(inputText);
                const botMessage = {
                    message: response,
                    sender: "robot",
                    id: crypto.randomUUID(),
                    timestamp: Date.now()
                };

                setChatMessages([
                    ...newChatMessages.filter(msg => msg.id !== "loading-message"),//syntax of spread oprtr
                    //this the new data to be updated
                     botMessage
                ]);
                 setIsLoading(false);
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
            function sendOnEnter(event){
                if(event.key === 'Enter'){//this will send the message on enter
                    sendMessage();
                    setInputText('');
                }
                if(event.key === 'Escape'){
                   setInputText('');
                }
            }
            return (
                <div className="chat-input-container">
                    <input
                        type="text"
                        placeholder="Send message to Chatbot"
                        onChange={saveInputText}
                        value={inputText}
                        className="chat-input"
                        onKeyDown={sendOnEnter}
                    />
                    <button onClick={sendMessage} className="send-button">Send</button>
                    <button onClick={clearMessages} style={{padding:'12px',borderRadius:'8px',border:'none',backgroundColor:'rgb(180,180,180)'}}>Clear</button>
                </div>
            );
        }