import HelperService from "../services/HelperService";
import { IAppointment } from "../types/appointment";

interface SingleAppointmentProps {
  item: IAppointment;
}

export const SingleAppointment = ({ item }: SingleAppointmentProps) => {
  return (
    <div className="flex gap-3 justify-between">
      <div className="w-8 h-8 border border-violet-300 rounded-md flex items-center justify-center cursor-pointer">
        ❌
      </div>
      <div className="flex flex-col flex-grow">
        <p className="text-violet-800 font-semibold text-lg">{item.pet_name}</p>
        <p>
          <span className="text-slate-400 font-semibold">Savininkas</span>:{" "}
          {item.user_id}
        </p>
        <p>{item.notes ? item.notes : "-----"}</p>
      </div>
      <div>{HelperService.datetimeToString(item.date, item.time)}</div>
    </div>
  );
};
