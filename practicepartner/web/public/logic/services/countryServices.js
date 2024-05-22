// Courts.js

import endpointURL from "../configModule.js";
import ResponseHandlerModule from "../responseHandlerModule.js";
const getCountries = () => {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: `${endpointURL}getCountries`,
      method: "GET",
      dataType: "json",
      success: function (response) {
        resolve(response.data);
      },
      error: function (xhr, status, error) {
        reject(error);
      },
    });
  });
};

const getSelectedRecord = (countryId) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: endpointURL + "getCountry/" + countryId, // Use the provided clientId parameter
      type: "GET",
      data: { id: countryId }, // Use the provided clientId parameter
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

const saveRecord = (countryData, action) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(endpointURL + action, {
        method: "POST",
        body: countryData,
      });
      const responseData = await response.json();
      ResponseHandlerModule.handleResponse(responseData);
      resolve(responseData);
    } catch (error) {
      ResponseHandlerModule.handleError(error);
      reject(error);
    }
  });
};

const deleteRecord = async (counrtyId) => {
  try {
    // Show confirmation prompt
    const confirmation = await new Promise((resolve) => {
      alertify.confirm(
        "Confirmation",
        "Are you sure you want to delete this record?",
        resolve,
        () => {} // Empty function for Cancel
      );
    });

    // Check if user confirmed deletion
    if (confirmation) {
      const response = await fetch(`${endpointURL}deleteCountry/${counrtyId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        alertify.notify("Record deleted successfully", "success", 5);

        return true; // Deletion successful
      } else {
        throw new Error("Error deleting record");
      }
    } else {
      // User clicked Cancel
      alertify.notify("Deletion canceled by user", "info", 5);
      return false; // Deletion canceled
    }
  } catch (error) {
    // Handle error
    alertify.notify(error.message || "Error deleting record", "warning", 5);
    return false; // Deletion failed
  }
};

const CountryServices = {
  getCountries,
  deleteRecord,
  saveRecord,
  getSelectedRecord,
};

export default CountryServices;
