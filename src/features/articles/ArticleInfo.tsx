import OptionalInfo from "../../components/OptionalInfos/OptionalInfo";
import UserMiniInfo from "../../components/Users/UserMiniInfo";
import { Article } from "../../types";

interface ArticleInfoProps {
  article : Article
}

const ArticleInfo: React.FC<ArticleInfoProps> = ({
  article
}) => {
  return ( 
    <div className="
      md:container 
      md:mx-auto
      md:max-w-lg
      overflow-hidden 
      shadow-sm
      m-2
      rounded-xl
      border-[1px]
      min-h-screen
      p-4
    ">
      <div className="font-bold mb-2">
        {article.title}
      </div>
      <hr />
      <div className="h-72">
        img
      </div>
      <hr />
      <div className="mt-4 mb-8">
        <OptionalInfo
          piety_target_id={article.piety_target_id}
          piety_category_id={article.piety_category_id}
          days={article.days}
          cost={article.cost}
        />
      </div>
      <div className="my-4">
        <UserMiniInfo user={article.user} />
      </div>
      <div>
        {article.body}
      </div>
   </div>
  );
}
 
export default ArticleInfo;