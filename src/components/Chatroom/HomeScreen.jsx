import { useState } from "react";
import ChatBody from "./ChatBody/ChatBody";
import ChatSideBar from "./ChatSideBar/ChatSideBar";

const HomeScreen = (props) => {
  const [currentChattingMember, setCurrentChattingMember] = useState({});
  const [onlineUserList, setOnlineUserList] = useState([]);

  return (
    <main className="content">
      <div className="container-fluid p-0">
        <div className="container-fluid">
          <div className="row g-0">
            <ChatSideBar
              setCurrentChattingMember={setCurrentChattingMember}
              onlineUserList={onlineUserList}
              {...props}
            />
            <ChatBody
              setOnlineUserList={setOnlineUserList}
              currentChattingMember={currentChattingMember}
              {...props}
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default HomeScreen;