import { useNavigate } from "react-router-dom";
import OptionalInfo from "../../components/OptionalInfos/OptionalInfo";
import UserMiniInfo from "../../components/Users/UserMiniInfo";
import { Project } from "../../types";
import ActionShow from "./actions/ActionShow";
import TaskShow from "./tasks/TaskShow";
import { useAuth0 } from "@auth0/auth0-react";
import { toast } from "react-hot-toast";
import { deleteProject } from "../../apis/projects";
import useUser from "../../hooks/useUser";
import UserAction from "../../components/OptionalInfos/UserActions/UserAction";
import { BiPencil, BiTrash, BiHeart } from "react-icons/bi";
import FavoriteButton from "../favorites/FavoriteButton";

interface ProjectInfoProps {
  project: Project
}

const ProjectInfo: React.FC<ProjectInfoProps> = ({
  project,
}) => {
  const navigate = useNavigate();
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
      p-4
    ">
      <div className="rounded-xl border-[1px] p-4">
        <div className="mb-2 flex items-center justify-between">
          <div className="
            font-bold
            text-xl
            my-2
          ">
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
        <hr />

        <div className="my-4 whitespace-pre-wrap">
          <div>{project.body}</div>
        </div>
        <hr />

        <div className="my-4"><UserMiniInfo user={project.user}/></div>

        <OptionalInfo
          piety_target_id={project.piety_target_id}
          piety_category_id={project.piety_category_id}
          limit_day={project.limit_day}
          cost={project.cost}
        />
      </div>
      <div className="rounded-xl border-[1px] p-4 my-4">
        <div className="font-bold mb-2">タスク</div>
          { 
            project.tasks.length > 0
              ? project.tasks?.map((task, n)=>(
                  <TaskShow
                    task={task}
                    key={n}
                  />
                ))
              : <div>まだ始まったばかりです！</div>
          }
      </div>
      <div className="rounded-xl border-[1px] p-4 my-4">
        <div className="font-bold mb-2">アクション</div>
          { 
            project.actions.length > 0
              ? project.actions?.map((action, n)=>(
                  <ActionShow
                    action={action}
                    key={n}
                  />
                ))
              : <div>まだ始まったばかりです！</div>
          }
      </div>
    </div>
   );
}
 
export default ProjectInfo;