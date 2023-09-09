import { useState } from "react";
import { BiSearch } from "react-icons/bi";
import Modal from "../Modals/Modal";
import IconButton from "../Elements/IconButton";
import { Form, useLoaderData } from "react-router-dom";
import { ArticleQParams, Option, PaginationInfo } from "../../types";
import useCategorys from "../../hooks/useCategorys";
import useTargets from "../../hooks/useTargets";
import Select from "react-select";
import Button from "../Elements/Button";

const ArticleSearchModal = () => {
  const [ showModal, setShowModal ] = useState(false);
  const { pagination_info, q } = useLoaderData() as { pagination_info: PaginationInfo, q: ArticleQParams };

  const [ cost_lteq, setCost_lteq ] = useState(q?.cost_lteq);
  const [ cost_gteq, setCost_gteq ] = useState(q?.cost_gteq);

  const { getPietyCategorysDict } = useCategorys();
  const { getPietyTargetsDict } = useTargets();
  const categoryOptions: Option[] = getPietyCategorysDict();
  const targetOptions: Option[] = getPietyTargetsDict();

  const categoryDefaultValue: Option[] | null =
    categoryOptions?.filter((category: Option) => (
      q?.piety_category_id_in.includes(category.value)
    ))

  const targetDefaultValue: Option[] | null =
    targetOptions?.filter((target: Option) => (
      q?.piety_target_id_in.includes(target.value)
    ))

  const deleteHeadZero = (eTgtVal: string): string => {
    if (eTgtVal.length <= 1) {
      return eTgtVal;
    } else {
      if (eTgtVal.slice(0, 1) === "0") {
        eTgtVal = eTgtVal.slice(1);
        return deleteHeadZero(eTgtVal);
      }
      else {
        return eTgtVal;
      }
    }
  }

  const onChangeCost_lteq = (e: React.ChangeEvent<HTMLInputElement>) => {
    const result = deleteHeadZero(e.target.value.replace(/[^0-9]/g, ''));
    setCost_lteq(result);
  }

  const conChangeCost_gteq = (e: React.ChangeEvent<HTMLInputElement>) => {
    const result = deleteHeadZero(e.target.value.replace(/[^0-9]/g, ''));
    setCost_gteq(result);
  }

  const body = (
    <Form id="search-form" role="search">
      <div className="col-span-2">
        <div className="grid gap-4 gap-y-2 text-sm grid-cols-6">
          <div className="col-span-1 flex items-center">
            <label htmlFor="title_or_body">キーワード</label>
          </div>
          <div className="col-span-5">
            <input
              id="title_or_body"
              aria-label="title_or_body"
              placeholder="キーワード"
              type="search"
              name="q[title_or_body_cont]"
              defaultValue={q?.title_or_body_cont}
              className="
                h-10
                border
                mt-1
                rounded
                px-4
                w-full
                shadow
                text-gray-700 
                leading-tight 
              "
            />
          </div>
          <div className="col-span-1 flex items-center">
            <label htmlFor="cost_lteq">費用</label>
          </div>
          <div className="col-span-2">
            <input
              id="cost_gteq"
              aria-label="cost_max"
              placeholder="0"
              type="search"
              name="q[cost_gteq]"
              value={cost_gteq}
              onChange={conChangeCost_gteq}
              className="
                h-10
                border
                mt-1
                rounded
                px-4
                w-full
                shadow
                text-gray-700 
                leading-tight 
              "
            />
          </div>
          <div className="col-span-1 flex justify-center items-center">
            <div>~</div>
          </div>
          <div className="col-span-2">
          <input
              id="cost_lteq"
              aria-label="cost_min"
              placeholder="10000"
              type="search"
              name="q[cost_lteq]"
              value={cost_lteq}
              onChange={onChangeCost_lteq}
              className="
                h-10
                border
                mt-1
                rounded
                px-4
                w-full
                shadow
                text-gray-700 
                leading-tight 
              "
            />
          </div>
          <div className="col-span-1 flex items-center">
            <label htmlFor="piety_category">カテゴリー</label>
          </div>
          <div className="col-span-5">
            <Select
              inputId="piety_category"
              name="q[piety_category_id_in][]"
              isMulti
              options={categoryOptions}
              defaultValue={categoryDefaultValue}
              placeholder="選択してください"
            />
          </div>
          <div className="col-span-1 flex items-center">
            <label htmlFor="piety_target">ターゲット</label>
          </div>
          <div className="col-span-5">
            <Select
              inputId="piety_target"
              name="q[piety_target_id_in][]"
              isMulti
              options={targetOptions}
              defaultValue={targetDefaultValue}
              placeholder="選択してください"
            />
          </div>
        </div>
      </div>
      <div className="mt-8">
        <Button
          label="検索"
          onClick={()=>{}}
          submit
        />
      </div>
      {q == undefined
        ? null
        : <div className="mt-8 text-center">検索結果： {pagination_info.total_count}件</div>
      }
    </Form>
  );

  return (
    <>
      <div className="flex items-center">
        <IconButton
          icon={BiSearch}
          onClickIcon={() => setShowModal(true)}
        />
      </div>
      {showModal ?
        <Modal
          isOpen={showModal}
          title="C o c o検索"
          body={body}
          onClose={() => setShowModal(false)}
        />
        : null
      }
    </>
  );
}

export default ArticleSearchModal;