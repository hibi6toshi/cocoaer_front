import { LoaderFunction, LoaderFunctionArgs, useLoaderData, useNavigate } from "react-router-dom";
import { getForums } from "../../apis/forums";
import ForumCard from "../../features/forums/ForumCard";
import { Forum, PaginationInfo } from "../../types";
import Pagination from "../../components/Pagination/Pagination";
import Button from "../../components/Elements/Button";

export const loader: LoaderFunction = async ({ request } :LoaderFunctionArgs) => {
  const forums = await getForums((new URL(request.url)));

  return {forums: forums.data, pagination_info: forums.pagination_info };
} 

const IndexPage = () => {
  const {forums, pagination_info} = useLoaderData() as {forums: Forum[], pagination_info: PaginationInfo};
  const navigate = useNavigate();

  if (forums.length === 0 ){
    return (
      <div className="flex justify-center">
        <div>
          <div className="w-40">
            <Button 
              label="新規作成"
              onClick={()=>navigate("/forums/new")}
              rounded_full
            />
          </div>
          <div className="mt-32 font-bold text-lg">
            "No Forums found"
          </div>
        </div>
      </div>
    )
  }

  return ( 
    <>
      <div className="flex justify-center">
        <div className="w-40">
          <Button 
            label="新規作成"
            onClick={()=>navigate("/forums/new")}
            rounded_full
          />
        </div>
      </div>
    
      <div className="
        max-w-4xl
        mx-auto
        grid
        grid-cols-1
        m-4
      "> 
      {forums?.map((forum: Forum)=>(
        <ForumCard
          forum={forum}
          key={forum.id}
        />
      ))}
      </div>
      <div className="mt-8">
        <Pagination pagination_info={pagination_info}/>
      </div>
    </>
   );
}
 
export default IndexPage;