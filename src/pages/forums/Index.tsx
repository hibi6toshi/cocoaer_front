import { useLoaderData } from "react-router-dom";
import { getForums } from "../../apis/forums";
import ForumCard from "../../features/forums/ForumCard";
import { Article, Forum } from "../../types";

export const loader = async () => {
  const forums = await getForums();
  return forums.data;
} 

const IndexPage = () => {
  const forums = useLoaderData() as Article[];
  return ( 
    <>
      <div>forums_index</div>
      <div className="
        max-w-2xl
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
    </>
   );
}
 
export default IndexPage;