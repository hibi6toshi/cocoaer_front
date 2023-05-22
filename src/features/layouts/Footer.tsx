const Footer = () => {
  return ( 
    <footer className="bg-yellow-800 bg-opacity-75 border-t-[1px] text-white">
      <div className="p-4 md:flex md:items-center md:justify-between">
        <span className="text-sm sm:text-center ">© 2023 <a href="/" className="hover:underline">Flowbite™</a>. All Rights Reserved.
      </span>
      <ul className="flex flex-wrap items-center mt-3 text-sm font-medium sm:mt-0">
        <li>
            <a href="#" className="mr-4 hover:underline md:mr-6 ">About</a>
        </li>
        <li>
            <a href="#" className="mr-4 hover:underline md:mr-6">Privacy Policy</a>
        </li>
        <li>
            <a href="#" className="mr-4 hover:underline md:mr-6">Licensing</a>
        </li>
        <li>
            <a href="#" className="hover:underline">Contact</a>
        </li>
      </ul>
      </div>
    </footer>
   );
}
 
export default Footer;