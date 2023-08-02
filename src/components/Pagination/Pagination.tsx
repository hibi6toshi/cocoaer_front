import React, { useEffect, useRef, useState } from "react";
import { PaginationInfo } from "../../types";
import { useSearchParams } from "react-router-dom";
import Button from "../Elements/Button";

interface PaginationProps {
  pagination_info: PaginationInfo;
}

const Pagination: React.FC<PaginationProps> = ({
  pagination_info
}) => {

  let [searchParams, setSearchParams] = useSearchParams();
  const [ pageNum, setPageNnum ] = useState(String(pagination_info.current_page));

  useEffect(()=>{
    setPageNnum(String(pagination_info.current_page));
  },[pagination_info])

  const handleSubmit = (event: any) => {
    event.preventDefault();
    let updatedSearchParams = new URLSearchParams(searchParams.toString());
    updatedSearchParams.set('page', String(pageNum));
    setSearchParams(updatedSearchParams)
  }

  const hasPrevPageFlg = pagination_info.current_page > 1;

  const hasNextPageFlg =  pagination_info.current_page < pagination_info.total_pages;

  const navToPrev = () => {
    let updatedSearchParams = new URLSearchParams(searchParams.toString());
    updatedSearchParams.set('page', String(pagination_info.current_page -1))
    setSearchParams(updatedSearchParams);
  }
  
  const navToNext = () => {
    let updatedSearchParams = new URLSearchParams(searchParams.toString());
    updatedSearchParams.set('page', String(pagination_info.current_page + 1))
    setSearchParams(updatedSearchParams);
  }

  return (
    <div className="
      flex
      items-center
      rounded-t
      justify-center
      relative
    ">
      <div className="w-10 mx-8">
        <Button 
          label="<"
          onClick={navToPrev}
          disabled={!hasPrevPageFlg}
          outline={!hasPrevPageFlg}
          small
        />
      </div> 
      <form onSubmit={handleSubmit} >
        <input 
          type="number" 
          id="pageNumberInput"
          value={pageNum} 
          onChange={e => {setPageNnum(String(Number(e.target.value)))}}
          className="
            w-20
            rounded-md
            text-right 
            border-2 
          border-yellow-800 
            border-opacity-50
            hover:border-opacity-75
            py-2
            "
          min={0}
          max={pagination_info.total_pages}
        />/{pagination_info.total_pages}
      </form>
      <div className="w-10 mx-8">
        <Button 
          label=">"
          onClick={navToNext}
          disabled={!hasNextPageFlg}
          outline={!hasNextPageFlg}
          small
        />
      </div> 
    </div>
  );
}
 
export default Pagination;