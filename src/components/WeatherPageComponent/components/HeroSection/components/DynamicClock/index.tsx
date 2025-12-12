import { useEffect, useState } from "react";

const DynamicClock = () => {
  const [clock, setClock] = useState<any | null>(null);
  useEffect(() => {
    const interval = setInterval(() => {
      const d = new Date();
      const timeString = d.toLocaleTimeString();
      setClock(timeString);
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return <div className="text-[#265185] w-full text-left">{clock}</div>;
};

export default DynamicClock;
