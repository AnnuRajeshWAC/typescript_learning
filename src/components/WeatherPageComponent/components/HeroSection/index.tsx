import { greetings } from "../../../../utils/greetings";
import { getDay, getLocalTime } from "../../../../utils/getDay";
import DynamicClock from "./components/DynamicClock";
import photo from "../../../../assets/images/frame.png";
import photo2 from "../../../../assets/images/frame2.png";

type Props = {
  temperature: number;
  time: any;
  unit: any;
  count: number | null;
};
type WeatherOption = {
  label: string;
  img: string;
  values: number[];
};
const WeatherHeroSection = ({ temperature, time, unit = {}, count }: Props) => {
  const localTime = getLocalTime(time);
  const d = new Date();
  const greeting = greetings(d.getHours());
  const day = getDay(d);
  const month = new Date(localTime).toLocaleDateString([], {
    month: "long",
  });
  const dateNum = new Date(localTime).getDate();
  const weatherOptions: WeatherOption[] = [
    {
      label: "It's a beautiful sunny day",
      img: photo2,
      values: [0],
    },
    {
      label: "A cloudy day ahead",
      img: photo,
      values: [1, 2, 3],
    },
    {
      label: "Foggy weather outside",
      img: photo,
      values: [45, 48],
    },
    {
      label: "Light drizzle",
      img: photo2,
      values: [51, 53, 55],
    },
    {
      label: "Rainy day, take an umbrella",
      img: photo,
      values: [61, 63, 65, 80, 81, 82],
    },
    {
      label: "Freezing cold",
      img: photo,
      values: [56, 57, 66, 67],
    },
    {
      label: "Snow is falling",
      img: photo2,
      values: [71, 73, 75, 85, 86],
    },
    {
      label: "Snow grains",
      img: photo,
      values: [77],
    },
    {
      label: "Thunderstorms incoming",
      img: photo,
      values: [95, 96, 99],
    },
  ];

  const getWeather = (count: number) => {
    const found = weatherOptions.find((item) => item.values.includes(count));

    if (!found) {
      return { label: "Unknown weather", img: "/images/unknown.png" };
    }

    return { label: found.label, img: found.img };
  };

  const weather: any = getWeather(count ?? 0);

  return (
    <div className="flex justify-between w-full px-2 py-2 max-md:flex-col-reverse bg-[#cddeef] max-md:items-center max-md:gap-4">
      <div className=" flex flex-col gap-6 w-full justify-center items-center text-[#265185]">
        <span className="text-7xl tracking-tight font-bold max-md:text-4xl">
          {temperature} {unit?.temperature}
        </span>
        <div className="flex flex-col gap-2 max-md:justify-center max-md:items-center">
          <span className="text-3xl tracking-tight max-md:text-xl">
            {greeting}
          </span>
          <span>
            {day},{dateNum} {month}
          </span>
          <span>{weather.label} </span>

          <DynamicClock />
        </div>
      </div>
      <div className=" max-md:h-40 flex justify-center items-center">
        <img
          src={weather?.img}
          alt={weather?.label}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};
export default WeatherHeroSection;
