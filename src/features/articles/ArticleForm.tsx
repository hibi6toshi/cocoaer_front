import useCategorys from "../../hooks/useCategorys";
import Select, { SingleValue } from "react-select";
import useTargets from "../../hooks/useTargets";
import { FormArticle, Option } from "../../types";
import Button from "../../components/Elements/Button";
import { useNavigate } from "react-router-dom";
import { compose } from "../../common/function";
import ButtonWithTooltip from "../../components/Elements/ButtonWithTooltip";

interface ArticleFormProps {
  article: FormArticle;
  dispatch: React.Dispatch<any>;
  submitAction: () => void;
  isSending: boolean
}

const ArticleForm: React.FC<ArticleFormProps> = ({
  article,
  dispatch,
  submitAction,
  isSending,
}) => {

  const { getPietyCategorysDict } = useCategorys();
  const { getPietyTargetsDict } = useTargets();
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
    return String(num && num >= 0 ? (Math.ceil(num/1000)) * 1000 : "");
  }

  function onChangeTitle(e: React.ChangeEvent<HTMLInputElement>){
    dispatch({ title: e.target.value});
    isTitleValid(e.target.value);
  }

  function onChangeThumbnail(e: React.ChangeEvent<HTMLInputElement>){
    if (e.target.files && e.target.files[0]){
      dispatch({ imgPicture : e.target.files[0] , picture: {url: URL.createObjectURL(e.target.files[0]) }})
    }else{
      dispatch({ imgPicture : null , picture: {url: ""}})
    }
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
  
  function onChangeDays(e: React.ChangeEvent<HTMLInputElement>){
    dispatch({days: e.target.value.replace(/[^0-9]/g, "")})
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
      // ...article.warning では直前レンダリング時の値を取得してしまう。ReducerはNextRender時に値を更新するから。
      // dispatch({ warning : {...article.warning,  ...{title: "必須項目です。" }}})
      // dispatch((article: FormArticle) => ({ warning : {...article.warning,  ...{title: "必須項目です。" }}}))
      return false
    }else{
      dispatch({ warningTitle: null});
      return true 
    }
  }

  function isBodyValid(body: string): boolean{
    if(body.length === 0){
      dispatch({ warningBody: "必須項目です。"});
      // ...article.warning では直前レンダリング時の値を取得してしまう。ReducerはNextRender時に値を更新するから。
      // dispatch({ warning : {...article.warning,  ...{body: "必須項目です。" }}})
      // dispatch((article : FormArticle) => ({ warning : {...article.warning,  ...{body: "必須項目です。" }}}))
      return false
    }else{
      dispatch({ warningBody: null});
      return true
    }
  }

  function formSubmit(){
    const rsltIsTitleValid = isTitleValid(article.title);
    const rsltIsBodyValid = isBodyValid(article.body);
    if (rsltIsTitleValid && rsltIsBodyValid){
      submitAction();
    } else {
      alert("必須項目が入力されていません。")
    } 
  }

  const modifyInputCost = 
    compose(
      deleteHeadZero,
      // Number(null)　->0となり空欄扱いできないのでしない
      roundUp1000WithNullable
    );
  
  const submitButtonDisable = (
     !(article.title.length !==0 && article.body.length !==0) || isSending);

  return ( 
    <div>
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
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ArticleTitle">
                タイトル
              </label>
              <div className="text-sm text-red-500">{article.warningTitle}</div>
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
                  ${article.warningTitle ? 'border-red-500 ': null}
                `}
                id="ArticleTitle" 
                type="text" 
                placeholder="タイトル"
                value={article.title}
                required
                onChange={onChangeTitle}
                maxLength={30}
              />
            </div>
            <div className="thumbnail-wrapper mb-10">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                サムネイル(選択しない場合は、デフォルト画像が割り当てられます。)
              </label>
                { (article.picture.url) &&
                    <img src={article.picture.url} alt="articlePicture" className="rounded-md" />
                }
                <input 
                  className="
                  block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:text-sm file:font-semibold
                  file:bg-yellow-800 file:bg-opacity-75 file:text-white
                  hover:file:bg-yellow-700 hover:file:bg-opacity-75" 
                  type="file" 
                  accept="image/jpeg,image/png" 
                  onChange={onChangeThumbnail}
                />
            </div>
            <div className="body-wrapper">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ArticleBody">
                本文
              </label>
              <div className="text-sm text-red-500">{article.warningBody}</div>
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
                  ${article.warningBody ? 'border-red-500 ': null}
                `}
                id="ArticleBody"
                placeholder="本文" 
                required
                rows={8}
                value={article.body}
                onChange={onChangeBody}
              />
            </div>
            <div className="option-wrapper">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ArticleCategory">
                カテゴリ
              </label>
              <Select 
                options={categoryOptions}
                defaultValue={categoryOptions.find(element => element.value === String(article.piety_category_id))}
                onChange={onChangeCategory}
                className="mb-2"
                inputId="ArticleCategory"
              />
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ArticleTarget">
                ターゲット
              </label>
              <Select 
                options={targetOptions}
                defaultValue={targetOptions.find(element => element.value === String(article.piety_target_id))}
                onChange={onChangeTarget}
                className="mb-2"
                inputId="ArticleTarget"
              />          
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ArticleDays">
                日数
              </label>
              <input
                className="
                  display: inline
                  text-right
                  border 
                  rounded 
                  py-2 
                  px-3
                  mb-2
                  text-gray-700 
                  leading-tight
                " 
                id="ArticleDays" 
                type="text" 
                placeholder="0"
                min={0}
                value={article.days}
                onChange={onChangeDays}
                onBlur={onBlurDays}
              />日
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ArticleCost">
                費用
              </label>
              <input
                className="
                  display: inline
                  text-right
                  shadow
                  border
                  rounded
                  py-2 
                  px-3
                  mb-2
                  text-gray-700 
                  leading-tight
                " 
                id="ArticleCost" 
                type="text" 
                placeholder="1000円単位に切上" 
                min={0}
                step={1000}
                value={article.cost}
                onChange={onChangeCost}
                onBlur={onBlurCost}
              />円
            </div>
            </div>
          <div
            className="
              flex
              items-center
              rounded-t
              justify-center
              relative
            "
          >
            <ButtonWithTooltip
              label="送信"
              onClick={formSubmit}
              disabled={submitButtonDisable}
              text="タイトル・本文は必須です。"
              displayed={!(article.title.length !==0 && article.body.length !==0)}
            />
            <Button 
              label="キャンセル"
              onClick={()=>navigate(-1)}
              outline
            />
          </div>
        </form>
      </div>
    </div>
   );
}
 
export default ArticleForm;