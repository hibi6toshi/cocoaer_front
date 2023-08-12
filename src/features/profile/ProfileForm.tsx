import { useNavigate } from "react-router-dom";
import Button from "../../components/Elements/Button";
import ButtonWithTooltip from "../../components/Elements/ButtonWithTooltip";
import { FormUser } from "../../types";

interface ProfileFormProps {
  profile: FormUser;
  isSending: boolean;
  dispatch: React.Dispatch<any>;
  submitAction: () => void;
  cancelAction: () => void;
}

const ProfileForm: React.FC<ProfileFormProps> = ({
  profile,
  isSending,
  dispatch,
  submitAction,
  cancelAction,
}) => {

  const onChangeAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]){
      dispatch({ imgAvatar : e.target.files[0] , avatar: {url: URL.createObjectURL(e.target.files[0]) }})
    }else{
      dispatch({ imgAvatar : null , avatar: {url: null}})
    }
  }

  const isNameValid = (body: string) => {
    if(body.length === 0){
      dispatch({ warningName: "必須項目です。"});
      return false
    }else{
      dispatch({ warningName: null});
      return true
    }
  }

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ name: e.target.value});
    isNameValid(e.target.value);
  }

  const onChangIntroduction = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch({ introduction: String(e.target.value)});
  }

  const submitButtonDisable = ((profile.name.length === 0)  || isSending)

  const formSubmit = () => {
    submitAction();
  }

  return ( 
    <div className="max-w-lg mx-auto">
      <div className="font-bold mb-3">プロフィール変更</div>
      <form className="m-6">
        <div>
          <div className="avatar-wrapper mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              サムネイル
            </label>
            <div className="flex flex-col justify-center items-center">
              { ( profile.avatar.url ) ? 
                  <img src={ profile.avatar.url} alt="profileAvatar" className="self-center flex-shrink-0 w-24 h-24 rounded-full md:justify-self-start" />
                  :
                  <img src={ `${process.env.PUBLIC_URL}/default_avatar.png` } alt="profileAvatar" className="self-center flex-shrink-0 w-24 h-24 rounded-full md:justify-self-start" />
              }
              <div>
                <input 
                  type="file" 
                  accept="image/jpeg,image/png" 
                  onChange={onChangeAvatar}
                  />
              </div>
            </div>
          </div>

          <div>
            <div className="title-wrapper">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ForumTitle">
                ユーザー名
              </label>
              <div className="text-sm text-red-500">{profile.warningName}</div>
              <input 
                className={`
                  shadow
                  appearance-none
                  border 
                  rounded 
                  w-full 
                  py-2 
                  px-3
                  mb-4
                  text-gray-700 
                  leading-tight 
                  ${profile.warningName ? 'border-red-500 ': null}
                `}
                id="profileName" 
                aria-label="profileName"
                type="text" 
                placeholder="ユーザー名"
                value={profile.name}
                required
                onChange={onChangeName}
              />
            </div>
  
            <div className="body-wrapper">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="profileIntroduction">
                プロフィール
              </label>
              <textarea 
                className="
                  shadow
                  appearance-none
                  border 
                  rounded 
                  w-full 
                  py-2 
                  px-3
                  mb-4
                  text-gray-700 
                  leading-tight
                "
                id="profileIntroduction"
                aria-label="profileIntroduction"
                placeholder="プロフィール" 
                required
                rows={8}
                value={profile.introduction}
                onChange={onChangIntroduction}
              />
            </div>
          </div>

        </div>
        <div
          className="
            flex
            items-center
            rounded-t
            justify-center
            relative
            button-wrapper
          "
        >
          <ButtonWithTooltip
            label="送信"
            onClick={formSubmit}
            disabled={submitButtonDisable}
            text="ユーザー名は必須です。"
            displayed={profile.name.length === 0}
          />
          <Button
            label="キャンセル"
            onClick={cancelAction}
            outline
          />
        </div>
      </form>
    </div>
  );
}
 
export default ProfileForm;