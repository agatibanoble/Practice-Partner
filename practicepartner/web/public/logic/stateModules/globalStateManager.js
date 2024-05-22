// Define a global state manager object
const globalState = {
    data: null,
    subscribers: [],
  };
  
  // Function to update the global state and notify subscribers
  export function sendData(data) {
    globalState.data = data;
    // Notify all subscribers about the state change
    globalState.subscribers.forEach(subscriber => subscriber(data));
  }
  
  // Function to subscribe to global state changes
  export function subscribeToGlobalState(callback) {
    // Add the callback function to the list of subscribers
    globalState.subscribers.push(callback);
  }
  