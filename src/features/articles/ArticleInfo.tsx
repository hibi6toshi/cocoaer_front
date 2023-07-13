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
      md:max-w-2xl
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
      <div>
        {article.picture ?
          <img 
            src={article.picture.url} 
            width={800}
            height={500}
            className="
              block
              rounded-md
            "
            alt="thumbnail"
          />
          : 
          null
        }
      </div>
      <div className="mt-4 mb-4">
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
      <hr className="mb-2"/>
      <div>
        {article.body}
      </div>
   </div>
  );
}
 
export default ArticleInfo;