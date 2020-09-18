import React, { useState } from 'react';
import "./Chat.css";
import { Avatar, IconButton } from '@material-ui/core';
import { SearchOutlined, AttachFile, MoreVert, InsertEmoticon } from '@material-ui/icons';
import MicIcon from '@material-ui/icons/Mic';
import axios from "./axios";
import { useSelector } from 'react-redux';

function Chat({messages}) {
 const [input, setInput] = useState('');

 const userSignin = useSelector(state=>state.userSignin);
  const {userInfo} = userSignin;

    const sendMessage = async (e) => {
        e.preventDefault()
        await axios.post('/api/v1/messages/new', {
            message: input,
            name: 'James',
            received:false
        });
        setInput('');
    }

    return (
        <div className="chat">
            <div className="chat_header">
                <Avatar />

                <div className="chat_headerInfo">
                    <h3>Room name</h3>
                    <p>Last seen at.....</p>
                </div>

                <div className="chat_headerRight">
                <IconButton>
                    <SearchOutlined />
                </IconButton>
                <IconButton>
                    <AttachFile />
                </IconButton>
                <IconButton>
                    <MoreVert />
                </IconButton>
                </div>
            </div>

            <div className="chat_body">
                {messages.map((message) => (
                    <p key={message._id} className={`chat_message ${message.name === userInfo.name && "chat_receiver"}`}>
                    <span className="chat_name">{message.name}</span>

                    {message.message}

                    <span className="chat_timestamp">
                        {message.timestamp}
                    </span>
                </p>
                ))}
                
            </div>

            <div className="chat_footer">
                <InsertEmoticon />
                <form>
                    <input value={input} onChange={(e)=>setInput(e.target.value)} placeholder="Type a message" type="text" />
                    <button onClick={sendMessage}  type="submit">
                        Send a message
                    </button>
                </form>
                <MicIcon />
            </div>


        </div>
    )
}

export default Chat
