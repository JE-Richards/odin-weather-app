import createSVG from './svg-icons';

function createHeader() {
  const locationHeader = document.createElement('h1');
  locationHeader.id = 'location-name';
  return locationHeader;
}

function createDaysNav() {
  const navBar = document.createElement('nav');

  const divId = [
    'day-zero',
    'day-one',
    'day-two',
    'day-three',
    'day-four',
    'day-five',
    'day-six',
  ];

  for (let i = 0; i < divId.length; i += 1) {
    const div = document.createElement('div');
    const day = document.createElement('p');
    const date = document.createElement('p');
    const temperature = document.createElement('p');
    const icon = document.createElement('div');

    day.classList.add('nav-day');
    date.classList.add('nav-date');
    temperature.classList.add('nav-temp', 'temperature');
    icon.classList.add('nav-icon');
    div.classList.add('nav-item');
    div.id = divId[i];

    div.appendChild(day);
    div.appendChild(date);
    div.appendChild(temperature);
    div.appendChild(icon);
    navBar.appendChild(div);
  }
  navBar.id = 'days-nav';
  return navBar;
}

function createForecastSection() {
  const section = document.createElement('section');
  section.id = 'forecast';
  return section;
}

function createTemperatureMetrics() {
  const article = document.createElement('article');
  article.id = 'temperature-metrics';

  const temperatureElements = [
    'conditions',
    'mean-temp',
    'max-temp',
    'min-temp',
    'weather-icon',
  ];

  for (let i = 0; i < temperatureElements.length; i += 1) {
    const div = document.createElement('div');
    div.id = temperatureElements[i];

    if (
      temperatureElements[i] === 'mean-temp' ||
      temperatureElements[i] === 'max-temp' ||
      temperatureElements[i] === 'min-temp'
    ) {
      div.classList.add('temperature');
    }
    article.appendChild(div);
  }

  return article;
}

function createWeatherMetrics() {
  const article = document.createElement('article');
  article.id = 'weather-metrics';

  const weatherElements = [
    'feels-like-temp',
    'humidity',
    'rain-chance',
    'wind-speed',
    'uv',
  ];

  const elementNames = [
    'Feels Like',
    'Humidity',
    'Chance of Precipitation',
    'Wind Speed',
    'UV Index',
  ];

  for (let i = 0; i < weatherElements.length; i += 1) {
    const containerDiv = document.createElement('div');
    const weatherIconDiv = document.createElement('div');
    const weatherElementWrapper = document.createElement('div');
    const weatherElementName = document.createElement('p');
    const weatherElementData = document.createElement('div');

    if (weatherElements[i] === 'feels-like-temp') {
      weatherElementData.classList.add('temperature');
    }

    if (weatherElements[i] === 'wind-speed') {
      weatherElementData.classList.add('speed');
    }

    containerDiv.id = weatherElements[i];

    containerDiv.classList.add('weather-metric');
    weatherIconDiv.classList.add('element-icon', 'visually-hidden');
    weatherElementName.classList.add('element-name', 'visually-hidden');
    weatherElementData.classList.add('element-data');

    weatherIconDiv.innerHTML = createSVG(weatherElements[i]);
    weatherElementName.innerHTML = elementNames[i];

    weatherElementWrapper.appendChild(weatherElementName);
    weatherElementWrapper.appendChild(weatherElementData);
    containerDiv.appendChild(weatherIconDiv);
    containerDiv.appendChild(weatherElementWrapper);
    article.appendChild(containerDiv);
  }
  return article;
}

function createHourlyForecast() {
  const article = document.createElement('article');
  article.id = 'hourly-forecast';

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
  for (let i = 0; i < hours.length; i += 1) {
    const container = document.createElement('div');
    const time = document.createElement('p');
    const meanTemp = document.createElement('h2');
    const hourWeatherIcon = document.createElement('div');
    container.classList.add('hours');
    container.setAttribute('data-hour', hours[i]);
    time.classList.add('hours-time');
    meanTemp.classList.add('hours-temp', 'temperature');
    hourWeatherIcon.classList.add('hours-icon');

    container.appendChild(time);
    container.appendChild(meanTemp);
    container.appendChild(hourWeatherIcon);

    article.appendChild(container);
  }

  return article;
}

function createForecastPageStructure(documentElementId) {
  const container = document.getElementById(documentElementId);
  const metricsWrapper = document.createElement('div');

  const header = createHeader();
  const nav = createDaysNav();
  const section = createForecastSection();
  const tempMetrics = createTemperatureMetrics();
  const weatherMetrics = createWeatherMetrics();
  const hourlyForecast = createHourlyForecast();

  container.innerHTML = '';
  metricsWrapper.id = 'metrics';
  metricsWrapper.appendChild(tempMetrics);
  metricsWrapper.appendChild(weatherMetrics);
  section.appendChild(metricsWrapper);
  section.appendChild(hourlyForecast);

  container.appendChild(header);
  container.appendChild(nav);
  container.appendChild(section);
}

function createErrorMsgPageStructure(documentElementId) {
  const container = document.getElementById(documentElementId);
  const msgWrapper = document.createElement('div');
  const msgHeader = document.createElement('h1');
  const msgDetails = document.createElement('p');

  container.innerHTML = '';

  msgWrapper.id = 'error-message';
  msgHeader.id = 'error-header';
  msgDetails.id = 'error-details';

  msgWrapper.appendChild(msgHeader);
  msgWrapper.appendChild(msgDetails);
  container.appendChild(msgWrapper);
}

export { createForecastPageStructure, createErrorMsgPageStructure };
