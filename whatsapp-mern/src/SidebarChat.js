import React from 'react';
import "./SidebarChat.css";
import { Avatar} from '@material-ui/core';

function SidebarChat({filterchat,username}) {
    return (
        <div className="sidebarChat">
            <Avatar />
            <div className="sidebarChat_info" onClick={filterchat}>
                 <h2>{username}</h2>
               {/* <p>This is the last message</p> */}
            </div>
        </div>
    )
}

export default SidebarChat
