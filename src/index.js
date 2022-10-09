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

  function formatDay(timestamp) {
    let date = new Date(timestamp*1000);
    let day = date.getDay();
    let days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
    return days[day];

  };

  function formatHour(timestamp) {
    let date = new Date(timestamp*1000);
    let hour = date.getHours();
    let min = date.getMinutes();
    timeHour = hour+":"+min;
    return timeHour;
  };

  function displayForecast(response) {
    console.log(response.data.hourly);
    let forecast = response.data.daily;
    let forecastElement = document.querySelector("#forecast");
    let forecastHTML = `<div class="row">`;
    forecast.forEach(function(forecastDay,index){
      if (index < 6){
      forecastHTML = forecastHTML+`
      <div class="col-2">
        <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
          <img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" class="icons">
            <div class="weather-forecast-temperatures">
              <span class="weather-forecast-temperature-max">${Math.round(forecastDay.temp.max)}°</span> <br />
              <span class="weather-forecast-temperature-min">${Math.round(forecastDay.temp.min)}°</span>
            </div>
          </div>
        `;
      }
    })
    forecastHTML = forecastHTML+"</div>";
    forecastElement.innerHTML = forecastHTML;


    let forecastHour = response.data.hourly;
    let forecastHourElement = document.querySelector("#hourly-forecast");
    let forecastHourHTML = `<div class="row">`;

    forecast.forEach(function(forecastHour,index){
    if (index < 6){
    forecastHourHTML = forecastHourHTML+`
      <div class="col-2">
        ${formatHour(forecastHour.dt)}
        <strong>${Math.round(forecastHour.temp.min)}°</strong>
      </div>
    `;
    }
  })
  forecastHourHTML = forecastHourHTML+"</div>";
  forecastHourElement.innerHTML = forecastHourHTML;
  }

  function getForecast(coordinates){
   
    let apiKey = "62231151ce343c4d68652e1617efc22f";
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude={part}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayForecast);
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
    let iconElement = document.querySelector("#icon");
    iconElement.setAttribute ("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    iconElement.setAttribute("alt",response.data.weather[0].description);

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

    getForecast(response.data.coord);
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
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&exclude={}&appid=${apiKey}&units=metric`;
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
  //displayForecast();
  
