import { useSelector } from "react-redux";
import { selectUser } from "../store/users/usersSlice";
import { Link } from "react-router";
import { FaRegUser } from "react-icons/fa";
import { MdLogout } from "react-icons/md";

export const UserMenu = () => {
  const user = useSelector(selectUser);

  const handleLogout = () => {
    console.log("Atsijungti...");
  };

  return (
    <div>
      {user ? (
        <div
          onClick={handleLogout}
          className="flex gap-2 items-center text-violet-800 cursor-pointer"
        >
          <div>
            <MdLogout size={28} />
          </div>
          <div className="flex flex-col items-center justify-center">
            <p>Atsijungti</p>
          </div>
        </div>
      ) : (
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
      )}
    </div>
  );
};
