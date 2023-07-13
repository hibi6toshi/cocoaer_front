import { useCallback, useState } from "react";
import Button from "../../../components/Elements/Button";
import { FormTask } from "../../../types";
import { toast } from "react-hot-toast";
import { useUserContext } from "../../../providers/UserProvider";
import TaskShow from "./TaskShow";
import IconButton from "../../../components/Elements/IconButton";
import { BiTrash } from "react-icons/bi";
import useUser from "../../../hooks/useUser";

interface TaskInputProps {
  tasks: FormTask[];
  dispatch: (newtasks: FormTask[] ) => void; 
}

const TaskInput: React.FC<TaskInputProps> = ({
  tasks,
  dispatch,
}) => {

  const [ inputTaskName , setInputTaskName ] = useState("");
  const { user }  = useUser();

  function onChangeInput(e: React.ChangeEvent<HTMLInputElement>){
    setInputTaskName(e.target.value)
  }

  const addTask = useCallback(
    () => {
      if(inputTaskName ===""){
        toast.error("入力がありません");
        return null
      }else{
        const newTask: FormTask = {
          id: null,
          user_id:  user ? user.id : null , // UserProvider で User|nullにしているのでnull回避
          project_id: null,
          // sort_number: updateTasks?.length + 1, // 最大値を取得するように変更
          name: inputTaskName
        }
        const updateTasks: FormTask[] = tasks.concat(newTask);
        dispatch(updateTasks);
        setInputTaskName("");
      }
    },[tasks, inputTaskName, dispatch, user])

  const editName = useCallback(
    (index: number) => (newName: string) =>{
      const updateTasks: FormTask[] = tasks.map((task, i)=> i === index ? {...task, name: newName} : task);
      dispatch(updateTasks);
  },[tasks, dispatch])
  
  const deleteTask = useCallback(
    (taskIndek: number)=>{
      const updateTasks: FormTask[] = tasks.filter((task, i)=>(i !== taskIndek));
      dispatch(updateTasks);
  },[tasks, dispatch])

  return ( 
    <div className="
      shadow-sm
      rounded-xl
      border-[1px]
      my-4
      p-4
    ">
      <div className="tasks-wrapper">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="TasksTitle">
          タスク
        </label>
        { tasks?.map((task, n)=>(
          <TaskShow 
            task={task}
            iconButton={
              <IconButton 
                icon={BiTrash}
                onClickIcon={()=>deleteTask(n)}
            />}
            editAction={editName(n)}
            onBlurAction={tasks[n].name==="" ? ()=>deleteTask(n) : ()=>{}}
            key={n}
          />
        ))}
      </div>
      <div className="flex my-4">
        <input
          type="text"
          value={inputTaskName}
          onChange={onChangeInput}
          className="
            shadow
            appearance-none
            border 
            rounded 
            w-4/5
            py-2
            px-3
            text-gray-700 
            leading-tight" 
        />
        <span className="w-1/5">
          <Button 
            label="追加"
            onClick={addTask}
            disabled={inputTaskName===""}
            small
          />
        </span>
      </div>
    </div>
   );
}
 
export default TaskInput;