import { FaRegUser } from "react-icons/fa";
import logo from "/logo.png";
import { Link } from "react-router";
export const Header = () => {
  return (
    <header className="bg-violet-300">
      <div className="max-w-6xl mx-auto px-1 md:px-2 lg:px-3 flex items-center justify-between">
        <Link to={"/"}>
          <img className="h-16" src={logo} alt="logo" />
        </Link>
        <h1>Linksmasis begemotas</h1>
        <Link to={"/prisijungimas"}>
          <div className="flex gap-2 items-center text-violet-800">
            <div>
              <FaRegUser size={28} />
            </div>
            <div className="flex flex-col items-center justify-center">
              <p>Prisijungti</p>
              <p>Užsiregistruoti</p>
            </div>
          </div>
        </Link>
      </div>
    </header>
  );
};
