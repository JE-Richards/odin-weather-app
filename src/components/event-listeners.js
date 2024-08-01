import { charOnlyValidation, locationSubmit } from './form-functions';
import { apiCall, dataProcessor } from './api-functions';
import { changeTemperatureScale, changeSpeedScale } from './change-scales';

function addInputEventListener() {
  const locationInput = document.getElementById('location-input');

  locationInput.addEventListener('input', (event) => charOnlyValidation(event));
}

function inputSubmitEventListener() {
  const form = document.getElementById('user-input');

  form.addEventListener('submit', (event) => locationSubmit(event));
}

function addToggleEventListeners() {
  const tempToggle = document.getElementById('temperature-toggle');
  const speedToggle = document.getElementById('speed-toggle');

  tempToggle.addEventListener('change', () => {
    const temperatures = document.querySelectorAll('.temperature');

    temperatures.forEach((element) => {
      const tempValue = element.querySelector('.temperature-value');
      const tempScale = element.querySelector('.temperature-scale');

      const tempValueNumber = Number(tempValue.textContent);
      const converted = changeTemperatureScale(
        tempValueNumber,
        tempScale.textContent
      );

      tempValue.textContent = converted[0];
      tempScale.textContent = converted[1];
    });
  });

  speedToggle.addEventListener('change', () => {
    const speeds = document.querySelectorAll('.speed');

    speeds.forEach((element) => {
      const speedValue = element.querySelector('.speed-value');
      const speedScale = element.querySelector('.speed-scale');

      const speedValueNumber = Number(speedValue.textContent);
      const converted = changeSpeedScale(
        speedValueNumber,
        speedScale.textContent
      );

      speedValue.textContent = converted[0];
      speedScale.textContent = converted[1];
    });
  });
}

export {
  addInputEventListener,
  inputSubmitEventListener,
  addToggleEventListeners,
};
