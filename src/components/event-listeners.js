import { charOnlyValidation, locationSubmit } from './form-functions';
import { apiCall, dataProcessor } from './api-functions';

function addInputEventListener() {
  const locationInput = document.getElementById('location-input');

  locationInput.addEventListener('input', (event) => charOnlyValidation(event));
}

function inputSubmitEventListener() {
  const form = document.getElementById('user-input');

  form.addEventListener('submit', (event) => locationSubmit(event));
}

export { addInputEventListener, inputSubmitEventListener };
