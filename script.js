document.addEventListener("DOMContentLoaded", function () {
  const userInput = document.querySelector('input[type="text"]');
  const cityElement = document.getElementById("cityName");
  const temperatureElement = document.getElementById("temperature");
  const humidityElement = document.getElementById("humidity");
  const windElement = document.getElementById("wind");

  function displayWeather(response) {
    cityElement.textContent = response.data.name;
    temperatureElement.textContent = `${Math.round(response.data.main.temp)}°C`;
    humidityElement.textContent = `${response.data.main.humidity}%`;
    windElement.textContent = `${Math.round(response.data.wind.speed)} km/h`;
  }

  function searchCity(city) {
    let apiKey = "c0e2f9190eca4cd07b0365c5940b2994";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    axios
      .get(apiUrl)
      .then(displayWeather)
      .catch(function (error) {
        console.error("Error:", error);
        cityElement.textContent = "City not found";
        temperatureElement.textContent = "";
        humidityElement.textContent = "";
        windElement.textContent = "";
      });
  }

  const searchButton = document.getElementById("searchButton");
  searchButton.addEventListener("click", function () {
    let city = userInput.value.trim();
    if (city !== "") {
      searchCity(city);
      cityElement.textContent = "Searching...";
    }
  });

  const currentButton = document.getElementById("currentButton");
  currentButton.addEventListener("click", function () {
    navigator.geolocation.getCurrentPosition(function (position) {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      let apiKey = "c0e2f9190eca4cd07b0365c5940b2994";
      let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

      axios.get(apiUrl).then(displayWeather);
    });
    cityElement.textContent = "Fetching current location...";
  });

  userInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      let city = userInput.value.trim();
      if (city !== "") {
        searchCity(city);
        cityElement.textContent = "Searching...";
      }
    }
  });

  searchCity("Odesa");
});
