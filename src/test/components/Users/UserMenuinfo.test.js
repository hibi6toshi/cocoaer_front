import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import UserMiniInfo from "../../../components/Users/UserMiniInfo";
import { BrowserRouter, RouterProvider, createMemoryRouter } from "react-router-dom";

const testUser = {
  id :"1234"
}

describe("Rendering", ()=>{
  test("user_id", ()=>{
    render(
      <BrowserRouter>
        <UserMiniInfo user={testUser}/>
      </BrowserRouter>
    )
    const userId = screen.getByText("1234");
    expect(userId).toBeInTheDocument();
  })
});

describe("Event", ()=>{
  test('Logo_link_to_userPage', async () => {
    const router = createMemoryRouter(  [
      {
        path: "/users/:userId",
        element: <div>userPage</div>,
      },
      {
        path: "/test",
        element: <UserMiniInfo user={testUser}/>
      }
    ],
    { initialEntries: ["/test"] });
    render(<RouterProvider router={router} />);
    const userId = screen.getByText("1234");
    
    act(() => {
      userEvent.click(userId);
    });
    await waitFor(() => {
      expect(router.state.location.pathname).toEqual("/users/1234");
    });
  });
});
