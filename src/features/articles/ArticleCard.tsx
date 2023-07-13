import { useNavigate } from "react-router-dom";
import { Article } from "../../types";
import OptionalInfo from "../../components/OptionalInfos/OptionalInfo";

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
        {article.picture ?
          <img src={article.picture.url} className="rounded-md mb-2" alt="thumbnail" />
          : 
          null
        }
        <p className="text-base break-all h-24 overflow-hidden">
          {article.body}
        </p>
      </div>
      <div className="px-6 pb-2">
        <OptionalInfo 
          piety_category_id={article.piety_category_id}
          piety_target_id={article.piety_target_id}
          days={article.days}
        />
      </div>
    </div>
   );
}
 
export default ArticleCard;