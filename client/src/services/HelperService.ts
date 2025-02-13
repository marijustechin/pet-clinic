import axios from "axios";

const months = [
  "Sau",
  "Vas",
  "Kov",
  "Bal",
  "Geg",
  "Bir",
  "Lie",
  "Rug",
  "Rgs",
  "Spa",
  "Lap",
  "Gru",
];

export default class HelperService {
  static errorToString(e: unknown): string {
    if (axios.isAxiosError(e)) return e.response?.data.message;

    if (e instanceof Error) return e.message;

    console.log(e);
    return "Nežinoma klaida";
  }

  static datetimeToString(date: string, time: string): string {
    const d = new Date(date);
    const m = months[d.getMonth()];
    return (
      m +
      "-" +
      d.toLocaleDateString("lt-LT").substring(5, 7) +
      " " +
      time.substring(0, 5)
    );
  }
}
