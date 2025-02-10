import { Link } from "react-router";

export const Footer = () => {
  return (
    <footer className="bg-violet-300 py-3">
      <p className="text-violet-800 text-center">
        <Link to={"/"}> &copy; {new Date().getFullYear()} Marijus Techin</Link>
      </p>
    </footer>
  );
};
