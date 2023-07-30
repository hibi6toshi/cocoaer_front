import { LoaderFunction, useLoaderData } from "react-router-dom";
import { getArticle } from "../../apis/aricles";
import ArticleInfo from "../../features/articles/ArticleInfo";
import { Article } from "../../types";
import CommentsView from "../../features/comments/CommentsView";


export const loader: LoaderFunction = async ({ params: {articleId} }) => {
  if (!articleId) {
    throw new Error("No id provided");
  }
  const article = await getArticle(articleId);
  return article.data
}

const ShowPage = () => {
  const article = useLoaderData() as Article;

  return (
    <>
      <ArticleInfo 
        article={article} 
      />
      <CommentsView
        commentableType="Article"
        commentableId={article.id}
        commentableOwner={article.user}
      />
    </>
  );
}

export default ShowPage;