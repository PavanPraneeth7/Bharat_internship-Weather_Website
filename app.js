const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const weatherInfo = document.getElementById('weather-info');
const loading = document.getElementById('loading');

const apiKey = '21a5bed3d7bff1934cf1de9eebec7367'; // Your API key
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

searchBtn.addEventListener('click', () => {
  const city = cityInput.value.trim();
  if (city) {
    getWeatherData(city);
  } else {
    alert('Please enter a city name');
  }
});

async function getWeatherData(city) {
  try {
    loading.style.display = 'block';
    weatherInfo.style.display = 'none';

    const response = await fetch(`${apiUrl}?q=${city}&appid=${apiKey}&units=metric`);
    const data = await response.json();

    if (data.cod === 200) {
      displayWeatherData(data);
    } else if (data.cod === '404') {
      alert('City not found');
    } else {
      alert('Error:', data.message);
    }
  } catch (error) {
    console.log('Error:', error);
    alert('An error occurred while fetching the weather data');
  } finally {
    loading.style.display = 'none';
  }
}

function displayWeatherData(data) {
  const { name, weather, main, wind, sys } = data;
  const { description, icon } = weather[0];
  const { temp, humidity, pressure } = main;
  const { speed, deg } = wind;
  const { country } = sys;

  const iconUrl = `http://openweathermap.org/img/w/${icon}.png`;
  const windDirection = getWindDirection(deg);

  weatherInfo.style.display = 'block';
  weatherInfo.innerHTML = `
    <h2>${name}, ${country}</h2>
    <div class="weather-details">
      <div class="left">
        <img src="${iconUrl}" alt="${description}">
        <p>${description}</p>
      </div>
      <div class="right">
        <p>Temperature: ${temp}&deg;C</p>
        <p>Humidity: ${humidity}%</p>
        <p>Pressure: ${pressure} hPa</p>
        <p>Wind: ${speed} m/s, ${windDirection}</p>
      </div>
    </div>
  `;
}

function getWindDirection(deg) {
  const directions = [
    'N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE',
    'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'
  ];
  const index = Math.round(deg / 22.5);
  return directions[index];
}








