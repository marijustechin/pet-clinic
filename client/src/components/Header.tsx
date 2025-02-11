import logo from "/logo.png";
import { Link } from "react-router";
import { UserMenu } from "./UserMenu";

export const Header = () => {
  return (
    <header className="bg-violet-300">
      <div className="max-w-6xl mx-auto px-1 md:px-2 lg:px-3 flex items-center justify-between">
        <Link to={"/"}>
          <img className="h-16" src={logo} alt="logo" />
        </Link>
        <h1>Linksmasis begemotas</h1>
        <UserMenu />
      </div>
    </header>
  );
};
