import { useNavigate } from "react-router-dom";
import { Project } from "../../types";
import useCategorys from "../../hooks/useCategorys";
import useTargets from "../../hooks/useTargets";
import UserMiniInfo from "../../components/Users/UserMiniInfo";
import { useAuth0 } from "@auth0/auth0-react";
import { toast } from "react-hot-toast";
import { deleteProject } from "../../apis/projects";
import UserAction from "../../components/OptionalInfos/UserActions/UserAction";
import { BiPencil, BiTrash, BiHeart } from "react-icons/bi";
import useUser from "../../hooks/useUser";
import FavoriteButton from "../favorites/FavoriteButton";

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project
}) => {
  const navigate = useNavigate();
  const { getCategoryName } = useCategorys();
  const { getTargetName } = useTargets();
  const { getAccessTokenSilently } = useAuth0();
  const { user } = useUser();

  const navigateToEditPage = (e: React.MouseEvent<HTMLButtonElement>)=>{
    e.stopPropagation();
    navigate(`/projects/${project.id}/edit`)
  }

  const doDeleteArticle = async (e: React.MouseEvent<HTMLButtonElement>) =>{
    e.stopPropagation();
    let checkSaveFlg = window.confirm('削除しますか？');
    if (!checkSaveFlg){
      return ;
    }
    const token = await getAccessTokenSilently()
    await toast.promise(
      deleteProject(token, project.id), 
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
      onClick={()=> navigate(`/projects/${project.id}`)}
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
            {project.title}
          </div>
          <div>
            { !user 
                  ? 
                    null
                  : 
                    <>
                      { 
                        user.id === project.user_id
                        ? 
                          <UserAction 
                            iconButtonArray={[{ icon: BiPencil, onClickIcon: navigateToEditPage}, { icon: BiTrash, onClickIcon: doDeleteArticle}]}
                          />
                        :  
                          <FavoriteButton
                            initFavoritedUserIds={project.favorited_by_user_ids}
                            favoritableType="Project"
                            favoritableId={project.id}
                          />
                      }
                    </>
              }
          </div>
        </div>
        <div className="row-span-1">
          <UserMiniInfo user={project.user} />
        </div>
      </div>
      <div className="col-span-1 mx-4">
        { project.limit_day 
          ?
            <div>{ new Date(project.limit_day.slice(0,10)).toLocaleDateString() }</div>
          :
            <></>
        }
        
        <div>{ getCategoryName(project.piety_target_id) }</div>
        <div>{ getTargetName(project.piety_category_id)}</div>
      </div>
    </div>
   );
}
 
export default ProjectCard;