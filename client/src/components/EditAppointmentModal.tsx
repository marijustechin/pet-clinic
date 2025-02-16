import { IoMdClose } from 'react-icons/io';
import { EditAppointmentForm } from './EditAppointmentForm';
import { IAppointment } from '../types/appointment';

interface ConfirmModalProps {
  open: boolean;
  item: IAppointment;
  onClose: () => void;
}

export const EditAppointmentModal = ({
  open,
  item,
  onClose,
}: ConfirmModalProps) => {
  return (
    /** overlejus */
    <div
      className={`fixed inset-0 flex justify-center items-center transition-colors z-50 ${
        open ? 'visible bg-slate-800/50' : 'invisible'
      }`}
    >
      {/* langas */}
      <div
        // reikia sustabdyti is tevo
        // paveldeta onclik funkcija
        onClick={(e) => e.stopPropagation()}
        className={`bg-slate-100 rounded-xl shadow p-6 transition-all text-lg max-w-lg ${
          open ? 'scale-100 opacity-100' : 'scale-125 opacity-0'
        }`}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 p-1 rounded-lg text-slate-500 bg-slate-50 hover:bg-slate-200 hover:text-slate-600"
        >
          <IoMdClose />
        </button>
        <EditAppointmentForm item={item} onClose={onClose} />
      </div>
    </div>
  );
};
