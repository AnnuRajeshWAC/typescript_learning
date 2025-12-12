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
  const t: number = date?.getDay();
  const currentDate = new Date();
  const d = new Date(date);
  if (d === currentDate) {
    return "Today";
  } else {
    return days[t];
  }
};
