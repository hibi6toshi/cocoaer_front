import { useCallback, useState } from "react";
import { FormAction } from "../../../types";
import Button from "../../../components/Elements/Button";
import ActionShow from "./ActionShow";
import IconButton from "../../../components/Elements/IconButton";
import { BiTrash } from "react-icons/bi";
import { toast } from "react-hot-toast";
import useUser from "../../../hooks/useUser";

interface ActionInputProps {
  actions: FormAction[];
  dispatch: (newActions: FormAction[]) => void
}

const ActionInput: React.FC<ActionInputProps> = ({
  actions,
  dispatch,
}) => {
  
  const [ inputActionName , setInputActionName ] = useState("");
  const { user }  = useUser();

  function onChangeInput(e: React.ChangeEvent<HTMLInputElement>){
    setInputActionName(e.target.value)
  }

  const addAction = useCallback(
    ()=>{
      if(inputActionName===""){
        toast.error("入力がありません");
        return null;
      }else{
        const newAction: FormAction = {
          id: null,
          user_id:  user ? user.id : null , // UserProvider で User|nullにしているのでnull回避
          project_id: null,
          // sort_number: updateActions?.length + 1, // 最大値を取得するように変更
          name: inputActionName
        }
        const updateActions: FormAction[] = actions.concat(newAction); 
        dispatch(updateActions);
        setInputActionName("");
      }
    
    }, [actions, inputActionName, dispatch, user])

  const editName = useCallback(
    (index: number) => (newName: string) =>{
      const updateActions = actions.map((action, i)=> i === index ? {...action, name: newName} : action)
      dispatch(updateActions);
    }, [actions, dispatch])

  const deleteAction = useCallback(
    (index: number)=>{
      const updateActions = actions.filter((action, i)=>(i !== index))
      dispatch(updateActions);
    },[actions, dispatch])

  return (
    <div className="
      shadow-sm
      rounded-xl
      border-[1px]
      my-4
      p-4
    ">
      <div className="actions-wrapper">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ActionsTitle">
          アクション
        </label>
        { actions?.map((action, n)=>(
          <ActionShow 
            action={action}
            iconButton={
              <IconButton 
                icon={BiTrash}
                onClickIcon={()=>(deleteAction(n))}
            />}
            editAction={editName(n)}
            onBlurAction={actions[n].name==="" ? ()=>deleteAction(n) : ()=>{}}
            key={n}
          />
        ))}
      </div>
      <div className="flex my-4">
        <input
          type="text"
          value={inputActionName}
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
            onClick={addAction}
            disabled={inputActionName===""}
            small
          />
        </span>
      </div>
    
    </div>
   );
}
 
export default ActionInput;