import { getArticles } from "../../apis/aricles";
import { LoaderFunction, LoaderFunctionArgs, useLoaderData, useNavigate } from "react-router-dom";
import ArticleCard from "../../features/articles/ArticleCard";
import { Article, PaginationInfo } from "../../types";
import Pagination from "../../components/Pagination/Pagination";
import Button from "../../components/Elements/Button";
import ArticleSearchModal from "../../components/Modals/ArticleSearchModal";

export const loader: LoaderFunction = async ({ request } :LoaderFunctionArgs) => {
  const articles = await getArticles((new URL(request.url)));
  return {articles: articles.data , pagination_info: articles.pagination_info, q: articles.q};
}

const IndexPage = () => {
  const { articles, pagination_info }  = useLoaderData() as {articles: Article[], pagination_info: PaginationInfo };
  const navigate = useNavigate();

  return ( 
    <>
      <div className="flex justify-center">
        <div className="w-80 flex flex-row justify-between">
          <div className="w-60">
            <Button 
              label="新規作成"
              onClick={()=>navigate("/articles/new")}
              rounded_full
              small
            />
          </div>
          <ArticleSearchModal />
        </div>
      </div>
      { articles.length === 0
        ? 
          <>
            <div className="flex justify-center mt-32 font-bold text-lg">
              <div>No Coco found...</div>
            </div>
            <div className="flex justify-center mt-10 font-bold text-lg">
              <div>It's your turn.</div>
            </div>
          </>
        :
          <>
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
      }
    </>
   );
}

export default IndexPage;