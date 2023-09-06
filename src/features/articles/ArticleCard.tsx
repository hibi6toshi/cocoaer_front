import { useNavigate } from "react-router-dom";
import { Article } from "../../types";
import OptionalInfo from "../../components/OptionalInfos/OptionalInfo";
import { useAuth0 } from "@auth0/auth0-react";
import { deleteArticle } from "../../apis/aricles";
import { toast } from "react-hot-toast";
import UserAction from "../../components/OptionalInfos/UserActions/UserAction";
import { BiPencil, BiTrash, BiHeart } from "react-icons/bi";
import useUser from "../../hooks/useUser";
import FavoriteButton from "../favorites/FavoriteButton";

interface ArticleCardProps {
  article: Article
}

const ArticleCard: React.FC<ArticleCardProps> = ({
  article
}) => {
  const navigate = useNavigate();
  const { getAccessTokenSilently } = useAuth0();
  const { user } = useUser();

  const navigateToEditPage = (e: React.MouseEvent<HTMLButtonElement>)=>{
    e.stopPropagation();
    navigate(`/articles/${article.id}/edit`)
  }

  const doDeleteArticle = async (e: React.MouseEvent<HTMLButtonElement>) =>{
    e.stopPropagation();
    let checkSaveFlg = window.confirm('削除しますか？');
    if (!checkSaveFlg){
      return 
    } 

    const token = await getAccessTokenSilently()
    await toast.promise(
      deleteArticle(token, article.id), 
      {
        loading: 'Sending...',
        success: 'Success',
        error: (err) => {
          // return err?.response?.data?.errors?.[0]?.length >0 ? err.response.data.errors[0] : 'faild'
          return 'faild'
        },
      }).then((res)=>{
        console.log(res)
      }).catch(e =>{
        console.log(e)
      }        
    );
  }

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
      <div className="px-6 py-4">
        <div className="mb-2 flex justify-between">
          <div className="font-bold">{article.title}</div>
          <div>
            { !user 
                ? 
                  null
                : 
                  <>
                    { 
                      user.id === article.user_id
                      ? 
                        <UserAction 
                          iconButtonArray={[{ icon: BiPencil, onClickIcon: navigateToEditPage}, { icon: BiTrash, onClickIcon: doDeleteArticle}]}
                        />
                      :  
                        <FavoriteButton 
                          initFavoritedUserIds={article.favorited_by_user_ids}
                          favoritableType="Article"
                          favoritableId={article.id}
                        />
                    }
                  </>
            }
          </div>
        </div>
        {article.picture ?
          <img src={article.picture.url ? article.picture.url : `${process.env.PUBLIC_URL}/default_article.jpg`} className="rounded-md mb-2" alt="thumbnail" />
          : 
          null
        }
        <p className="whitespace-pre-wrap text-base break-all h-40 overflow-hidden">
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