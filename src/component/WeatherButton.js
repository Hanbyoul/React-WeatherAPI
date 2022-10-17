import React from "react";
import Button from "react-bootstrap/Button";

const WeatherButton = ({ cities, HandleWeather, selectedcity }) => {
  return (
    <div className="weather-btn">
      <Button
        variant={selectedcity == null ? "outline-primary" : "primary"}
        onClick={() => {
          HandleWeather("current");
        }}
      >
        Current Location
      </Button>
      {cities.map((city) => (
        <Button
          variant={selectedcity == city ? "outline-primary" : "primary"}
          onClick={() => HandleWeather(city)}
        >
          {city}
        </Button>
      ))}
    </div>
  );
};

export default WeatherButton;
