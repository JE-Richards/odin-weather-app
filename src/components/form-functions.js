import { apiCall, dataProcessor } from './api-functions';
import { createForecastPageStructure } from './create-page-structure';
import { displayForecastData } from './display-controller';

function charOnlyValidation(event) {
  const input = event.target;
  const value = input.value;
  const isValid = /^[A-Za-z]*$/.test(value);

  if (!isValid) {
    input.value = value.replace(/[^A-Za-z]/g, '');
  }
}

async function locationSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const location = form.elements['location-input'].value;
  const json = await apiCall(location);
  const data = dataProcessor(json);
  console.log(data);

  createForecastPageStructure('display');
  displayForecastData(data, 0);
}

export { charOnlyValidation, locationSubmit };
