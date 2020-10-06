import React, { useState, useEffect } from 'react';
import { Router } from '@reach/router';
import './App.css';
import { Join } from './features/join/Join';
import { Room } from './features/room/Room';

function App() {
  const [data, setData] = useState({});

  useEffect(() => {
    const callAPI = async () => {
      const res = await fetch('/users');
      const data = await res.json();
      setData(data);
    };
    callAPI();
  }, []);

  useEffect(() => {
    if (Object.keys(data).length > 0) {
      console.log(data);
    }
  }, [data]);

  return (
    <div className="App">
      <Router>
          <Join path="/" />
          <Room path="/room/:roomID" />
      </Router>
    </div>
  );
}

export default App;
