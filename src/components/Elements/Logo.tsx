import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <div className="flex-shrink-0">
      <Link to="/">
        <img src={`${process.env.PUBLIC_URL}/Cocoaer_logo.jpeg`} alt="jpeg" className="h-10 w-30"/>
      </Link>
    </div>
   );
}

export default Logo;