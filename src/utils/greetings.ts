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
  const hr = date.getHours();
  const mm = date.getMinutes();
  if (hr >= 12) {
    const h: number = 24 - hr;
    return `${h}:${mm} PM`;
  } else {
    return `${hr}:${mm} AM`;
  }
};
