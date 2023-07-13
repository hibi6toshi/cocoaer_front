import OptionalInfo from "../../components/OptionalInfos/OptionalInfo";
import UserMiniInfo from "../../components/Users/UserMiniInfo";
import { Project } from "../../types";
import ActionShow from "./actions/ActionShow";
import TaskShow from "./tasks/TaskShow";

interface ProjectInfoProps {
  project: Project
}

const ProjectInfo: React.FC<ProjectInfoProps> = ({
  project,
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
      p-4
    ">
      <div className="rounded-xl border-[1px] p-4">
        <div className="
          font-bold
          text-xl
          mb-4
        ">
          {project.title}
        </div>
        
        <hr />

        <div className="my-4">
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