import { screen, render, waitFor, act } from "@testing-library/react";
import { BrowserRouter, RouterProvider, createMemoryRouter } from "react-router-dom";
import ProjectCard from "../../../features/projects/ProjectCard";
import userEvent from "@testing-library/user-event";

const testProject = {
  id : "123",
  user_id : "456",
  piety_target_id : 1, 
  piety_category_id : 2, 
  limit_day  : "2023-12-31",
  cost : 4,
  title : "testProjectTitle",
  body : "testProjectBody",
  created_at : "2023-12-31", 
  updated_at : "2023-12-31",
  user :{
    id: "1234"
  }
}

describe("Rendering", ()=>{
  it("projectCard", ()=>{
    render(
      <BrowserRouter>
        <ProjectCard project={testProject}/>
      </BrowserRouter>
    )
    const projectTitle = screen.getByText("testProjectTitle");
    expect(projectTitle).toBeInTheDocument();
  });
});

describe("Event", ()=>{
  it("card_link_to_ProjectInfo", async ()=>{
    const router = createMemoryRouter(
      [
        {
          path: "/projects/:projectId",
          element: <div>projectPage</div>
        },
        {
          path: "/test",
          element: <ProjectCard project={testProject} />
        }
      ],
      { initialEntries: ["/test"] }
    );

    render(<RouterProvider router={router} />);
    const projectTitle = screen.getByText("testProjectTitle");

    act(() => {
      userEvent.click(projectTitle);
    });
    await waitFor(() => {
      expect(router.state.location.pathname).toEqual("/projects/123");
    });
  });
});