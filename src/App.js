import React from 'react';
import logo from './logo.svg';
import './App.css';
import Button from './components/sub-components/Button';
import SocialCard from './components/SocialCard/SocialCard';
import CardManager from './components/CardManager/CardManager';

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <CardManager/>

      </header>
    </div>
  );
}

export default App;
