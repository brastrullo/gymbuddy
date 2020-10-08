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

    const qsName = query.get('name');
    setName(qsName);

    /* message from the server about someone connecting */
    socket.on('connected chat message', (who, time) => {
      console.log('received connected chat message', who, time)
      setChatLog([
        ...chatLog,
        { sender: who, message: `connected ${time}` },
      ]);
    });

    /* this is the one called automatically by the library, when the conneection is successfully set up from client to server */
    socket.on('connect', () => {
      console.log('socket connected to the server')
      socket.emit('join room', { name: qsName, roomID }, (sender, message) => {
        console.log('got join room callback', { sender, message });
        setChatLog([...chatLog, { sender, message }]);
      });
    });

    return () => {
      socket.emit('disconnect');
      socket.off();
    };
  }, [location.search]);

  useEffect(() => {
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

    console.log('heres the chatlog', chatLog)
    const messageList = chatLog.map((obj, i) => {
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
