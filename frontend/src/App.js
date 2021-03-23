import logo from './logo.svg';
import './App.css';
import React from 'react';
import MLHandle from './components/MLHandle';

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>React + Flask Tutorial</p>
        <div>
          <h3>This better work</h3>
          <MLHandle />
        </div>
      </header>
    </div>
  );
}

export default App;