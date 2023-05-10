import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
const Weather = () => {

  const [weather, setWeather] = useState([]);
  const [condition, setCondition] = useState({});

  useEffect(() => {
    const fetchWeather = async () => {
      const res = await fetch(
        `http://api.weatherapi.com/v1/current.json?key=4565cba0fd5844848d4113315230905&q=istanbul&aqi=no`
      );
      const data = await res.json();
      setWeather(data.current);
      setCondition(data.current.condition);
    };

    fetchWeather();
  }, []);

  return (

    <Card bg="dark" className="float-end border-0" body>
      {weather.temp_c} °C
      <img src={condition.icon} alt="Weather Icon" /><br />
      {condition.text}
    </Card>

  );
};

export default Weather;
