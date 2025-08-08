import { useRef, useEffect } from 'react'
import { ChatMessage } from './ChatMessage';
import './ChatMessages.css';

function ChatMessages({ chatMessages }) {//using state will change the html as well when the data changes.
            // const chatMessages = array[0];//array[0] gives the current data from state.
            // const setChatMessages = array[1];//this is actually a function and has to be treated xactly like a funcn. this updates the data in future.
            // const [ chatMessages, setChatMessages] = array;//shortcut for above two lines(order matters of chatMessages and setChatMessages)on useState line shortest method is used for destructuring.

            /* function sendMessage(){
                 chatMessages.push({
                     message:"test",
                     sender:"user",
                     id:crypto.randomUUID()
                 });
                 console.log(chatMessages);
                 the above method is modifying the data directly.Not good practice 
                 we shuld modify the copy of  the data.Use useState...
                  }*/
            const chatMessagesRef=useRef(null);//useRef lets us save an html element ,basically works like queryselector
            useEffect(()=>{//useEffect lets us run some code after a component is created or updated
            const containerElem = chatMessagesRef.current;
            if(containerElem){
                containerElem.scrollTop=containerElem.scrollHeight;
                //scrollTop is how far is scroll from the top and scrollHeight is total scroling height of the element so if we set the scrollTop equal to Height then it will get on bottom...
            }
               
            },[chatMessages]);
            return (
                <div className="chat-messages-container"
                ref={chatMessagesRef}
                >
                    {
                        chatMessages.map((chatMessage) => {
                            return (
                                <ChatMessage
                                    message={chatMessage.message}
                                    sender={chatMessage.sender}
                                    key={chatMessage.id}
                                />
                            );
                        })
                    }
                </div>
            );
        }
export default ChatMessages;