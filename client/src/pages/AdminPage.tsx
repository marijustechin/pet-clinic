import { useEffect } from "react";
import { useAppSelector } from "../store/store";
import { selectUser } from "../store/users/usersSlice";
import { useNavigate } from "react-router";
import { AppointmentListFilter } from "../components/AppointmentListFilter";
import { AppointmentList } from "../components/AppointmentList";

export const AdminPage = () => {
  const user = useAppSelector(selectUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    } else if (user && user.role !== "ADMIN") {
      navigate("/naudotojo-profilis");
    }
  }, [user, navigate]);

  return (
    <main>
      <section>
        <AppointmentListFilter />
        <AppointmentList />
      </section>
    </main>
  );
};
