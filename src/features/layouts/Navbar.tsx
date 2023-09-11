import ContentSelector from "./ContentSelector";
import UserMenu from "./UserMenu";
import Logo from "../../components/Elements/Logo";
import useWindowSize from "../../hooks/useWindowSize";

const Navbar = () => {

  const [ width, height] = useWindowSize();

  const body_if_width_large = (
    <div
      className="
        flex
        flex-row
        items-center
        justify-between
        flex-wrap 
        gap-3
        md:gap-0
      "
    >
      <Logo />
      <ContentSelector />
      <UserMenu />
    </div>
  );

  const body_if_width_small = (
    <>
      <div
        className="
          flex
          flex-row
          items-center
          justify-between
          flex-wrap 
          gap-3
          md:gap-0
        "
      >
        <Logo />
        <UserMenu />
      </div>
      <div className="flex justify-center">
          <ContentSelector />
      </div>
    </>
  );

  return ( 
    
    <div className="fixed w-full bg-white z-40 shadow-sm">
      <div className="
          p-2
          border-b-[1px]
        "
      >
        { width > 550 ? body_if_width_large : body_if_width_small }
      </div>
    </div>
   );
}
 
export default Navbar;