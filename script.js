const apikey ='fd154a79e16d34a9e2764e6f1552f35d';

const weatherDataEl = document.getElementById('weather-data')
const inputDataEl = document.getElementById('city-input')
const form = document.querySelector('form');

form.addEventListener('submit',(event)=>{
  event.preventDefault();
  const inputValue = inputDataEl.value;
  getWeatherData(inputValue)
});

async function getWeatherData(inputValue){
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${apikey}&units=metric`)

    if (!response.ok) {
      throw new Error("Network response was not ok")
    }

    const data = await response.json()
    console.log(data)

    const temp = Math.round(data.main.temp);
    const desc = data.weather[0].description;
    const icon = data.weather[0].icon;

    const details = [
      `Feels like:${Math.round(data.main.feels_like)}`,
      `Humidity: ${data.main.humidity}%`,
      `Wind speed: ${data.wind.speed} m/s`,
    ]

    weatherDataEl.querySelector('.icon').innerHTML =`<img src="http://openweathermap.org/img/wn/${icon}.png">`;

    weatherDataEl.querySelector('.temperature').textContent = `${temp}°C`;
    weatherDataEl.querySelector('.description').textContent = `${desc}`;
    weatherDataEl.querySelector('.details').innerHTML = details.map((detail)=>`<div>${detail}</div>`).join("")
  } catch (error) {
    
    weatherDataEl.querySelector('.icon').innerHTML = "";

    weatherDataEl.querySelector('.temperature').textContent = "";
    weatherDataEl.querySelector('.description').textContent = " An Error Happened please Check you have inputted the correct name";
    weatherDataEl.querySelector('.details').innerHTML = ""
    
  }
}


