import Select, { SingleValue } from "react-select";
import { FormForum, Option } from "../../types";
import useCategorys from "../../hooks/useCategorys";
import useTargets from "../../hooks/useTargets";
import Button from "../../components/Elements/Button";
import { useNavigate } from "react-router-dom";
import { compose } from "../../common/function";
import ButtonWithTooltip from "../../components/Elements/ButtonWithTooltip";

interface ForumFormProps {
  forum: FormForum,
  dispatch: React.Dispatch<any>,
  submitAction:()=>void,
  isSending: boolean,
}

const ForumForm: React.FC<ForumFormProps> = ({
  forum,
  dispatch,
  submitAction,
  isSending,
}) => {
  const { getPietyCategorysDict } = useCategorys();
  const { getPietyTargetsDict} = useTargets();
  const categoryOptions: Option[] = getPietyCategorysDict();
  const targetOptions: Option[] = getPietyTargetsDict();

  const navigate = useNavigate();

  const deleteHeadZero = (eTgtVal: string): string => {
    if(eTgtVal.length <= 1) {
      return eTgtVal;
    } else {
      if( eTgtVal.slice(0,1) === "0"){
        eTgtVal = eTgtVal.slice(1);
        return deleteHeadZero(eTgtVal);
      }
      else {
        return eTgtVal;
      }
    }
  }
  
  /**
   * 1000円単位で切上げ。numがnullの場合は空文字を返す。
   * @param num 
   * @returns String 1000単位で切上げた値 or 空文字
   */
    const roundUp1000WithNullable = (num: number | null): string => {
      return String(num ? (Math.ceil(num/1000)) * 1000 : "");
    }

  function onChangeTitle(e: React.ChangeEvent<HTMLInputElement>){
    dispatch({ title: e.target.value });
    isTitleValid(e.target.value);
  }

  function onChangeBody(e: React.ChangeEvent<HTMLTextAreaElement>){
    dispatch({ body: e.target.value });
    isBodyValid(e.target.value);
  }

  function onChangeCategory(option :SingleValue<Option>){
    dispatch({ piety_category_id: option?.value })
  }

  function onChangeTarget(option :SingleValue<Option>){
    dispatch({ piety_target_id: option?.value })
  }
  
  function onChangeDays(e: React.ChangeEvent<HTMLInputElement>){
    dispatch({days: e.target.value.replace(/[^0-9]/g, "") })
  }

  function onBlurDays(e: React.FocusEvent<HTMLInputElement, Element>){
    dispatch({ days: deleteHeadZero(e.target.value.replace(/[^0-9]/g, ""))})
  }

  function onChangeCost(e: React.ChangeEvent<HTMLInputElement>){
    dispatch({ cost: e.target.value.replace(/[^0-9]/g, "")})
  }

  function onBlurCost(e: React.FocusEvent<HTMLInputElement, Element>){
    dispatch({ cost: modifyInputCost(e.target.value.replace(/[^0-9]/g, "")) })
  }

  function isTitleValid(title: string): boolean{
    if(title.length === 0){
      dispatch({ warningTitle: "必須項目です。"});
      return false
    }else{
      dispatch({ warningTitle: null});
      return true 
    }
  }

  function isBodyValid(body: string): boolean{
    if(body.length === 0){
      dispatch({ warningBody: "必須項目です。"});
      return false
    }else{
      dispatch({ warningBody: null});
      return true
    }
  }

  const modifyInputCost = 
    compose(
      deleteHeadZero,
      roundUp1000WithNullable
    );

  function formSubmit(){
    const rsltIsTitleValid = isTitleValid(forum.title);
    const rsltIsBodyValid = isBodyValid(forum.body);
    if (rsltIsTitleValid && rsltIsBodyValid){
      submitAction();
    } else {
      alert("必須項目が入力されていません。")
    } 
  }

  const submitButtonDisable = (
    !(forum.title.length !==0 && forum.body.length !==0) || isSending);


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
      pb-10
    ">
      <form>
        <div className="mb-4">
          <div className="title-wrapper">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ForumTitle">
              タイトル
            </label>
            <div className="text-sm text-red-500">{forum.warningTitle}</div>
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
                ${forum.warningTitle ? 'border-red-500 ': null}
              `}
              id="ForumTitle" 
              type="text" 
              placeholder="タイトル"
              value={forum.title}
              required
              onChange={onChangeTitle}
            />
          </div>
          <hr className="my-6"/>

          <div className="grid grid-cols-2 gap-4 option-info-wrapper">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ForumCategory">
                カテゴリ
              </label>
              <Select 
                options={categoryOptions}
                defaultValue={categoryOptions.find(element => element.value === String(forum.piety_category_id))}
                onChange={onChangeCategory}
                className="mb-2"
                inputId="ForumCategory"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ForumTarget">
                ターゲット
              </label>
              <Select 
                options={targetOptions}
                defaultValue={targetOptions.find(element => element.value === String(forum.piety_target_id))}
                onChange={onChangeTarget}
                className="mb-2"
                inputId="ForumTarget"
              /> 
            </div>         
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ForumDays">
                日数
              </label>
              <input
                className="
                  display: inline
                  text-right
                  shadow
                  appearance-none
                  border 
                  rounded 
                  py-2 
                  px-3
                  mb-2
                  text-gray-700 
                  leading-tight
                " 
                id="ForumDays" 
                type="text" 
                placeholder="0"
                min={0}
                value={forum.days}
                onChange={onChangeDays}
                onBlur={onBlurDays}
              />日
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ForumCost">
                費用
              </label>
              <input
                className="
                  display: inline
                  text-right
                  shadow
                  appearance-none
                  border 
                  rounded 
                  py-2 
                  px-3
                  mb-2
                  text-gray-700 
                  
                " 
                id="ForumCost" 
                type="text" 
                placeholder="1000円単位に切上" 
                min={0}
                step={1000}
                value={forum.cost}
                onChange={onChangeCost}
                onBlur={onBlurCost}
              />円
            </div>
          </div>
          <hr className="my-6"/>
          
          <div className="body-wrapper">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="">
              本文
            </label>
            <div className="text-sm text-red-500">{forum.warningBody}</div>
            <textarea 
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
                ${forum.warningBody ? 'border-red-500 ': null}
              `}
              id="ForumTitle"
              placeholder="本文" 
              required
              rows={8}
              value={forum.body}
              onChange={onChangeBody}
            />
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
            text="タイトル・本文は必須です。"
            displayed={!(forum.title.length !==0 && forum.body.length !==0)}
          />
          <Button 
            label="キャンセル"
            onClick={()=>navigate(-1)}
            outline
          />
        </div>
      </form>
    </div>
  );
}
 
export default ForumForm;