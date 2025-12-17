import { useEffect, useState } from "react";
import { formatTime, getTime } from "../../../../utils/greetings";

type riseAndSet = {
  rise: any;
  set: any;
} | null;
const SunRiseAndSet = () => {
  const [time, setTime] = useState<riseAndSet>(null);
  useEffect(() => {
    const callSunriseandset = async () => {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const { latitude, longitude } = pos.coords;

          const response = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=sunrise,sunset&timezone=auto`
          );
          const data = await response.json();

          setTime({
            rise: data?.daily?.sunrise?.[0],
            set: data?.daily?.sunset?.[0],
          });
        },
        (error) => {
          console.error("Error get user location: ", error);
        }
      );
    };
    callSunriseandset();
  }, []);
  return (
    <div className="w-1/3 flex flex-col justify-center items-center bg-[#f6efff] m-6 space-y-10 rounded-lg h-full max-lg:w-full p-3">
      <h2 className="   w-full  tracking-tight  text-[#6D80B0] shadow-2xs border-gray-200 p-3">
        Sunrise And Sunset
      </h2>
      <div className="max-w-72 w-full h-44 border-t-2 rounded-t-full border-[#6D80B0] ">
        <div className="flex justify-between w-full h-full items-end text-[#6D80B0] pb-3">
          <span className="">{getTime(time?.rise)}</span>
          <span>{getTime(time?.set)}</span>
        </div>
      </div>
    </div>
  );
};

export default SunRiseAndSet;
