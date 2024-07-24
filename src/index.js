import './style.css';
import { apiCall, dataProcessor } from './components/api-functions';
import {
  addInputEventListener,
  inputSubmitEventListener,
} from './components/event-listeners';

addInputEventListener();
inputSubmitEventListener();

// for testing
window.apiCall = apiCall;
window.dataProcessor = dataProcessor;
