import Button from "../../components/Elements/Button";

interface CommentFormProps {
  formCommentBody: string;
  onChangeFormCommentBody: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  isSending: boolean;
  formAction: () => Promise<void>;
}

const CommentForm: React.FC<CommentFormProps> = ({
  formCommentBody,
  onChangeFormCommentBody,
  isSending,
  formAction,
}) => {
  return (
    <div className="mb-3">
      <textarea 
        className={`
          shadow
          appearance-none
          border 
          w-full
          rounded 
          py-2
          px-3
          text-gray-700 
          leading-tight"
        `}
        placeholder="新規コメント"
        required
        rows={2}
        value={formCommentBody}
        onChange={onChangeFormCommentBody}
      />
      <span className="flex flex-row-reverse">
        <span className="w-1/5">
          <Button
            label="送信"
            onClick={formAction}
            disabled={(formCommentBody==="") || isSending}
            small
          />
        </span>
      </span>
    </div>
   );
}
 
export default CommentForm;