import React, { useEffect, useState } from "react";
import ForumIcon from "@mui/icons-material/Forum";
import ScrollToBottom from "react-scroll-to-bottom";
import axios from "axios";


function Chat({ socket, shownChats, setShownChats }) {
  useEffect(() => {
    axios
      .get("http://localhost:3001/getrooms")
      .then((res) => setRoomList(res.data));

    socket.on("new_room", (data) => {});
  });

  const rooms = [
    {
      roomName: "room1",
      roomDescription: "bjuewq fnejdqwkf uifewq",
      discussion: [],
    },
  ];
  
  const [roomList, setRoomList] = useState(rooms);
  const [isExpanded, setIsExpanded] = useState(false);
  const [username, setUsername] = useState("");
  const [newRoom, setNewRoom] = useState({
    roomName: "",
    roomDescription: "",
    discussion: [],
  });

  function changeHandler(e) {
    setNewRoom((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  function joinRoom(room, username) {
      console.log(username + "username")

    if (username && room !== "" && (shownChats.filter(e => e.indx === room).length === 0) ) {
      socket.emit("join_room", room);
      setShownChats((prev) => [...prev, {indx: room, roomName: roomList[room].roomName, author: username}]);
    }
   
  }

  function nickFunction(e){
      setUsername(e.target.value)
  }

  async function createRoom() {
    await socket.emit("add_room", newRoom);
    // if (newRoom.roomName !== "") {
    //setRoomList((prev) => [...prev, newRoom]);

    axios.post("http://localhost:3001/rooms", newRoom).then((res) => {
      setNewRoom({
        roomName: "",
        roomDescription: "",
        discussion: [],
      });
      setIsExpanded(false);
    });

    //}
  }

  return (
    <div className="chat-main-part">
      <h3> Wanna confide and talk ?</h3>
      <button
        className="add-new-room"
        onClick={() => setIsExpanded((prev) => !prev)}
      >
        Create your own chat-room
      </button>

      {isExpanded && (
        <div className="create-new-room-UI">
          <input
            placeholder="topic"
            name="roomName"
            onChange={changeHandler}
            value={newRoom.roomName}
          />
          <input
            placeholder="description"
            name="roomDescription"
            onChange={changeHandler}
            value={newRoom.roomDescription}
          />
          <button onClick={createRoom}> Add </button>
        </div>
      )}

      <h4 className="joinTitle">
        Join to room(s) as <input id="nick" placeholder="your nick" onChange={nickFunction} value={username} />
      </h4>

      {roomList.map((item, index) => {
        return (
          <p
            key={index}
            onClick={() => joinRoom(index, username)}
            className="room-list-item"
          >
            <ForumIcon /> {item.roomName} <span> {item.roomDescription} </span>{" "}
          </p>
        );
      })}
      
      

    </div>
  );
}

export default Chat;
