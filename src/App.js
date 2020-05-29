import React from 'react';
import './App.css';
import HackerNews from './Components/HackerNews';

function App() {
  return (
    <div className="App">
      <h1>
      <text style={{color: '#d35400'}}>Hacker News</text>
        </h1>
      <HackerNews />
    </div>
  );
}

export default App;
