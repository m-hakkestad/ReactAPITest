import React from 'react';
import './App.css';
import CardManager from './components/CardManager/CardManager';
import Header from './components/Header/';
import Footer from './components/Footer/';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql'
})

function App() {

  return (
    <ApolloProvider client={client}>
      <div className="App">
      <header className="App-header">
        <Header/>
        <CardManager/>
        <Footer/>

      </header>
    </div>
    </ApolloProvider>
  );
}

export default App;
