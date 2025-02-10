export const AppointmentForm = () => {
  return (
    <form className="px-4">
      <div>
        <div className="grid grid-cols-12 gap-2 items-center my-2">
          <label className="col-span-3 text-right" htmlFor="pet_name">
            Gyvūno vardas
          </label>
          <input
            id="pet_name"
            className="w-full col-span-9 border border-violet-300 rounded-lg px-2 py-1"
            type="text"
            placeholder="Gyvūno vardas"
          />
        </div>
        <div className="grid grid-cols-12 gap-2 items-center my-2">
          <label className="col-span-3 text-right" htmlFor="owner">
            Savininkas
          </label>
          <input
            className="w-full col-span-9 border border-violet-300 rounded-lg px-2 py-1"
            type="text"
            placeholder="Gyvūno vardas"
          />
        </div>
        <div className="grid grid-cols-12 gap-2 items-center my-2">
          <label className="col-span-3 text-right" htmlFor="notes">
            Data
          </label>
          <div className="col-span-9 grid grid-cols-12 gap-2 items-center">
            <input
              className="w-full col-span-4 border border-violet-300 rounded-lg px-2 py-1"
              type="date"
              placeholder="Gyvūno vardas"
            />
            <label className="col-span-4 text-right">Laikas</label>
            <input
              className="w-full col-span-4 border border-violet-300 rounded-lg px-2 py-1"
              type="time"
              placeholder="Gyvūno vardas"
            />
          </div>
        </div>
        <div className="grid grid-cols-12 gap-2 items-start my-2">
          <label className="col-span-3 text-right" htmlFor="notes">
            Pastabos
          </label>
          <textarea
            className="w-full col-span-9 border border-violet-300 rounded-lg px-2 py-1"
            id="notes"
            rows={4}
          />
        </div>
      </div>
    </form>
  );
};
