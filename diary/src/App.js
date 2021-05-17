import logo from './logo.svg';
import './App.css';
import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button} from "react-bootstrap";

const data = `
# april,18,2021

spanish: 1 duolingo lesson
school: studied for some time
the story: done a good part
advent of code: downloaded the file
cs50: read through the pset page
php: looked it up earlier today, and looked at a few other now
sport: 10 push-ups
processing: added a little change to water ripple 2d
`;

function App() {

  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          You clicked {count} times
        </p>
        <Button
        onClick={() => {
          if (!loading) {
            setCount(count + 1);
            setLoading(true);
            setTimeout(() => {setLoading(false)}, 20000);
          }
        }}
        color="secondry"
        disabled={loading}>
          {!loading ? "Increment Counter" : "Loading..."}
        </Button>
      </header>
    </div>
  );
}

export default App;
