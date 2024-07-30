import apiKey from './api-config';
import { createErrorMsgPageStructure } from './create-page-structure';
import { displayErrorMessage } from './display-controller';

const key = apiKey;

async function apiCall(location) {
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=${key}&contentType=json`,
      { mode: 'cors' }
    );

    if (response.ok) {
      const jsonData = await response.json();
      return jsonData;
    } else {
      switch (response.status) {
        case 400:
          createErrorMsgPageStructure('display');
          displayErrorMessage(
            '400 - Bad Request',
            'The location submitted is invalid. Please ensure you have entered the location correctly and try submitting again.'
          );
          break;
        case 401:
          createErrorMsgPageStructure('display');
          displayErrorMessage(
            '401 - Unauthorised',
            'There is a problem with the API key, account, or subscription. Please ensure you have used a valid API key before trying again.'
          );
          break;
        case 404:
          createErrorMsgPageStructure('display');
          displayErrorMessage(
            '404 - Not Found',
            'The request cannot be matched to any valid API request endpoint structure.'
          );
          break;
        case 429:
          createErrorMsgPageStructure('display');
          displayErrorMessage(
            '429 - Too Many Requests',
            'The number of requests submitted exceeds your daily, or monthly, API plan limit.'
          );
          break;
        case 500:
          createErrorMsgPageStructure('display');
          displayErrorMessage(
            '500 - Internal Sever Error',
            'There is an error with the Visual Crossing API server. Please try again later.'
          );
          break;
        default:
          throw new Error(response.status);
      }
    }
  } catch (error) {
    console.error('Fetch', error);
  }
}

function dataProcessor(json) {
  const days = json.days.slice(0, 7);

  const variables = [
    'datetime',
    'tempmax',
    'tempmin',
    'temp',
    'feelslike',
    'humidity',
    'precipprob',
    'preciptype',
    'windspeed',
    'cloudcover',
    'uvindex',
    'sunrise',
    'sunset',
    'conditions',
    'icon',
    'hours',
  ];
  const dataArray = [];
  const weatherData = [];
  const resolvedLocation = json.resolvedAddress;

  // object -> array of key-value pairs -> filter by key for key in variables -> convert back to object -> push to array
  days.forEach((element) => {
    let subset = Object.fromEntries(
      Object.entries(element).filter(([key]) => variables.includes(key))
    );

    weatherData.push(subset);
  });

  dataArray.push(resolvedLocation, weatherData);
  return dataArray;
}

export { apiCall, dataProcessor };
