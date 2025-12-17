import React, { useEffect, useState } from "react";
import { getDay } from "../../../../utils/getDay";

type Props = {};
type temp = {
  date: any;
  temperature: number;
  min: number;
  unit: string;
};
const DailyTemperature = (props: Props) => {
  const [temperatures, setTemperatures] = useState<temp[] | null>(null);
  useEffect(() => {
    const callWeather = async () => {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const { latitude, longitude } = pos.coords;
          const response = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=7`
          );

          const data = await response.json();
          console.log(data);

          const dailyValues = data?.daily?.temperature_2m_max?.map(
            (item: number, index: number) => ({
              date: data?.daily?.time?.[index],
              temperature: item,
              min: data?.daily?.temperature_2m_min?.[index],
              unit: data?.daily_units?.temperature_2m_max,
            })
          );
          setTemperatures(dailyValues);
          console.log(data);
        },
        (error) => {
          console.error("Error get user location: ", error);
        }
      );
    };
    callWeather();
  }, []);

  return (
    <div className="w-full bg-[#fbf8cb] text-[#A78610] p-4 mt-2 flex justify-center items-center rounded-lg">
      <table className="w-full" cellSpacing={12}>
        <tr className="text-left ">
          <th className="p-3">Day</th>
          <th className="p-3">Max</th>
          <th className="p-3">Min</th>
        </tr>
        {temperatures?.map((item) => (
          <tr key={item?.temperature}>
            <td className="w-1/2 p-3">{getDay(item?.date)}</td>
            <td>
              {item?.temperature} {item?.unit}
            </td>
            <td>
              {item?.min} {item?.unit}
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default DailyTemperature;
