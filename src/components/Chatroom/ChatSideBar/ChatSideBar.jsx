import React from 'react'
import { useState } from 'react';

const ChatSideBar = (props) => {
  const [chatUsers, setChatUsers] = useState([]);
  const [users, setUsers] = useState([]);
  const [isShowAddPeopleModal, setIsShowAddPeopleModal] = useState(false);

  // Function to redirect the user to the default chat room
  const redirectUserToDefaultChatRoom = (chatUsers) => {
    if (props?.location?.pathname === '/chat' ) {
      props.setCurrentChattingMember(chatUsers[0]);
      props.history.push("/c/" + chatUsers[0].roomId);
    }
  };
  return (

    <div>
      


    </div>
  )
}

export default ChatSideBar