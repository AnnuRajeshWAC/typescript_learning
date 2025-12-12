import React, { useEffect, useState } from "react";
import WeatherHeroSection from "./components/HeroSection";

type Props = {};
type WeatherData = {
  temperature: number;
  time: string;
  weathercode: number;
};
const Weather = (props: Props) => {
  const [location, setLocation] = useState<WeatherData | null>(null);
  const [units, setUnits] = useState(null);
  useEffect(() => {
    const callWeather = async () => {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const { latitude, longitude } = pos.coords;
          const response = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
          );
          const data = await response.json();

          console.log(data);

          setLocation(data.current_weather);
          setUnits(data?.current_weather_units);
        },
        (error) => {
          console.error("Error get user location: ", error);
        }
      );
    };
    callWeather();
  }, []);
  return (
    <div>
      <div>
        <div
          className="bg-[#F5FAFF]
  max-h-screen min-h-96 flex  justify-center w-2/3"
        >
          <WeatherHeroSection
            temperature={location?.temperature ?? 0}
            time={location?.time}
            unit={units}
            count={location?.weathercode}
          />
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
