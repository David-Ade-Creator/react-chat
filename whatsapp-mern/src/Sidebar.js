import React, { useEffect } from 'react';
import "./Sidebar.css";
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Avatar, IconButton } from '@material-ui/core';
import {SearchOutlined} from '@material-ui/icons';
import SidebarChat from './SidebarChat';
import { useSelector, useDispatch } from 'react-redux';
import { listUser } from './actions/userAction';

function Sidebar ({filterchat}) {

  const userSignin = useSelector(state=>state.userSignin);
  const {userInfo} = userSignin;
  const userId= userInfo._id;

  const listUsers = useSelector(state=> state.listUsers);
  const {loading,users,error} = listUsers;

  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(listUser(userId))
  },[])
  
return (
    <div className="sidebar">
        <div className="sidebar_header">
            <Avatar src="https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"/>
            <div className="sidebar_headerRight">
                <IconButton>
                    <DonutLargeIcon />
                </IconButton>
                <IconButton>
                    <ChatIcon />
                </IconButton>
                <IconButton>
                    <MoreVertIcon />
                </IconButton>
            </div>
        </div>

        <div className="sidebar_search">
            <div className="sidebar_searchContainer">
                <SearchOutlined />
                <input placeholder="Search or start new chat" type="text" />
            </div>
        </div>

        {loading ? <div>loading..</div> : error ? <div>error loading contact</div> :

        <div className="sidebar_chats">
           
                 { users.map( (user) => ( <SidebarChat key={user._id} username={user.name} filterchat={filterchat}/> ))}
            
        </div>
        }
    </div>
)
}

export default Sidebar;