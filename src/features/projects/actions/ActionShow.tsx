import { ReactElement } from "react";
import { Action, FormAction } from "../../../types";

interface ActionShowProps {
  action: Action | FormAction;
  iconButton?: ReactElement;
  editAction?: (newName: string) => void
  onBlurAction?: () => void
}

const ActionShow: React.FC<ActionShowProps> = ({
  action,
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
              `${ action.name ? "" : `border rounded border-red-500`}
              w-full`
            }
            value={action.name}
            onChange={(e) => editAction(e.target.value)}
            onBlur={onBlurAction}
          /> 
        : <span>{action.name}</span>}

      {iconButton && 
        <span>{iconButton}</span> }   
    </div>
   );
}
 
export default ActionShow;