import { useNavigate } from "react-router";
import { useAppSelector } from "../store/store";
import { selectUser } from "../store/users/usersSlice";
import { useEffect, useState } from "react";
import { LoginForm } from "../components/auth/LoginForm";
import { RegisterForm } from "../components/auth/RegisterForm";

export const HomePage = () => {
  const user = useAppSelector(selectUser);
  const navigate = useNavigate();
  const [loginForm, setLoginForm] = useState(true);

  useEffect(() => {
    if (user) {
      if (user.role === "USER") {
        navigate("/naudotojo-profilis");
      } else {
        navigate("/administratorius");
      }
    }
  }, [user, navigate]);

  return (
    <main>
      {loginForm ? (
        <LoginForm onClose={() => setLoginForm(false)} />
      ) : (
        <RegisterForm onClose={() => setLoginForm(true)} />
      )}
    </main>
  );
};
