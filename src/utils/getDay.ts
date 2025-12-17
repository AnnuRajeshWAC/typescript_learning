const days: Record<number, string> = {
  0: "Sunday",
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday",
};
export const getLocalTime = (time: any) => {
  return new Date(time + "Z");
};
export const getDay = (date: any) => {
  const sample = new Date(date);
  const t: number = sample?.getDay();
  const currentDate = new Date();
  const d = new Date(date);
  if (d.toDateString() === currentDate.toDateString()) {
    return "Today";
  }
  return days[t];
};
