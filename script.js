const apiKey = "f9168e21b6abe8fb6e5359d1ddb28b0e";
let map;

async function makeApiRequest(city) {
  const result = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
  );

  return result.data;
}

async function onCity() {
  const city = document.getElementById("city-input").value;

  try {
    setWeatherIcon("");
    const serverResponse = await makeApiRequest(city);
    setTextInParagraph(
      `Temperatura in ${city} este ${serverResponse.main.temp}`
    );
    console.log(serverResponse);
    setWeatherIcon(serverResponse.weather[0].description);
    centerMap(serverResponse.coord.lat, serverResponse.coord.lon);
  } catch (error) {
    setTextInParagraph(`Eroare! ${error.response.data.message}!`);
  }
}

function setTextInParagraph(message) {
  document.getElementById("weather-response").innerText = message;
}

function setWeatherIcon(weatherString) {
  if (!weatherString) {
    document.getElementById("weather-image").src = "";
  } else {
    if (weatherString.toLowerCase().includes("clouds")) {
      document.getElementById("weather-image").src =
        "https://github.com/visualcrossing/WeatherIcons/blob/main/PNG/2nd%20Set%20-%20Color/cloudy.png?raw=true";
    } else {
      document.getElementById("weather-image").src =
        "https://github.com/visualcrossing/WeatherIcons/blob/main/PNG/2nd%20Set%20-%20Color/clear-day.png?raw=true";
    }
  }
}

function initMap() {
  navigator.geolocation.getCurrentPosition(function (position) {
    setLocationOnMap(position.coords.latitude, position.coords.longitude);
  });
}

function centerMap(latitude, longitude) {
  map.setCenter({
    lat: latitude,
    lng: longitude,
  });
}

function setLocationOnMap(latitude, longitude) {
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 10,
    center: {
      lat: latitude,
      lng: longitude,
    },
  });
}
