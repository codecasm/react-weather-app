import React, { useState } from "react";
import keys from "./keys";

const api = {
  key: keys.API_KEY,
  base: keys.BASE_URL,
};

function App() {
  const dateBuild = (d) => {
    let date = String(new window.Date());
    date = date.slice(3, 15);
    return date;
  };

  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  const search = (e) => {
    if (e.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setQuery("");
          setWeather(result);
          console.log(result);
        });
    }
  };

  return (
    <div
      className={
        typeof weather.main != "undefined"
          ? weather.main.temp > 18
            ? "App hot"
            : "App cold"
          : "App"
      }
    >
      <main>
        <div className="search-container">
          <h1 className="search-text">
            Enter City Name:
          </h1>
          <input
            type="text"
            placeholder="Search..."
            className="search-bar"
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />

          <p className="city-link">
            <a
              href="https://en.wikipedia.org/wiki/List_of_cities_in_India_by_population#List"
              target="_blank"
              rel="noopener noreferrer">
              List of Indian Cities
              </a>
          </p>
        </div>

        {typeof weather.main != "undefined" ? (
          <div>
            <div className="location-container">
              <div className="location">
                {weather.name}, {weather.sys.country}
              </div>
              <div className="date"> {dateBuild(new Date())}</div>
            </div>
            <div className="weather-container">
              <div className="temperature">
                {Math.round(weather.main.temp)}°C
              </div>
              <div className="weather">{weather.weather[0].main}</div>
            </div>
          </div>
        ) : (
            ""
          )}
      </main>
      <footer>
        <p className="footer">
          with <span>&hearts;</span> by <a href="https://codecasm.com">CodeCasm</a>
        </p>
      </footer>
    </div>
  );
}

export default App;
