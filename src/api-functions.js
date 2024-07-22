import apiKey from './api-config';

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
          throw new Error('(400) Bad Request');
          break;
        case 401:
          throw new Error('(401) Unauthorised - Invalid API key');
          break;
        case 429:
          throw new Error(
            '(429) Too Many Requests - Number of queries submitted exceeds your daily or monthly API plan limit'
          );
          break;
        case 500:
          throw new Error(
            '(500) Internal Sever Error - Visual Crossing API server error'
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

export default apiCall;
