import { act, render, screen, waitFor } from "@testing-library/react";
import ArticleCard from "../../../features/articles/ArticleCard";
import { BrowserRouter, RouterProvider, createMemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

const testArticle = {
  id : "123",
  user_id : "456",
  piety_target_id : 1, 
  piety_category_id : 2,  
  days : 3,
  cost : 4,
  title : "testArticleTitle",
  body : "testArticleBody",
  created_at :"2023-12-31",
  updated_at :"2023-12-31",
  picture : undefined,
  user : {
    id: "1234"
  }
}

describe("Rendering", ()=>{
  it("articleCard", ()=>{
    render(
      <BrowserRouter>
        <ArticleCard article={testArticle}/>
      </BrowserRouter>
    )
    const articleTitle = screen.getByText("testArticleTitle");
    expect(articleTitle).toBeInTheDocument();
    const articleBody = screen.getByText("testArticleBody");
    expect(articleBody).toBeInTheDocument();
  });
});

describe("Event", ()=>{
  it("card_link_to_ArticleInfo", async ()=>{
    const router = createMemoryRouter(
      [
        {
          path: "/articles/:articleId",
          element: <div>articlePage</div>
        },
        {
          path: "/test",
          element: <ArticleCard article={testArticle} />
        }
      ],
      { initialEntries: ["/test"] }
    );

    render(<RouterProvider router={router} />);
    const articleTitle = screen.getByText("testArticleTitle");

    act(() => {
      userEvent.click(articleTitle);
    });
    await waitFor(() => {
      expect(router.state.location.pathname).toEqual("/articles/123");
    });
  });
});