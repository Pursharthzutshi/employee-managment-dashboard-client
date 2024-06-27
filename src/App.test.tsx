import { render, screen, waitFor } from '@testing-library/react';
import { act } from 'react';
import { Provider } from 'react-redux';
import ShowAllEmployees, { show_all_employees_data_query } from './components/Dashboard/ShowAllEmployeesComponent/ShowAllEmployees';
import { store } from '../src/ReduxStore/store';
import WelcomeBack from './components/Dashboard/HomeComponent/WelcomeBackComponent/WelcomeBack';
import userEvent from '@testing-library/user-event';
import { MockedProvider } from '@apollo/client/testing';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { client } from '.';



const mockShowAllEmployeesData = [
  {
    request: {
      query: show_all_employees_data_query,
    },
    result: {
      data: {
        showAllEmployee: [
          {
            emailId: "josh@gmail.com",
            name: "josh",
            uid: "8e5d676e-8674-4711-a50a-0f32b514c4c1",
          },
        ],
      },
    },
  },
];
describe("show", () => {
  it("check", async () => {


    render(
      <MockedProvider mocks={mockShowAllEmployeesData} addTypename={false} >
        <BrowserRouter>
          <Provider store={store}>
            <ShowAllEmployees />
          </Provider>
        </BrowserRouter>
      </MockedProvider>
    )

    await waitFor(() => {

      expect(screen.getByText("josh@gmail.com")).toBeInTheDocument();
      expect(screen.getByText("josh")).toBeInTheDocument();
    });

  })
})


it("snapshot", async () => {

  const { container } = await act(async () => render(
    <Provider store={store}>
      <WelcomeBack />
    </Provider>
  ))
  expect(container.querySelector("p")).toMatchSnapshot();

})

// test("List",()=>{
//   render()
// })

// const searchFilter = useAppSelector((state:any)=>state.SearchFilterSilcer.SearchFilter)

it("search", async () => {

  const { container } =  render(

    <BrowserRouter>
      <Provider store={store}>
        <ApolloProvider client={client}>
          <ShowAllEmployees />
        </ApolloProvider>
      </Provider>
    </BrowserRouter>

  )
  console.log(container)

  const input = await screen.findByTestId("search-input")
  userEvent.type(input, "Something I will never type")
  console.log(userEvent)

  await waitFor(() => {
    console.log((container.querySelectorAll(".employee-name").length))
    expect(container.querySelectorAll(".employee-name").length).toBe(0)
  });
})