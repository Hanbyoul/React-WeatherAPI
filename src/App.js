import { useState, useEffect } from "react";
import "./App.css";
import WeatherBox from "./component/WeatherBox";
import WeatherButton from "./component/WeatherButton";
import "bootstrap/dist/css/bootstrap.min.css";
import ClipLoader from "react-spinners/ClipLoader";

function App() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState(null);
  const [loading, setLoading] = useState(false);
  const [apierror, setAPIError] = useState("");
  const cities = [
    "seoul",
    "busan",
    "daegu",
    "incheon",
    "gwangju",
    "daejeon",
    "ulsan",
  ];
  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      WeatherCurrentLocation(lat, lon);
    });
  };

  const HandleWeather = (city) => {
    if (city == "current") {
      setCity(null);
    } else {
      setCity(city);
    }
  };

  const WeatherCurrentLocation = async (lat, lon) => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=860f2b4d1ecfc1b95b8bab0cad99bd91&units=metric`;
      let res = await fetch(url);
      let data = await res.json();
      setWeather(data);
      setLoading(false);
    } catch (err) {
      setAPIError(err.message);
      setLoading(false);
    }
  };

  const getWeatherByCity = async () => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=860f2b4d1ecfc1b95b8bab0cad99bd91&units=metric`;
      let res = await fetch(url);
      let data = await res.json();
      setWeather(data);
      setLoading(false);
    } catch (err) {
      setAPIError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (city == null) {
      getCurrentLocation();
      setLoading(true);
    } else {
      getWeatherByCity();
      setLoading(true);
    }
  }, [city]);

  return (
    <div>
      {loading ? (
        <div className="container">
          <ClipLoader color="red" loading={loading} size={150} />
        </div>
      ) : !apierror ? (
        <div className="container">
          <WeatherBox weather={weather} />
          <WeatherButton
            cities={cities}
            HandleWeather={HandleWeather}
            selectedcity={city}
          />
        </div>
      ) : (
        apierror
      )}
    </div>
  );
}

export default App;
