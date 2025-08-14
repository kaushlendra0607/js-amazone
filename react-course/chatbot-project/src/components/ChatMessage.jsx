import RobotProfileImage from '../assets/robot.png'
import UserProfileImage from '../assets/profile-1.jpg'
import './ChatMessage.css';
import dayjs from 'dayjs'

export function ChatMessage({ message, sender, timestamp }) { 
            //const message = props.message;
            //const sender=props.sender;
            //const {message,sender}=props;
            /*
            if(sender === "robot"){
                return (
                    <div>
                        <img src="robot.png" alt="robot" width="50" />
                        {message}
                    </div>
                );
            }*/
            return (
                <div className={sender === "user" ? "chat-message-user":"chat-message-robot"}>
                    {sender === "robot" && <img src={RobotProfileImage} alt="robot" className="chat-message-profile" />}
                    <div className="chat-message-text">
                       {message}
                        <div className="message-time">
                           {dayjs(timestamp).format("h:mma")}
                        </div>
                    </div>
                    {sender === "user" && <img src={UserProfileImage} alt="user" className="chat-message-profile"/>}
                </div>
            );
        }