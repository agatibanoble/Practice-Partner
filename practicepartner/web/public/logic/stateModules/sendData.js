// senderModule.js

// Define a shared state object
const sharedState = {
    data: null,
  };
  
  // Define a function to update the shared state
  export function updateSharedState(data) {
    sharedState.data = data;
  }
  
  // Export the shared state object for read-only access
  export const SharedState = Object.freeze({
    get data() {
      return sharedState.data;
    },
  });
  