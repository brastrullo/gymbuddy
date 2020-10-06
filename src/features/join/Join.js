import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from '@reach/router';

export function Join() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [roomID, setRoomID] = useState('');

  useEffect(() => {
    if (name.length > 0) {
      console.log(name);
    }
    if (roomID.length > 0) {
      console.log(roomID);
    }
  }, [name, roomID]);
  const changeHandler = (e) => {
    const el = e.target.id;
    e.preventDefault();
    switch (el) {
      case 'name':
        setName(e.target.value);
        break;
      case 'roomID':
        setRoomID(e.target.value);
        break;
      default:
    }
  };
  const joinRoomHandler = (e) => {
    e.preventDefault();
    navigate(`/room/${roomID}?name=${name}`);
  };
  const createRoomHandler = (e) => {
    e.preventDefault();
    navigate(`/room/${uuidv4()}?name=${name}`);
  };
  return (
    <div>
      <h1>Join</h1>
      <label htmlFor={'name'}>Name</label>
      <input
        onChange={changeHandler}
        type={'text'}
        name={'name'}
        id={'name'}
        value={name}
      />
      {name && (
        <>
          <label htmlFor={'roomID'}>Room ID</label>
          <input
            onChange={changeHandler}
            type={'text'}
            name={'roomID'}
            id={'roomID'}
            value={roomID}
          />

          <button onClick={joinRoomHandler} disabled={roomID.length === 0}>
            Join Room
          </button>
          <p>or</p>
          <button onClick={createRoomHandler}>Create Room</button>
        </>
      )}
    </div>
  );
}
