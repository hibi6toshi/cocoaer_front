import { useNavigate } from "react-router-dom";
import { Article } from "../../types";

interface ArticleCardProps {
  article: Article
}

const ArticleCard: React.FC<ArticleCardProps> = ({
  article
}) => {
  const navigate = useNavigate();

  return ( 
    <div
      onClick={()=>navigate(`/articles/${article.id}`)} 
      className="
        overflow-hidden 
        shadow-sm
        m-4
        cursor-pointer 
        rounded-xl
        border-[1px]
        transition
        hover:shadow-lg
        hover:scale-105
      "
    >
      {/* <img className="w-full" src="/"> */}
      <div className="px-6 py-4">
        <div className="font-bold mb-2">{article.title}</div>
        <hr />
        <p className="text-base break-all h-24 overflow-hidden">
          {article.body}
        </p>
      </div>
      {/* <div className="px-6 pb-2">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span>
      </div> */}
    </div>
   );
}
 
export default ArticleCard;