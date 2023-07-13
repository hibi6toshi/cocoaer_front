import { useNavigate } from "react-router-dom";
import { FormAction, FormProject, FormTask, Option } from "../../types";
import useCategorys from "../../hooks/useCategorys";
import useTargets from "../../hooks/useTargets";
import Select, { SingleValue } from "react-select";
import ButtonWithTooltip from "../../components/Elements/ButtonWithTooltip";
import Button from "../../components/Elements/Button";
import { compose } from "../../common/function";
import TaskInput from "./tasks/TaskInput";
import ActionInput from "./actions/ActionInput";

interface ProjectFormProps {
  project: FormProject
  dispatch: React.Dispatch<any>;
  submitAction: () => void;
  isSending: boolean
}

const ProjectForm: React.FC<ProjectFormProps> = ({
  project,
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
    dispatch({ title: e.target.value});
    isTitleValid(e.target.value);
  }

  function onChangeBody(e: React.ChangeEvent<HTMLTextAreaElement>){
    dispatch({ body: e.target.value});
    isBodyValid(e.target.value);
  }

  function onChangeCategory(option :SingleValue<Option>){
    dispatch({ piety_category_id: option?.value})
  }

  function onChangeTarget(option :SingleValue<Option>){
    dispatch({ piety_target_id: option?.value})
  }
  
  function onChangeLimitDays(e: React.ChangeEvent<HTMLInputElement>){
    dispatch({limit_day: e.target.value})
  }

  function onBlurDays(e: React.FocusEvent<HTMLInputElement, Element>){
    dispatch({ limit_day: deleteHeadZero(e.target.value)})
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

  const submitButtonDisable = 
    !(project.title.length !==0 && project.body.length !==0) || isSending

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
      <form>
        <div className="
          shadow-sm
          rounded-xl
          border-[1px]
          p-4
        ">
          <div className="title-wrapper">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ProjectTitle">
              タイトル
            </label>
            <div className="text-sm text-red-500">{project.warningTitle}</div>
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
                ${project.warningTitle ? 'border-red-500 ': null}
              `}
              id="projectTitle" 
              type="text" 
              placeholder="タイトル"
              value={project.title}
              required
              onChange={onChangeTitle}
            />
          </div>

          <hr className="my-6"/>
          <div className="body-wrapper">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="">
              本文
            </label>
            <div className="text-sm text-red-500">{project.warningBody}</div>
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
                ${project.warningBody ? 'border-red-500 ': null}
              `}
              id="ProjectTitle"
              placeholder="本文" 
              required
              rows={8}
              value={project.body}
              onChange={onChangeBody}
            />
          </div>
          
          <hr className="my-6"/>
          <div className="grid grid-cols-2 gap-4 option-info-wrapper">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ProjectCategory">
                カテゴリ
              </label>
              <Select 
                options={categoryOptions}
                defaultValue={categoryOptions.find(element => element.value === project.piety_category_id)}
                onChange={onChangeCategory}
                className="mb-2"
                inputId="ProjectCategory"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ProjectTarget">
                ターゲット
              </label>
              <Select
                options={targetOptions}
                defaultValue={targetOptions.find(element => element.value === project.piety_target_id)}
                onChange={onChangeTarget}
                className="mb-2"
                inputId="ProjectTarget"
              /> 
            </div>         
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ProjectDays">
                目標日
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
                id="ProjectDays" 
                type="date" 
                placeholder="0"
                min={0}
                value={project.limit_day}
                onChange={onChangeLimitDays}
                onBlur={onBlurDays}
              />日
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ProjectCost">
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
                id="ProjectCost" 
                type="text" 
                placeholder="1000円単位に切上" 
                min={0}
                step={1000}
                value={project.cost}
                onChange={onChangeCost}
                onBlur={onBlurCost}
              />円
            </div>
          </div>
        </div>
        <TaskInput
          tasks={project.tasks}
          dispatch={(newtasks: FormTask[]) => dispatch({ tasks: newtasks})}
        />
        <ActionInput 
          actions={project.actions}
          dispatch={(newActions: FormAction[]) => dispatch({ actions: newActions})}
        />
        <div
          className="
            flex
            items-center
            justify-center
            relative
            button-wrapper
            py-4
          "
        >
          <ButtonWithTooltip
            label="送信"
            // onClick={formSubmit}
            onClick={submitAction}
            disabled={submitButtonDisable}
            text="タイトル・本文は必須です。"
            displayed={!(project.title.length !==0 && project.body.length !==0)}
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
 
export default ProjectForm;