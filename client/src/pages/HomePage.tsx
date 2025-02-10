import { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { AppointmentForm } from "../components/AppointmentForm";
import { AppointmentListFilter } from "../components/AppointmentListFilter";
import { AppointmentList } from "../components/AppointmentList";

export const HomePage = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <main className="max-w-6xl mx-auto px-1 md:px-2 lg:px-3">
      <div className="border border-violet-300 rounded-lg  mt-4">
        <h3
          onClick={() => setShowForm(!showForm)}
          className="bg-violet-300 rounded-t-lg p-3 flex gap-2 items-center justify-center text-violet-800 text-xl cursor-pointer"
        >
          {showForm ? <FaMinus /> : <FaPlus />}
          <span className="font-semibold">Registruotis vizitui</span>
        </h3>
        {showForm && <AppointmentForm />}
      </div>
      <AppointmentListFilter />
      <AppointmentList />
    </main>
  );
};
