import { useEffect, useState } from "react";
import { createComment, deleteComment, getComments, updateComment } from "../../apis/comments";
import { Comment, CommentableType, User } from "../../types";
import useUser from "../../hooks/useUser";
import CommentCard from "./CommentCard";
import { useAuth0 } from "@auth0/auth0-react";
import { toast } from "react-hot-toast";
import CommentForm from "./CommentForm";

interface CommentsViewProps {
  commentableType: CommentableType;
  commentableId: string;
  commentableOwner: User;
}

const loader = async (commentableType: string, commentableId: string) => {
  return getComments(commentableType, commentableId);
}

const CommentsView: React.FC<CommentsViewProps> = ({
  commentableType,
  commentableId,
  commentableOwner,
}) => {

  const [ isLoading, setIsLoading ] = useState(false);
  const [ isSending, setIsSending ] = useState(false);
  const [ comments, setComments ] = useState<Comment[]>([]);
  const [ newCommentBody, setNewCommentBody ] = useState(""); 
  const { user } = useUser();
  const { getAccessTokenSilently } = useAuth0();
  
  const onChangeNewCommentBody = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewCommentBody(e.target.value);
  }

  const updateComments = (updatedComment: Comment) => 
    setComments((prevComments) => 
      prevComments.map((comment) => 
        comment.id === updatedComment.id 
            ? updatedComment
            : comment))

  const deleteComments = (deletedComment: Comment) => 
    setComments((prevComments) => 
      prevComments.filter((comment) => comment.id !== deletedComment.id ))

  const doCreateComment = async() => {
    if(isSending) return

    setIsSending(true);
    const token = await getAccessTokenSilently(); 
    const formData = new FormData();
    formData.append("comment[body]", newCommentBody);
    
    await toast.promise(
      createComment(token, commentableType, commentableId,formData), 
      {
        loading: 'Sending...',
        success: 'Success',
        error: (err) => {
          return err?.response?.data?.errors?.[0]?.length >0 ? err.response.data.errors[0] : "faild"
        },
      }).then((res)=>{
        setNewCommentBody("");
        setComments([res.data.data, ...comments]); 
      }).catch(e =>{
        console.log(e)
      }        
    );
    setIsSending(false);
  }

  const doUpdateComment = (commentId: string) => 
    async(body: string) => {
      const token = await getAccessTokenSilently(); 
      const formData = new FormData();
      formData.append("comment[body]", body);

      await toast.promise(
        updateComment(token, commentableType, commentableId, commentId, formData), 
        {
          loading: 'Sending...',
          success: 'Success',
          error: (err) => {
            return err?.response?.data?.errors?.[0]?.length >0 ? err.response.data.errors[0] : "faild"
          },
        }).then((res)=>{
          const updatedComment = res.data.data;
          updateComments(updatedComment);
        }).catch(e =>{
          console.log(e)
        }        
      );
  }

  const doDeleteComment = (commentId: string) => 
    async() => {
      let checkSaveFlg = window.confirm('削除しますか？');
      if (!checkSaveFlg){
        return 
      } 

      const token = await getAccessTokenSilently(); 

      await toast.promise(
        deleteComment(token, commentableType, commentableId, commentId), 
        {
          loading: 'Sending...',
          success: 'Success',
          error: (err) => {
            return err?.response?.data?.errors?.[0]?.length >0 ? err.response.data.errors[0] : "faild"
          },
        }).then((res)=>{
          const deletedComment = res.data.data;
          deleteComments(deletedComment);
        }).catch(e =>{
          console.log(e)
        }
      );
  }
  
  useEffect(()=>{
    const initAction = async () => {
      setIsLoading(true);
      const commentsData = await loader(commentableType, commentableId);
      setComments(commentsData.data);
      setIsLoading(false);
    }
    initAction()
  }, [])

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
      <p className="font-bold mb-3">コメント</p>
      {
        user != null && 
        (
          <>
            <CommentForm 
              formCommentBody={newCommentBody}
              onChangeFormCommentBody={onChangeNewCommentBody}
              isSending={isSending}
              formAction={doCreateComment}
            />
            <hr className="mb-5"/>
          </>
        )
      }
      { isLoading 
        ? <div>Loading...</div> 
        : comments?.map((comment: Comment)=>(
            <CommentCard
              comment={comment}
              commentableOwner={commentableOwner}
              key={comment.id}
              updateAction={doUpdateComment(comment.id)}
              deleteAction={doDeleteComment(comment.id)}
            />
          ))
      }
    </div>
  );
}
 
export default CommentsView;