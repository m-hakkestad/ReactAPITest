import React from 'react';
import './App.css';

import Main from './components/Main/Main';
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
        <Main></Main>
      </header>
    </div>
    </ApolloProvider>
  );
}


export default App;
