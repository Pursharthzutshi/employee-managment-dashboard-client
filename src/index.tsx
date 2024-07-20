import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache, split } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';

import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { Provider } from 'react-redux';
import { store } from './ReduxStore/store';
import { BrowserRouter } from 'react-router-dom';

// const webLink = new GraphQLWsLink(
//   createClient({
//     url: "ws://localhost:4004/graphql",
//   }),
// );

// const httpLink = new HttpLink({
//   uri: 'http://localhost:4004/graphql',
// });

const webLink = new GraphQLWsLink(
  createClient({
    url: "ws://https://employee-managment-dashboard-client.vercel.app/graphql",
  }),
);

const httpLink = new HttpLink({
  uri: 'https://employee-managment-dashboard-client.vercel.app/graphql',
});

const link: any = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  webLink,
  httpLink,
);

export const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
  connectToDevTools: true

});


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ApolloProvider client={client}>
        <Provider store={store}>
          <App />
        </Provider>
      </ApolloProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: repor tWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
