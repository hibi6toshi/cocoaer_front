import { screen, render, act, waitFor } from "@testing-library/react";
import ContentSelector from "../../../features/layouts/ContentSelector";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

describe("Event", ()=>{
  it("click_articles", async ()=>{
    const router = createMemoryRouter(
      [
        {
          path: "/articles",
          element: <div>articlesPage</div>
        },
        {
          path: "/test",
          element: <ContentSelector />
        }
      ],
      { initialEntries: ["/test"] }
    );

    render(<RouterProvider router={router} />);
    const articlesLink = screen.getByText("articles");

    act(() => {
      userEvent.click(articlesLink);
    });
    await waitFor(() => {
      expect(router.state.location.pathname).toEqual("/articles");
    });
  });

  it("click_projects", async ()=>{
    const router = createMemoryRouter(
      [
        {
          path: "/projects",
          element: <div>projectsPage</div>
        },
        {
          path: "/test",
          element: <ContentSelector />
        }
      ],
      { initialEntries: ["/test"] }
    );

    render(<RouterProvider router={router} />);
    const projectsLink = screen.getByText("projects");

    act(() => {
      userEvent.click(projectsLink);
    });
    await waitFor(() => {
      expect(router.state.location.pathname).toEqual("/projects");
    });
  });

  it("click_forums", async ()=>{
    const router = createMemoryRouter(
      [
        {
          path: "/forums",
          element: <div>forumsPage</div>
        },
        {
          path: "/test",
          element: <ContentSelector />
        }
      ],
      { initialEntries: ["/test"] }
    );

    render(<RouterProvider router={router} />);
    const forumsLink = screen.getByText("forums");

    act(() => {
      userEvent.click(forumsLink);
    });
    await waitFor(() => {
      expect(router.state.location.pathname).toEqual("/forums");
    });
  });
});
