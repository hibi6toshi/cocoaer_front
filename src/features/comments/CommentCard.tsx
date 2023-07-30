import { useState } from "react";
import UserMiniInfo from "../../components/Users/UserMiniInfo";
import useUser from "../../hooks/useUser";
import { Comment, User } from "../../types";
import UserAction from "../../components/OptionalInfos/UserActions/UserAction";
import { IconButtonProps } from "../../components/Elements/IconButton";
import { BiPencil, BiTrash } from "react-icons/bi";
import CommentForm from "./CommentForm";

interface CommentCardProps {
  comment: Comment;
  commentableOwner: User;
  updateAction: (body: string) => Promise<void>
  deleteAction: () => Promise<void>
}

const CommentCard: React.FC<CommentCardProps> = ({
  comment,
  commentableOwner,
  updateAction,
  deleteAction,
}) => {

  const { user } = useUser();
  const [ editMode, setEditMode ] = useState(false);
  const [ formCommentBody, setFomrCommentBody ] = useState(comment.body)
  const [ isSending, setIsSending ] = useState(false);
  const commentableOwnerFlg = comment.user.id === commentableOwner.id;
  const commentOwnerFlg = (user?.id === comment.user_id);
  const commentOwnerActions: IconButtonProps[] = [
                                                  { icon: BiPencil, onClickIcon: ()=> setEditMode((prev)=> !prev)},
                                                  { icon: BiTrash, onClickIcon: deleteAction}
                                                 ];

  const onChangeFormCommentBody = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFomrCommentBody(e.target.value);
  }

  const doUpdateComment = async () => {
    if(isSending) return

    setIsSending(true);
    await updateAction(formCommentBody);
    setIsSending(false);
    setEditMode(false);
  }

  return (

    <div className="mb-4">     
      <div className={`
        flex-1
        border 
        rounded-lg 
        px-2
        py-2 
        leading-relaxed
        min-w-0
        ${commentableOwnerFlg ? "border-yellow-800 border-opacity-80 border" : "border"}
      `}>
        <div className="flex flex-row justify-between">
          <UserMiniInfo user={comment.user} fontbold />
          { commentOwnerFlg && <p><UserAction iconButtonArray={commentOwnerActions}/></p>}  
        </div>

        <div className="text-sm break-all whitespace-pre-wrap mt-1">
          <div className="ml-8 my-2">
            { commentOwnerFlg && editMode 
              ? <CommentForm
                  formCommentBody={formCommentBody}
                  onChangeFormCommentBody={onChangeFormCommentBody}
                  isSending={isSending}
                  formAction={doUpdateComment}
                />
              : (comment.body)
            }
          </div>
        </div>
      </div>  
    </div>
   );
}
 
export default CommentCard;