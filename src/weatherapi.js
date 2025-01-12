import React, { useState } from "react";
import axios from "axios";

const App = () => {
  // State variables
  const [city, setCity] = useState(""); 
  const [weather, setWeather] = useState(null); 
  const [error, setError] = useState(null); 

  // API configuration
  const API_KEY = "879c7f87869644c3836163352250801"; 
  const BASE_URL = "https://api.weatherapi.com/v1/current.json";

  // Fetch weather data
  const fetchWeather = async () => {
    try {
      setError(null); // Reset error
      const response = await axios.get(BASE_URL, {
        params: {
          key: API_KEY,
          q: city,
        },
      });
      setWeather(response.data); // Set the weather data
    } catch (err) {
      setWeather(null); // Reset weather data
      setError("City not found or API error"); // Display error message
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Weather App</h1>
      {/* Input field for city */}
      <input
        type="text"
        placeholder="Enter city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        style={{ padding: "10px", fontSize: "16px", width: "300px" }}
      />
      {/* Button to fetch weather */}
      <button
        onClick={fetchWeather}
        style={{
          padding: "10px 20px",
          marginLeft: "10px",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        Get Weather
      </button>

      {/* Display weather data */}
      {weather && (
        <div style={{ marginTop: "20px" }}>
          <h3>
            Weather in {weather.location.name}, {weather.location.country}
          </h3>
          <p>Temperature: {weather.current.temp_c}°C</p>
          <p>Condition: {weather.current.condition.text}</p>
        </div>
      )}

      {/* Display error */}
      {error && <p style={{ color: "red", marginTop: "20px" }}>{error}</p>}
    </div>
  );
};

export default App;
