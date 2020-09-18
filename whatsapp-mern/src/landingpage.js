import React, { useEffect, useState } from 'react';
import './App.css';
import Sidebar from './Sidebar';
import Chat from './Chat';
import Pusher from "pusher-js";
import axios from './axios';


function LandingPage() {
  const [messages, setMessages] = useState([]);
  const [filteredmsg, setFilteredmsg] = useState([]);



  useEffect(()=>{
    axios.get('/messages/sync')
    .then((response) => {
      console.log(response.data);
      setMessages(response.data);
    });
  },[])



  const filterchat =()=> {
  const tempmsg = messages.filter(message => message.name === 'David');
  setMessages(tempmsg)
  }
 

  useEffect(()=>{
    var pusher = new Pusher('c84134a807d7c9fe83c4', {
      cluster: 'ap2'
    });

  var channel = pusher.subscribe('messages');
    channel.bind('inserted',(newMessage)=> {
      setMessages([...messages,newMessage]);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    }

  },[messages]);


  return (
    <div className="app">
      <div className="app_body">
      <Sidebar filterchat={filterchat}/>
      <Chat messages={messages} filteredmsg={filteredmsg}/>
      </div>
    </div>
  );
}

export default LandingPage;