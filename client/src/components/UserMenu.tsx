import { selectUser, userLogout } from "../store/users/usersSlice";
import { Link } from "react-router";
import { MdLogout } from "react-icons/md";
import { useAppDispatch, useAppSelector } from "../store/store";
import logo from "/logo.png";

export const UserMenu = () => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  return (
    <div>
      {user ? (
        <div
          onClick={() => dispatch(userLogout())}
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
        <Link to={"/"}>
          <img
            className="h-16 transform -scale-x-100"
            src={logo}
            alt="logo image"
          />
        </Link>
      )}
    </div>
  );
};
