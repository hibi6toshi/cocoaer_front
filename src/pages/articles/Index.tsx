import { getArticles } from "../../apis/aricles";
import { LoaderFunction, LoaderFunctionArgs, useLoaderData, useNavigate } from "react-router-dom";
import ArticleCard from "../../features/articles/ArticleCard";
import { Article, PaginationInfo } from "../../types";
import Pagination from "../../components/Pagination/Pagination";
import Button from "../../components/Elements/Button";

export const loader: LoaderFunction = async ({ request } :LoaderFunctionArgs) => {
  const articles = await getArticles((new URL(request.url)));

  return {articles: articles.data , pagination_info: articles.pagination_info};
}

const IndexPage = () => {
  const { articles, pagination_info }  = useLoaderData() as {articles: Article[], pagination_info: PaginationInfo };
  const navigate = useNavigate();

  if (articles.length === 0 ){
    return (
      <div className="flex justify-center">
        <div>
          <div className="w-40">
            <Button 
              label="新規作成"
              onClick={()=>navigate("/articles/new")}
              rounded_full
            />
          </div>
          <div className="mt-32 font-bold text-lg">
            "No Article found"
          </div>
        </div>
      </div>
    )
  }

  return ( 
    <>
      <div className="flex justify-center">
        <div className="w-40">
          <Button 
            label="新規作成"
            onClick={()=>navigate("/articles/new")}
            rounded_full
          />
        </div>
      </div>
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
      <div className="mt-8">
        <Pagination pagination_info={pagination_info}/>
      </div>
    </>

   );
}

export default IndexPage;