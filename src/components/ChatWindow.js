import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";

function ChatWindow({ socket, username, room, roomName, shownChats, setShownChats }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [isMinimalized, setIsMinimalized] = useState(false);



  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      console.log(messageData)
      await socket.emit("send_message", messageData);
      setMessageList((prev) => [...prev, messageData]);
      setCurrentMessage("");
    }
  };

  const handleKeypress = (e) => {
    //it triggers by pressing the enter key
    if (e.charCode === 13) {
      sendMessage();
    }
  };

  function minimalize(){
      setIsMinimalized(true)
  }
  function closeChat(){
    const isExecuted = window.confirm("Are you sure to leave this room? After leaving room your chat history won't be available.")
    if (isExecuted) {
    socket.emit("leave_room", room);
    setShownChats((prev) => prev.filter((el) => el.indx !== room))
    console.log(shownChats)
    }
  }

  useEffect(() => {
    socket.on("receive_message", (data) => {
      if (data.room === room ){
      setMessageList((prev) => [...prev, data]);
    }});
  }, [socket]);

  return (
    <div className={isMinimalized ? "non-visible-chat-heigh chat-window" :"chat-window"}>
      <div className="chat-header">
        <p onClick={()=>setIsMinimalized(false)}> Live Chat - {roomName}</p>
        <button onClick={minimalize}> - </button>
        <button onClick={closeChat}> x </button>
      </div>

      {!isMinimalized && (
      <div className="chat-body">
      <ScrollToBottom className="message-container">
        {messageList.map((msg, indx) => {
          return (
            <div className="message" id={username===msg.author ? "you" : "other"}>
              <div>
                <div className="message-content">
                  <p key={indx}>{msg.message}</p>
                </div>
                <div className="message-meta">
                    <p id="time">{msg.time}</p>
                    <p id="author"> {msg.author}</p>
                    
                </div>
              </div>
            </div>
          );
        })}
        </ScrollToBottom>
      </div> )}
      {!isMinimalized && (
      <div className="chat-footer">
        <input
          type="text"
          placeholder="Hey..."
          onChange={(e) => setCurrentMessage(e.target.value)}
          value={currentMessage}
          onKeyPress={handleKeypress}
        />
        <button onClick={sendMessage}>&#9658;</button>
      </div> )}
    </div>
  );
}

export default ChatWindow;
