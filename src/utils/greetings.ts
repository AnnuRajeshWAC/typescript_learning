export const greetings = (hr: number) => {
  if (hr > 4 && hr < 12) {
    return "Good Morning";
  } else if (hr >= 12 && hr < 17) {
    return "Good Afternoon";
  } else if (hr >= 17 && hr < 21) {
    return "Good Evening";
  } else {
    return "Good Night";
  }
};
export const getTime = (date: any) => {
  console.log(date, "date");

  const d = new Date(date + "Z");
  const hr = d?.getHours();
  const mm = d?.getMinutes();
  const formattedMinutes = String(mm).padStart(2, "0");

  if (hr >= 12) {
    const h: number = 24 - hr;
    return `${h}:${formattedMinutes} PM`;
  } else {
    return `${hr}:${formattedMinutes} AM`;
  }
};

export const formatTime = (time: any) => {
  return new Date(time).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
};
