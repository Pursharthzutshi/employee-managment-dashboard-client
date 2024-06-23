import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
// newFunction();
import { Provider } from 'react-redux';
import { store } from '../src/ReduxStore/store';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';

export const client = new ApolloClient({
  uri: 'https://employee-managment-dashboard-server-n4z9p0nyq.vercel.app/api/graphql',
  cache: new InMemoryCache(),
  credentials: "omit",

})


// client.query({query:})

// const GETDATA = gql`
// `

// client.query({query:GET})

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>

    <BrowserRouter>
      <Provider store={store}>
        <ApolloProvider client={client}>
          <App />
        </ApolloProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
