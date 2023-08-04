import { Link } from "react-router-dom";

const Footer = () => {
  return ( 
    <footer className="bg-yellow-800 bg-opacity-75 border-t-[1px] text-white">
      <div className="p-4 md:flex md:items-center md:justify-between">
        <span className="text-sm sm:text-center ">© 2023 <a href="https://twitter.com/hibi_toshi" className="hover:underline">hibi_toshi</a>. All Rights Reserved.
      </span>
      <ul className="flex flex-wrap items-center mt-3 text-sm font-medium sm:mt-0">
        <li>
            <Link to="/privacypolicy" className="mr-4 hover:underline md:mr-6">プライバシーポリシー</Link>
        </li>
        <li>
            <Link to="/termsOfService" className="mr-4 hover:underline md:mr-6">利用規約</Link>
        </li>
        <li>
            <Link to="/contactPage" className="mr-4 hover:underline md:mr-6">お問合せ</Link>
        </li>
      </ul>
      </div>
    </footer>
   );
}
 
export default Footer;