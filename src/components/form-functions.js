import { apiCall, dataProcessor } from './api-functions';

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
}

export { charOnlyValidation, locationSubmit };
