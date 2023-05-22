interface MenuItemProps {
  onClick : ()=>void,
  label: string
}

const MenuItem: React.FC<MenuItemProps> = ({
  onClick,
  label,
}) => {
  return ( 
    <div 
      onClick={onClick}
      className="
        cursor-pointer
        flex 
        w-full 
        justify-between 
        px-4 
        py-2 
        text-left 
        text-sm 
        leading-5
        hover:bg-slate-200 
        hover:bg-opacity-30
      "
      role="menuitem"
    >{label}</div>
   );
}
 
export default MenuItem;