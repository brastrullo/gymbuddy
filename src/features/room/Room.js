import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { v4 as uuidv4 } from 'uuid';
import { useLocation } from '@reach/router';

let socket;

export function Room(props) {
  const { roomID } = props;
  const [name, setName] = useState('');
  // const [socket, setSocket] = useState();
  const location = useLocation();
  const query = useQuery();
  const [chatLog, setChatLog] = useState([]);
  // const [connectedUsers, setConnectedUsers] = useState({});
  useEffect(() => {
    socket = io();
    console.log({ socket });

    const qsName = query.get('name');
    setName(qsName);

    socket.on('connection', (time) => {
      setChatLog([
        ...chatLog,
        { sender: qsName, message: `connected ${time}` },
      ]);
    });

    socket.emit('join', { name: qsName, roomID }, (sender, message) => {
      console.log({ sender, message });
      setChatLog([...chatLog, { sender, message }]);
    });

    return () => {
      socket.emit('disconnect');
      socket.off();
    };
  }, [location.search]);

  useEffect(() => {
    console.log(chatLog);
  }, [chatLog]);

  function useQuery() {
    // console.log(useLocation().search);
    return new URLSearchParams(useLocation().search);
  }

  const ChatLog = () => {
    const Message = (props) => {
      const { sender, message } = props;
      // console.log({ sender, message });
      return (
        <li>
          <span>{sender} </span>
          <span>{message}</span>
        </li>
      );
    };

    const messageList = chatLog.map((obj, i) => {
      console.log({ obj }, obj.sender, obj.message);
      return (
        <Message key={`msg${i}`} sender={obj.sender} message={obj.message} />
      );
    });
    return (
      <div>
        <ul>{messageList}</ul>
      </div>
    );
  };
  return (
    <div>
      <h1>Room:</h1>
      <h2>{roomID}</h2>
      <ChatLog />
    </div>
  );
}
