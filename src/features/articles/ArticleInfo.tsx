import { useNavigate } from "react-router-dom";
import OptionalInfo from "../../components/OptionalInfos/OptionalInfo";
import UserMiniInfo from "../../components/Users/UserMiniInfo";
import { Article } from "../../types";
import { useAuth0 } from "@auth0/auth0-react";
import useUser from "../../hooks/useUser";
import UserAction from "../../components/OptionalInfos/UserActions/UserAction";
import { toast } from "react-hot-toast";
import { deleteArticle } from "../../apis/aricles";
import { BiPencil, BiTrash, BiHeart } from "react-icons/bi";
import FavoriteButton from "../favorites/FavoriteButton";

interface ArticleInfoProps {
  article : Article
}

const ArticleInfo: React.FC<ArticleInfoProps> = ({
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

    const token = await getAccessTokenSilently();
    
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
      <div>
        {article.picture ?
          <img 
            src={article.picture.url ? article.picture.url : `${process.env.PUBLIC_URL}/default_article.jpg`} 
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
      <div className="whitespace-pre-wrap">
        {article.body}
      </div>
   </div>
  );
}
 
export default ArticleInfo;