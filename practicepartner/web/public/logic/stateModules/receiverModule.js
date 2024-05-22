// Import the global state manager functions
import { subscribeToGlobalState } from './globalStateManager.js';

// Listen for changes in the global state
export function receiveData(callback) {
  // Subscribe to global state changes
  subscribeToGlobalState(callback);
}
