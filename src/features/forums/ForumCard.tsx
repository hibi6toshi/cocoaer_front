import { useNavigate } from "react-router-dom";
import { Forum } from "../../types";
import useCategorys from "../../hooks/useCategorys";
import useTargets from "../../hooks/useTargets";
import UserMiniInfo from "../../components/Users/UserMiniInfo";
import UserAction from "../../components/OptionalInfos/UserActions/UserAction";
import { BiPencil, BiTrash, BiHeart } from "react-icons/bi";
import useUser from "../../hooks/useUser";
import { useAuth0 } from "@auth0/auth0-react";
import { toast } from "react-hot-toast";
import { deleteForum } from "../../apis/forums";
import FavoriteButton from "../favorites/FavoriteButton";

interface ForumCardProps {
  forum: Forum;
}

const ForumCard: React.FC<ForumCardProps> = ({
  forum
}) => {
  const navigate = useNavigate();
  const { getCategoryName } = useCategorys();
  const { getTargetName } = useTargets();
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
          return err?.response?.data?.errors?.[0]?.length >0 ? err.response.data.errors[0] : 'faild'
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
      onClick={()=>navigate(`/forums/${forum.id}`)} 
      className="
        cursor-pointer 
        overflow-hidden 
        shadow-sm
        m-2
        rounded-xl
        border-[1px]
        p-4
        grid
        grid-cols-4
        transition
        hover:shadow-lg
        hover:scale-105
      "
    >
      <div className="col-span-3 grid grid-rows-3">
        <div className="row-span-2 flex justify-between">
          <div className="text-lg font-bold">
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
        <div className="row-span-1">
          <UserMiniInfo user={forum.user} />
        </div>
      </div>
      <div className="col-span-1 mx-4">
        { forum.days 
          ? <div>{ forum.days }日</div> 
          :  null
        }
        <div>{ getTargetName(forum.piety_target_id) }</div>
        <div>{ getCategoryName(forum.piety_category_id) }</div>
      </div>
    </div>
   );
}
 
export default ForumCard;