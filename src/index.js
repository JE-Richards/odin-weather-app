import './style.css';
import { apiCall, dataProcessor } from './components/api-functions';
import {
  addInputEventListener,
  inputSubmitEventListener,
} from './components/event-listeners';
import { createForecastPageStructure } from './components/create-page-structure';

addInputEventListener();
inputSubmitEventListener();
createForecastPageStructure('display');

// for testing
window.apiCall = apiCall;
window.dataProcessor = dataProcessor;
