import React from 'react';
import logo from './logo.svg';
import './App.css';
import Button from './components/sub-components/Button';
import SocialCard from './components/SocialCard/SocialCard';
import CardManager from './components/CardManager/CardManager';
import Header from './components/Header/';

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <Header/>
        <CardManager/>

      </header>
    </div>
  );
}

export default App;
