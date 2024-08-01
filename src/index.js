import './style.css';
import { apiCall, dataProcessor } from './components/api-functions';
import {
  addInputEventListener,
  inputSubmitEventListener,
  addToggleEventListeners,
} from './components/event-listeners';

addInputEventListener();
inputSubmitEventListener();
addToggleEventListeners();

// for testing
window.apiCall = apiCall;
window.dataProcessor = dataProcessor;
