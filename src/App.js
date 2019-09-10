import React from 'react';
import './App.css';
import CardManager from './components/CardManager/CardManager';
import Header from './components/Header/';
import Footer from './components/Footer/';

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <Header/>
        <CardManager/>
        <Footer/>

      </header>
    </div>
  );
}

export default App;
