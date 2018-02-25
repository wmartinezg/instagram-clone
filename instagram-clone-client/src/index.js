import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes'; //hace referencia a ./routes/index.js
                                //por ser index no necesita escribirse
import registerServiceWorker from './registerServiceWorker';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

const client = new ApolloClient({
    // By default, this client will send queries to the
    //  `/graphql` endpoint on the same host
    link: new HttpLink({uri:'http://localhost:3000/graphql'}),
    //si no se indica se asume http://localhost:3001/graphql
    cache: new InMemoryCache()
  });

//const App = <Routes />
const App =
<ApolloProvider client={client}>
    <Routes />
</ApolloProvider>

ReactDOM.render(App, document.getElementById('root'));
registerServiceWorker();
