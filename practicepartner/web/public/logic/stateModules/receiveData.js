// receiverModule.js

// Import the SharedState object from senderModule.js
import { SharedState } from './senderModule.js';

// Listen for changes in the shared state
export function listenToSharedStateChanges(callback) {
  // Call the callback function whenever the shared state data changes
  Object.defineProperty(SharedState, 'data', {
    get() {
      return SharedState.data;
    },
    set(newValue) {
      callback(newValue);
    },
  });
}
