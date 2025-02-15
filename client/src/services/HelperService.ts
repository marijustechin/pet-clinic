import axios from 'axios';

const months = [
  'Sau',
  'Vas',
  'Kov',
  'Bal',
  'Geg',
  'Bir',
  'Lie',
  'Rug',
  'Rgs',
  'Spa',
  'Lap',
  'Gru',
];

export default class HelperService {
  static errorToString(e: unknown): string {
    if (axios.isAxiosError(e)) return e.response?.data.message;

    if (e instanceof Error) return e.message;

    console.log(e);
    return 'Nežinoma klaida';
  }

  static datetimeToString(date: Date): string {
    const dateTime = new Date(date).toLocaleDateString('lt-Lt', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: false,
    });

    return dateTime;
  }
}
