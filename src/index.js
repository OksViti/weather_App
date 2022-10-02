function currentTime() {
    let currentTime = new Date();
    let hours = currentTime.getHours();
    if (hours < 10) {
      hours = "0".concat(hours);
    }
  
    let minutes = currentTime.getMinutes();
    if (minutes < 10) {
      minutes = "0".concat(minutes);
    }
  
    currentTime =
      currentTime.toLocaleString("en", { month: "long" }) +
      " " +
      hours +
      ":" +
      minutes;
    return currentTime;
  }
  
  let dateForm = document.querySelector("#current-date");
  dateForm.innerHTML = currentTime();
  
  function putTemperatureF(event) {
    event.preventDefault();
    let temperature = document.querySelector("#temperature");
    //remove the active class the celsius link
    changeTemperatureC.classList.remove("active");
    changeTemperatureF.classList.add("active");
    temperature.innerHTML = Math.round((celsiusTemperature * 9) / 5 + 32);
  }
  
  let changeTemperatureF = document.querySelector("#f-link");
  changeTemperatureF.addEventListener("click", putTemperatureF);
  
  function putTemperatureC(event) {
    event.preventDefault();
    let temperature = document.querySelector("#temperature");
    //remove the active class the celsius link
    changeTemperatureC.classList.add("active");
    changeTemperatureF.classList.remove("active");
    temperature.innerHTML = Math.round(celsiusTemperature);
  }
  
  let changeTemperatureC = document.querySelector("#c-link");
  changeTemperatureC.addEventListener("click", putTemperatureC);
  
  function displayWeatherCondition(response) {
    document.querySelector("h1").innerHTML =
      response.data.name + ", " + response.data.sys.country;

    celsiusTemperature = response.data.main.temp;

    document.querySelector("#temperature").innerHTML = Math.round(
      celsiusTemperature);
  
    document.querySelector("#humidity").innerHTML = response.data.main.humidity;
    document.querySelector("#wind").innerHTML = Math.round(
      response.data.wind.speed
    );
    document.querySelector("#description").innerHTML =
      response.data.weather[0].main;
  }
  function searchCity(city) {
    let apiKey = "62231151ce343c4d68652e1617efc22f";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayWeatherCondition);
  }
  
  function handleSubmit(event) {
    event.preventDefault();
    let city = document.querySelector("#city-input").value;
    searchCity(city);
  }
  
  function searchLocation(position) {
    let apiKey = "62231151ce343c4d68652e1617efc22f";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  
    axios.get(apiUrl).then(displayWeatherCondition);
  }
  
  function getCurrentLocation(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(searchLocation);
  }
  
  let celsiusTemperature = null;

  let searchForm = document.querySelector(".searchForm");
  searchForm.addEventListener("submit", handleSubmit);
  
  let currentLocationButton = document.querySelector("#current-location-button");
  currentLocationButton.addEventListener("click", getCurrentLocation);
  
  searchCity("Kyiv");
  
