import { parseISO, format } from 'date-fns';
import createSVG from './svg-icons';

function displayLocationHeader(weatherArray) {
  const header = document.getElementById('location-name');
  header.innerHTML = '';
  header.innerHTML = weatherArray[0];
}

function displayDaysNav(weatherArray) {
  const divId = [
    'day-zero',
    'day-one',
    'day-two',
    'day-three',
    'day-four',
    'day-five',
    'day-six',
  ];

  const dayId = [0, 1, 2, 3, 4, 5, 6];

  const forecastObj = weatherArray[1];

  for (let i = 0; i < divId.length; i += 1) {
    const day = document.querySelector(`#${divId[i]} .nav-day`);
    const date = document.querySelector(`#${divId[i]} .nav-date`);
    const temperature = document.querySelector(`#${divId[i]} .nav-temp`);
    const icon = document.querySelector(`#${divId[i]} .nav-icon`);
    const parsedDate = parseISO(forecastObj[dayId[i]].datetime);

    day.innerHTML = '';
    day.innerHTML = format(parsedDate, 'EEEE');

    date.innerHTML = '';
    date.innerHTML = format(parsedDate, 'dd MMM yyyy');

    temperature.innerHTML = '';
    temperature.innerHTML = `<span class='temperature'>${
      forecastObj[dayId[i]].temp
    }</span><span class='temperature-scale'>&#8451;</span>`;

    icon.innerHTML = '';
    icon.innerHTML = createSVG(forecastObj[dayId[i]].icon);
  }
}

function displayTemperatureMetrics(weatherArray, day) {
  const conditions = document.getElementById('conditions');
  const meanTemp = document.getElementById('mean-temp');
  const maxTemp = document.getElementById('max-temp');
  const minTemp = document.getElementById('min-temp');
  const weatherIcon = document.getElementById('weather-icon');
  const forecastObj = weatherArray[1];

  conditions.innerHTML = '';
  conditions.innerHTML = forecastObj[day].conditions;

  meanTemp.innerHTML = '';
  meanTemp.innerHTML = `<span class='temperature'>${forecastObj[day].temp}</span><span class='temperature-scale'>&#8451;</span>`;

  maxTemp.innerHTML = '';
  maxTemp.innerHTML = `<span class='temperature'>${forecastObj[day].tempmax}</span><span class='temperature-scale'>&#8451;</span>`;

  minTemp.innerHTML = '';
  minTemp.innerHTML = `<span class='temperature'>${forecastObj[day].tempmin}</span><span class='temperature-scale'>&#8451;</span>`;

  // this one needs to be reworked once we have icon svgs decided
  weatherIcon.innerHTML = '';
  weatherIcon.innerHTML = createSVG(forecastObj[day].icon);
}

function displayWeatherMetrics(weatherArray, day) {
  // select the element data container
  const feelsLikeTemp = document.querySelector(
    '#feels-like-temp > div > .element-data'
  );
  const humidity = document.querySelector('#humidity > div > .element-data');
  const rainChance = document.querySelector(
    '#rain-chance > div > .element-data'
  );
  const windSpeed = document.querySelector('#wind-speed > div > .element-data');
  const uvIndex = document.querySelector('#uv > div > .element-data');

  // select all element icons and all element names
  const icons = document.querySelectorAll('.element-icon');
  const names = document.querySelectorAll('.element-name');

  // weather data
  const forecastObj = weatherArray[1];

  // populate data
  feelsLikeTemp.innerHTML = '';
  feelsLikeTemp.innerHTML = `<span class='temperature'>${forecastObj[day].feelslike}</span><span class='temperature-scale'>&#8451;</span>`;

  humidity.innerHTML = '';
  humidity.innerHTML = `${forecastObj[day].humidity}%`;

  rainChance.innerHTML = '';
  rainChance.innerHTML = `${forecastObj[day].precipprob}%`;

  windSpeed.innerHTML = '';
  windSpeed.innerHTML = `<span class='speed'>${forecastObj[day].windspeed}</span><span class='speed-scale'>mph</span>`;

  uvIndex.innerHTML = '';
  uvIndex.innerHTML = forecastObj[day].uvindex;

  // display names and icons;
  icons.forEach((element) => {
    element.classList.remove('visually-hidden');
  });

  names.forEach((element) => {
    element.classList.remove('visually-hidden');
  });
}

function displayHourlyForecast(weatherArray, day) {
  const hours = [
    '00',
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
    '19',
    '20',
    '21',
    '22',
    '23',
  ];

  const forecastObj = weatherArray[1];
  const hourlyData = forecastObj[day].hours;

  for (let i = 0; i < hours.length; i += 1) {
    const container = document.querySelector(`[data-hour='${hours[i]}']`);
    const time = container.querySelector('.hours-time');
    const meanTemp = container.querySelector('.hours-temp');
    const icon = container.querySelector('.hours-icon');

    // formatting time string
    const timeString = hourlyData[i].datetime;
    const [hours_, minutes, seconds] = timeString.split(':').map(Number);
    const date = new Date(0, 0, 0, hours_, minutes, seconds);
    const formattedTime = format(date, 'HH:mm');

    time.innerHTML = '';
    time.innerHTML = formattedTime;

    meanTemp.innerHTML = '';
    meanTemp.innerHTML = `<span class='temperature'>${hourlyData[i].temp}</span><span class='temperature-scale'></span>`;

    icon.innerHTML = '';
    icon.innerHTML = createSVG(hourlyData[i].icon);
  }
}

function displayForecastData(weatherArray, day) {
  displayLocationHeader(weatherArray);
  displayDaysNav(weatherArray);
  displayTemperatureMetrics(weatherArray, day);
  displayWeatherMetrics(weatherArray, day);
  displayHourlyForecast(weatherArray, day);
}

export { displayForecastData };
