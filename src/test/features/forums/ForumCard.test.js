import { screen, render, waitFor, act } from "@testing-library/react";
import { BrowserRouter, RouterProvider, createMemoryRouter } from "react-router-dom";
import ForumCard from "../../../features/forums/ForumCard";
import userEvent from "@testing-library/user-event";

const testForum = {
  id : "123",
  user_id : "456",
  piety_target_id : 1, 
  piety_category_id : 2, 
  days : 3,
  cost : 4,
  title : "testForumTitle",
  body : "testForumBody",
  created_at : "2023-12-31", 
  updated_at : "2023-12-31",
  user :{
    id: "1234"
  }
}

describe("Rendering", ()=>{
  it("forumCard", ()=>{
    render(
      <BrowserRouter>
        <ForumCard forum={testForum}/>
      </BrowserRouter>
    )
    const forumTitle = screen.getByText("testForumTitle");
    expect(forumTitle).toBeInTheDocument();
  });
});

describe("Event", ()=>{
  it("card_link_to_ForumInfo", async ()=>{
    const router = createMemoryRouter(
      [
        {
          path: "/forums/:forumId",
          element: <div>forumPage</div>
        },
        {
          path: "/test",
          element: <ForumCard forum={testForum} />
        }
      ],
      { initialEntries: ["/test"] }
    );

    render(<RouterProvider router={router} />);
    const forumTitle = screen.getByText("testForumTitle");

    act(() => {
      userEvent.click(forumTitle);
    });
    await waitFor(() => {
      expect(router.state.location.pathname).toEqual("/forums/123");
    });
  });
});