// // clientServices.js
// clientServices.js
import endpointURL from "../configModule.js";

const getSelectedContactAddress = (contactAddressId) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: endpointURL + "getContactAddress/" + contactAddressId, // Use the provided clientId parameter
      type: "GET",
      data: { id: contactAddressId }, // Use the provided clientId parameter
      success: (response) => {
        resolve(response.data);
      },
      error: (xhr, status, error) => {
        console.error("Error fetching client address data:", error);
        reject(error);
      },
    });
  });
};

const getContactAddresses = async (clientId) => {
  try {
    const response = await fetch(
      `${endpointURL}clients/${clientId}/addresses`,
      {
        method: "GET",
      }
    );
    if (!response.ok) {
      throw new Error(
        `Error fetching client address data: ${response.statusText}`
      );
    }
    const data = await response.json();
    // console.log(data.data);
    return data.data;
  } catch (error) {
    console.error("Error fetching client address data:", error);
    throw error;
  }
};

// const getContactAddresses = (clientId) => {
//   return new Promise((resolve, reject) => {
//     $.ajax({
//       url: `/clients/${clientId}/addresses`, // Use the provided clientId parameter
//       type: "GET",
//       // data: { clientId: clientId }, // Use the provided clientId parameter
//       success: (response) => {
//         resolve(response.data);
//       },
//       error: (xhr, status, error) => {
//         console.error("Error fetching client address data:", error);
//         reject(error);
//       },
//     });
//   });
// };
// const getContactAddresses = (clientId) => {
//   const apiUrl = `/clients/${clientId}/addresses`;
//   // Make an AJAX request to the backend API
//   fetch(apiUrl)
//     .then((response) => {
//       // Check if the response status is OK (200)
//       if (response.ok) {
//         // Parse the JSON response
//         resolve(response.data.json());
//         //return response.data.json();
//       }
//       throw new Error("Network response was not ok.");
//     })
//     .then((data) => {
//       // Handle the data received from the backend
//       console.log("Response data:", data);
//       resolve(response.data.json());
//       // Process the data as needed
//     })
//     .catch((error) => {
//       // Handle any errors that occurred during the fetch
//       reject(error);
//       console.error("Fetch error:", error);
//     });
// };
// Expose the searchClients function for external use
const ContactAddressServices = {
  getContactAddresses,
  getSelectedContactAddress,
};
export default ContactAddressServices;
