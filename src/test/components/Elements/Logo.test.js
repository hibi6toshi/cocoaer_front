import {act, render, screen, waitFor} from '@testing-library/react'
import userEvent from "@testing-library/user-event";
import '@testing-library/jest-dom'
import { RouterProvider} from 'react-router-dom'
import Logo from '../../../components/Elements/Logo';
import { createMemoryRouter } from 'react-router-dom';

describe("Link", ()=>{
  test('Logo_link_to_top', async () => {
    // https://zenn.dev/kotaesaki/articles/4fd85a63582efd
    const router = createMemoryRouter(  [
      {
        path: "/",
        element: <div>homePage</div>,
      },
      {
        path: "/logo",
        element: <Logo />
      }
    ],
    { initialEntries: ["/logo"] });
    render(<RouterProvider router={router} />);
    const logo = screen.getByText("Logo");

    // ************************************************************************************
    // Warning: An update to RouterProvider inside a test was not wrapped in act(...).
    // When testing, code that causes React state updates should be wrapped into act(...):
    // act(() => {
    //   /* fire events that update state */
    // });
    // /* assert on the output */
    // ************************************************************************************
    act(() => {
      userEvent.click(logo);
    });
    await waitFor(() => {
      expect(router.state.location.pathname).toEqual("/");
    });
  });
});