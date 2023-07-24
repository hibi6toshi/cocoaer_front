import React from "react";
import { NavLink } from "react-router-dom";

type NavTagData = {
  label: string,
  navTo: string
}

interface NavTabsProps {
  headerInfo?: React.ReactNode[],
  navTabDatas: NavTagData[],
}
const NavTabs: React.FC<NavTabsProps> = ({
  headerInfo,
  navTabDatas
}) => {
  return ( 
    <span className="
      rounded-3xl
      z-10
      shadow-sm 
      transition 
      hover:shadow-md
    ">
      <div>
        {headerInfo && headerInfo}
      </div>
      <div className="
       bg-white
        border-b 
        flex
        flex-row
        items-center
        justify-between
        rounded-3xl
        z-10
        pt-2
        shadow-sm transition hover:shadow-md 
        sticky top-14
      ">
        {navTabDatas.map((tab) => (
            <NavLink 
              key={tab.navTo}
              to={tab.navTo}
              className={({isActive})  => `
                py-2
                md:mx-20
                border-b-4
                transition-colors
                duration-300
                ${isActive ? "border-yellow-800 border-opacity-75" : "border-transparent hover:border-gray-200"}
              `
            }>
              {tab.label}
            </NavLink>
          )
        )}
      </div>
    </span>  
   );
}
 
export default NavTabs;