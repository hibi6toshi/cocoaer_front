import { getArticles } from "../../apis/aricles";
import { useLoaderData } from "react-router-dom";
import ArticleCard from "../../features/articles/ArticleCard";
import { Article } from "../../types";

export async function loader() {
  const articles = await getArticles();
  return articles.data;
}

const IndexPage = () => {
  const articles  = useLoaderData() as Article[];

  return ( 
    <>
    <div>articles_index</div>
    <div className="
      container 
      mx-auto
      grid
      grid-cols-1
      sm:grid-cols-2
      ms:grid-cols-3
      lg:grid-cols-3
    ">
      {articles?.map((article: Article) => (
        <ArticleCard
          key={article.id}
          article={article}
        />
      ))}
    </div>
    </>

   );
}

export default IndexPage;