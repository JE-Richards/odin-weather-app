import { parseISO, format } from 'date-fns';
import createSVG from './svg-icons';
import { changeTemperatureScale, changeSpeedScale } from './change-scales';

function displayLocationHeader(weatherArray) {
  const header = document.getElementById('location-name');
  header.innerHTML = '';
  header.innerHTML = weatherArray[0];
}

function displayDaysNav(weatherArray, temperatureScale) {
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
    const div = document.getElementById(divId[i]);

    day.innerHTML = '';
    day.innerHTML = format(parsedDate, 'EEEE');

    date.innerHTML = '';
    date.innerHTML = format(parsedDate, 'dd MMM yyyy');

    temperature.innerHTML = '';
    switch (temperatureScale) {
      case '℃':
        temperature.innerHTML = `<span class='temperature-value'>${
          forecastObj[dayId[i]].temp
        }</span><span class='temperature-scale'>&#8451;</span>`;
        break;
      case '℉':
        const temperatureValues = changeTemperatureScale(
          forecastObj[dayId[i]].temp,
          '℃'
        );
        temperature.innerHTML = `<span class='temperature-value'>${temperatureValues[0]}</span><span class='temperature-scale'>${temperatureValues[1]}</span>`;
        break;
      default:
        temperature.innerHTML = `<span class='temperature-value'>${
          forecastObj[dayId[i]].temp
        }</span><span class='temperature-scale'>&#8451;</span>`;
        break;
    }

    icon.innerHTML = '';
    icon.innerHTML = createSVG(forecastObj[dayId[i]].icon);

    div.addEventListener('click', (event) => {
      const data = weatherArray;

      // use current target to ensure the id of the div the event listener is attached to is returned
      // (the icon in the nav is contained in a div, so need to avoid that id being returned)
      const targetDiv = event.currentTarget.id;
      const speedToggle = document.getElementById('speed-toggle');
      const temperatureToggle = document.getElementById('temperature-toggle');

      let speedScale;
      let temperatureScale;

      if (speedToggle.checked) {
        speedScale = 'km/h';
      } else {
        speedScale = 'mph';
      }

      if (temperatureToggle.checked) {
        temperatureScale = '℉';
      } else {
        temperatureScale = '℃';
      }

      // use this array to get the correct index;
      const divId = [
        'day-zero',
        'day-one',
        'day-two',
        'day-three',
        'day-four',
        'day-five',
        'day-six',
      ];

      // find the index as it will correspond to the correct day within our data
      const i = divId.indexOf(targetDiv);

      // refresh the display with the correct days data
      displayTemperatureMetrics(data, i, temperatureScale);
      displayWeatherMetrics(data, i, temperatureScale, speedScale);
      displayHourlyForecast(data, i, temperatureScale);
    });
  }
}

function displayTemperatureMetrics(weatherArray, day, temperatureScale) {
  const conditions = document.getElementById('conditions');
  const meanTemp = document.getElementById('mean-temp');
  const maxTemp = document.getElementById('max-temp');
  const minTemp = document.getElementById('min-temp');
  const weatherIcon = document.getElementById('weather-icon');
  const forecastObj = weatherArray[1];

  conditions.innerHTML = '';
  conditions.innerHTML = forecastObj[day].conditions;

  meanTemp.innerHTML = '';
  maxTemp.innerHTML = '';
  minTemp.innerHTML = '';
  switch (temperatureScale) {
    case '℃':
      meanTemp.innerHTML = `Mean: <span class='temperature-value'>${forecastObj[day].temp}</span><span class='temperature-scale'>&#8451;</span>`;
      maxTemp.innerHTML = `Max: <span class='temperature-value'>${forecastObj[day].tempmax}</span><span class='temperature-scale'>&#8451;</span>`;
      minTemp.innerHTML = `Min: <span class='temperature-value'>${forecastObj[day].tempmin}</span><span class='temperature-scale'>&#8451;</span>`;
      break;
    case '℉':
      const meanTempValues = changeTemperatureScale(forecastObj[day].temp, '℃');
      const maxTempValues = changeTemperatureScale(
        forecastObj[day].tempmax,
        '℃'
      );
      const minTempValues = changeTemperatureScale(
        forecastObj[day].tempmin,
        '℃'
      );

      meanTemp.innerHTML = `Mean: <span class='temperature-value'>${meanTempValues[0]}</span><span class='temperature-scale'>${meanTempValues[1]}</span>`;
      maxTemp.innerHTML = `Max: <span class='temperature-value'>${maxTempValues[0]}</span><span class='temperature-scale'>${maxTempValues[1]}</span>`;
      minTemp.innerHTML = `Min: <span class='temperature-value'>${minTempValues[0]}</span><span class='temperature-scale'>${minTempValues[1]}</span>`;
      break;
    default:
      meanTemp.innerHTML = `Mean: <span class='temperature-value'>${forecastObj[day].temp}</span><span class='temperature-scale'>&#8451;</span>`;
      maxTemp.innerHTML = `Max: <span class='temperature-value'>${forecastObj[day].tempmax}</span><span class='temperature-scale'>&#8451;</span>`;
      minTemp.innerHTML = `Min: <span class='temperature-value'>${forecastObj[day].tempmin}</span><span class='temperature-scale'>&#8451;</span>`;
      break;
  }
  weatherIcon.innerHTML = '';
  weatherIcon.innerHTML = createSVG(forecastObj[day].icon);
}

function displayWeatherMetrics(
  weatherArray,
  day,
  temperatureScale,
  speedScale
) {
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
  switch (temperatureScale) {
    case '℃':
      feelsLikeTemp.innerHTML = `<span class='temperature-value'>${forecastObj[day].feelslike}</span><span class='temperature-scale'>&#8451;</span>`;
      break;
    case '℉':
      const temperatureValues = changeTemperatureScale(
        forecastObj[day].feelslike,
        '℃'
      );
      feelsLikeTemp.innerHTML = `<span class='temperature-value'>${temperatureValues[0]}</span><span class='temperature-scale'>${temperatureValues[1]}</span>`;
      break;
    default:
      feelsLikeTemp.innerHTML = `<span class='temperature-value'>${forecastObj[day].feelslike}</span><span class='temperature-scale'>&#8451;</span>`;
      break;
  }

  humidity.innerHTML = '';
  humidity.innerHTML = `${forecastObj[day].humidity}%`;

  rainChance.innerHTML = '';
  rainChance.innerHTML = `${forecastObj[day].precipprob}%`;

  windSpeed.innerHTML = '';
  switch (speedScale) {
    case 'mph':
      windSpeed.innerHTML = `<span class='speed-value'>${forecastObj[day].windspeed}</span><span class='speed-scale'>mph</span>`;
      break;
    case 'km/h':
      const speedValues = changeSpeedScale(forecastObj[day].windspeed, 'mph');
      windSpeed.innerHTML = `<span class='speed-value'>${speedValues[0]}</span><span class='speed-scale'>${speedValues[1]}</span>`;
      break;
    default:
      windSpeed.innerHTML = `<span class='speed-value'>${forecastObj[day].windspeed}</span><span class='speed-scale'>mph</span>`;
      break;
  }

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

function displayHourlyForecast(weatherArray, day, temperatureScale) {
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
    switch (temperatureScale) {
      case '℃':
        meanTemp.innerHTML = `<span class='temperature-value'>${hourlyData[i].temp}</span><span class='temperature-scale'>&#8451;</span>`;
        break;
      case '℉':
        const temperatureValues = changeTemperatureScale(
          hourlyData[i].temp,
          '℃'
        );
        meanTemp.innerHTML = `<span class='temperature-value'>${temperatureValues[0]}</span><span class='temperature-scale'>${temperatureValues[1]}</span>`;
        break;
      default:
        meanTemp.innerHTML = `<span class='temperature-value'>${hourlyData[i].temp}</span><span class='temperature-scale'>&#8451;</span>`;
        break;
    }

    icon.innerHTML = '';
    icon.innerHTML = createSVG(hourlyData[i].icon);
  }
}

function displayForecastData(weatherArray, day) {
  const speedToggle = document.getElementById('speed-toggle');
  const temperatureToggle = document.getElementById('temperature-toggle');

  let speedScale;
  let temperatureScale;

  if (speedToggle.checked) {
    speedScale = 'km/h';
  } else {
    speedScale = 'mph';
  }

  if (temperatureToggle.checked) {
    temperatureScale = '℉';
  } else {
    temperatureScale = '℃';
  }

  displayLocationHeader(weatherArray);
  displayDaysNav(weatherArray, temperatureScale);
  displayTemperatureMetrics(weatherArray, day, temperatureScale);
  displayWeatherMetrics(weatherArray, day, temperatureScale, speedScale);
  displayHourlyForecast(weatherArray, day, temperatureScale);
}

function displayErrorMessage(errorCode, message) {
  const header = document.getElementById('error-header');
  const details = document.getElementById('error-details');

  header.innerHTML = `Error ${errorCode}`;
  details.innerHTML = message;
}

export { displayForecastData, displayErrorMessage };
