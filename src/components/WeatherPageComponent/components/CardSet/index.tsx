import React, { useEffect, useState } from "react";
type weatherValues = {
  label: string;
  unit: string;
  value: number;
  color: string;
};
const CardSet = () => {
  const [values, setValues] = useState<weatherValues[] | null>();
  useEffect(() => {
    const callWeather = async () => {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const { latitude, longitude } = pos.coords;
          const response = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,dew_point_2m,wind_speed_10m,wind_direction_10m,surface_pressure,visibility,uv_index&timezone=auto`
          );
          const data = await response.json();

          setValues([
            {
              label: "Humidity",
              unit: data?.current_units?.relative_humidity_2m ?? "",
              value: data?.current?.relative_humidity_2m ?? 0,
              color: "#e2c9dc",
            },
            {
              label: "UV Index",
              unit: data?.current_units?.uv_index ?? "",
              value: data?.current?.uv_index ?? 0,
              color: "#b9cbe8",
            },
            {
              label: "Dew Point",
              unit: data?.current_units?.dew_point_2m ?? "",
              value: data?.current?.dew_point_2m ?? 0,
              color: "#dbe6db",
            },
            {
              label: "Wind Speed",
              unit: data?.current_units?.wind_speed_10m ?? "",
              value: data?.current?.wind_speed_10m ?? 0,
              color: "#f9e9d5",
            },
            {
              label: "Pressure",
              unit: data?.current_units?.surface_pressure ?? "",
              value: data?.current?.surface_pressure ?? 0,
              color: "#fee1e8",
            },
            {
              label: "Visibility",
              unit: data?.current_units?.visibility ?? "",
              value: data?.current?.visibility
                ? data.current.visibility / 1000 // meters → km
                : 0,
              color: "#Fee1e8",
            },
          ]);
        },
        (error) => {
          console.error("Error get user location: ", error);
        }
      );
    };
    callWeather();
  }, []);

  return (
    <div className="flex-1 w-2/3 grid grid-cols-3 h-full gap-2  max-lg:w-full max-sm:grid-cols-2">
      {values?.map((item) => (
        <div
          key={item?.value}
          className={`w-full   text-[#93736C] flex flex-col rounded-lg`}
          style={{
            backgroundColor: item?.color,
          }}
        >
          <h3 className="border-b border-gray-100 p-2 shadow-2xs">
            {item?.label}
          </h3>
          <span className="p-3 h-full">
            {item?.value} {item?.unit}
          </span>
        </div>
      ))}
    </div>
  );
};
export default CardSet;
