import React, { useEffect, useState } from "react";
import WeatherHeroSection from "./components/HeroSection";
import SunRiseAndSet from "./components/SunTime";
import CardSet from "./components/CardSet";
import DailyTemperature from "./components/DailyTemperature";

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
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&timezone=auto`
          );
          const data = await response.json();

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
    <div className="flex max-lg:flex-col justify-start">
      <div
        className="
  min-h-screen  flex flex-col  justify-start w-2/3 max-lg:w-full "
      >
        <WeatherHeroSection
          temperature={location?.temperature ?? 0}
          time={location?.time}
          unit={units}
          count={location?.weathercode ?? 0}
        />
        <div className="flex justify-center items-center m-2 max-lg:flex-col max-md:p-4 max-h-1/3">
          <SunRiseAndSet />
          <CardSet />
        </div>
      </div>
      <div className="w-1/3 max-lg:w-full flex flex-col p-5 shadow-sm justify-center">
        <DailyTemperature />
        <div className="h-1/2"></div>
      </div>
    </div>
  );
};

export default Weather;
