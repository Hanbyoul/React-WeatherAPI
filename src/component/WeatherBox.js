import React from "react";

const WeatherBox = ({ weather }) => {
  return (
    <div className="weather-box">
      <h2>{weather?.name}</h2>
      <span className="img">
        <h1>{weather?.main.temp}°C </h1>
        <img
          src={
            weather &&
            `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`
          }
        />
      </span>
      <h3>{weather?.weather[0].description}</h3>
    </div>
  );
};

export default WeatherBox;
