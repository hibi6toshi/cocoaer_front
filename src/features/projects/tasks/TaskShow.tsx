import { FormTask, Task } from "../../../types";
import { ReactElement } from "react";

interface TaskShowProps {
  task: Task | FormTask;
  iconButton?: ReactElement;
  editAction?: (newName: string) => void
  onBlurAction?: () => void
}

const TaskShow: React.FC<TaskShowProps> = ({
  task,
  iconButton,
  editAction,
  onBlurAction,
}) => {
  return (
    <div className="flex items-center justify-between border-b-2 mb-2">
      {editAction
        ? 
          <input type="text" 
            className={
              `${ task.name ? "" : `border rounded border-red-500`}
              w-full`
            }
            value={task.name}
            onChange={(e) => editAction(e.target.value)}
            onBlur={onBlurAction}
          /> 
        : <span>{task.name}</span>}
      
      {iconButton && 
        <span>{iconButton}</span> }
      
    </div>
  );
}
 
export default TaskShow;