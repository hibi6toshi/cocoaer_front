import { screen, render } from "@testing-library/react";
import ArticleInfo from "../../../features/articles/ArticleInfo";
import { BrowserRouter } from "react-router-dom";

const testArticle = {
  id : "123",
  user_id : 456,
  piety_target_id : 1, 
  piety_category_id : 2,  
  days : 3,
  cost : 4,
  title : "testArticleTitle",
  body : "testArticleBody",
  created_at :"2022-01-01",
  updated_at :"2022-01-01",
  picture : undefined,
  user : {
    id: "1234"
  }
}

describe("Rendering", ()=>{
  test('ArticleInfo', ()=>{
    render(
      <BrowserRouter>
        <ArticleInfo article={testArticle}/>
      </BrowserRouter>
    )

    const articleTitle = screen.getByText("testArticleTitle");
    expect(articleTitle).toBeInTheDocument();
    const articleBody = screen.getByText("testArticleBody");
    expect(articleBody).toBeInTheDocument();
  })
})