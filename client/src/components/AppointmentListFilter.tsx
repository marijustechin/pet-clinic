export const AppointmentListFilter = () => {
  return (
    <div className="w-full flex items-center justify-center mt-4 ">
      <div className="flex border border-violet-300 rounded-lg">
        <input className="px-2 py-1" type="text" id="filter" />
        <select id="appointment_filter" className="bg-violet-300 rounded-r-lg">
          <option>--Rikiuoti pagal--</option>
          <option>Data</option>
          <option>Savininkas</option>
          <hr />
          <option>Didėjančia tvarka</option>
          <option>Mažėjančia tvarka</option>
        </select>
      </div>
    </div>
  );
};
