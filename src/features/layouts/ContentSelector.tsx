import { NavLink } from "react-router-dom";

// searchParamsを取得して、link先のURLに付与する。 
const ContentSelector = () => {
  
  return ( 
    <div className="cursor-pointer rounded-full p-0 shadow-sm transition hover:shadow-md w-auto">
      <div className="flex flex-row items-center justify-between">
        <NavLink
          to="/articles"
          className={({isActive})  => `
            rounded-l-full 
            px-4 
            py-2 
            font-bold  
            border-[1px]
            transition-colors
            duration-300
            ${isActive ? "bg-yellow-800 bg-opacity-75" : "bg-white"}
            ${isActive ? "text-white" : "hover:bg-gray-200 bg-opacity-75" }
            `
          }
        >
          articles
        </NavLink>
        <NavLink
          to="/projects"
          className={({isActive})  => `
            px-4 
            py-2 
            font-bold  
            border-[1px]
            transition-colors
            duration-300
            ${isActive ? "bg-yellow-800 bg-opacity-75" : "bg-white"}
            ${isActive ? "text-white" : "hover:bg-gray-200 bg-opacity-75" }
            `
          }
        >
          projects
        </NavLink>
        <NavLink
          to="/forums"
          className={({isActive})  => `
            rounded-r-full 
            px-4 
            py-2
            font-bold  
            border-[1px]
            transition-colors
            duration-300
            ${isActive ? "bg-yellow-800 bg-opacity-75" : "bg-white"}
            ${isActive ? "text-white" : "hover:bg-gray-200 bg-opacity-75" }
            `
          }
        >
          forums
        </NavLink>
      </div>
    </div>
   );
}
 
export default ContentSelector;