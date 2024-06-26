import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from './App';
import {act} from 'react';
import { Provider } from 'react-redux';
import ShowAllEmployees from './components/Dashboard/ShowAllEmployeesComponent/ShowAllEmployees';
import { store } from '../src/ReduxStore/store';
import Home from './components/Dashboard/HomeComponent/Home';
import WelcomeBack from './components/Dashboard/HomeComponent/WelcomeBackComponent/WelcomeBack';
import userEvent from '@testing-library/user-event';
import { ApolloProvider } from '@apollo/client';
import { client } from '.';


it("snapshot",async ()=>{
    
      const {container} = await act(async () => render(
          <Provider store={store}>
            <WelcomeBack/>
          </Provider>
  ))
      expect(container.querySelector("p")).toMatchSnapshot();
  
  })
  

  it("check",async()=>{
    
    const {container} = render(
      <ApolloProvider client={client}>
      <Provider store ={store}>
      <ShowAllEmployees/>
      </Provider>
      </ApolloProvider>,
  )

    const input = screen.getByTestId("search-input")
    userEvent.type(input,"")

    await waitFor(()=>{
      expect(container.querySelectorAll(".employee-name").length).toBe(0)
    })
  })