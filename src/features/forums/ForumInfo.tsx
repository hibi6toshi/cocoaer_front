import { useNavigate } from "react-router-dom";
import OptionalInfo from "../../components/OptionalInfos/OptionalInfo";
import UserMiniInfo from "../../components/Users/UserMiniInfo";
import { Forum } from "../../types";
import { useAuth0 } from "@auth0/auth0-react";
import useUser from "../../hooks/useUser";
import { toast } from "react-hot-toast";
import { deleteForum } from "../../apis/forums";
import UserAction from "../../components/OptionalInfos/UserActions/UserAction";
import { BiPencil, BiTrash, BiHeart } from "react-icons/bi";
import FavoriteButton from "../favorites/FavoriteButton";

interface ForumInfoProps {
  forum: Forum;
}

const ForumInfo: React.FC<ForumInfoProps> = ({
  forum
}) => {
  const navigate = useNavigate();
  const { getAccessTokenSilently } = useAuth0();
  const { user } = useUser();

  const navigateToEditPage = (e: React.MouseEvent<HTMLButtonElement>)=>{
    e.stopPropagation();
    navigate(`/forums/${forum.id}/edit`)
  }

  const doDeleteForum = async (e: React.MouseEvent<HTMLButtonElement>) =>{
    e.stopPropagation();
    let checkSaveFlg = window.confirm('削除しますか？');
    if (!checkSaveFlg){
      return ;
    }
    const token = await getAccessTokenSilently()
    await toast.promise(
      deleteForum(token, forum.id), 
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

  const favorite = (e :React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    console.log("doFavorite");
  } 

  return ( 
    <div>
      <div className="
        md:container 
        md:mx-auto
        md:max-w-2xl
        overflow-hidden 
        shadow-sm
        m-2
        rounded-xl
        border-[1px]
        p-4
      ">
        <div className="rounded-xl border-[1px] p-4">
          <div className="flex justify-between mb-4">
            <div className="
              font-bold
              text-xl
            ">
              {forum.title}
            </div>
            <div>
              { !user 
                ? 
                  null
                : 
                  <>
                    { 
                      user.id === forum.user_id
                      ? 
                        <UserAction
                          iconButtonArray={[{icon: BiPencil, onClickIcon: navigateToEditPage}, { icon: BiTrash, onClickIcon: doDeleteForum}]}
                        />
                      :  
                      <FavoriteButton
                        initFavoritedUserIds={forum.favorited_by_user_ids}
                        favoritableType="Forum"
                        favoritableId={forum.id}
                      />
                    }
                  </>
            }
            </div>
          </div>
          
          <hr />

          <div className="my-4">
            <div>{forum.body}</div>
          </div>
          <hr />

          <div className="my-4"><UserMiniInfo user={forum.user}/></div>

          <OptionalInfo
            piety_target_id={forum.piety_target_id}
            piety_category_id={forum.piety_category_id}
            days={forum.days}
            cost={forum.cost}
          />
        </div>
      </div>
    </div>
   );
}
 
export default ForumInfo;