import ContentSelector from "./ContentSelector";
import UserMenu from "./UserMenu";
import Logo from "../../components/Elements/Logo";

const Navbar = () => {

  return ( 
    <div className="fixed w-full bg-white z-10 shadow-sm">
      <div className="
          p-2
          border-b-[1px]
        "
      >
        <div
          className="
            flex
            flex-row
            items-center
            justify-between
            gap-3
            md:gap-0
          "
        >
          <Logo />
          <ContentSelector />
          <UserMenu />
        </div>
      </div>
    </div>
   );
}
 
export default Navbar;