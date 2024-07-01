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
  uri: 'http://localhost:4001/api/graphql',
  cache: new InMemoryCache(),
})


// export const client = new ApolloClient({
//   uri: 'https://employee-managment-dashboard-server.vercel.app/api/graphql',
//   cache: new InMemoryCache(),
// })



// const root = ReactDOM.createRoot(
//   document.getElementById('root') as HTMLElement
// );
const rootElement = document.getElementById('root') as HTMLElement;

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);

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
} else {
  console.error("Failed to find the root element.");

}
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
