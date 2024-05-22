// Courts.js

import endpointURL from "../configModule.js";
import { populateSelectWithOptions } from "../helperModules/populateSelectWithOptions.js";
import ResponseHandlerModule from "../responseHandlerModule.js";
class RegionServices {
  static async getRegions() {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: `${endpointURL}getRegions`,
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
  }

  static async getSelectedRecord(regionId) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: endpointURL + "getRegion/" + regionId, // Use the provided clientId parameter
        type: "GET",
        data: { id: regionId }, // Use the provided clientId parameter
        success: (response) => {
          resolve(response.data);
        },
        error: (xhr, status, error) => {
          console.error("Error fetching client address data:", error);
          reject(error);
        },
      });
    });
  }

  static async getRegionsByCountry(countryId) {
    // Fetch regions from the server based on the countryId
    // Example: return fetch(`/api/regions?countryId=${countryId}`).then(response => response.json());
    try {
      const response = await fetch(
        `${endpointURL}country/${countryId}/regions`
      );
      return await response.json();
    } catch (error) {
      console.error("Error fetching regions:", error);
      throw error;
    }
  }

  static async populateRegions(countryId, regionSelectElement) {
    if (!countryId) return;
    try {
      const response = await fetch(
        `${endpointURL}country/${countryId}/regions`,
        {
          method: "GET",
        }
      );
      if (!response.ok) {
        throw new Error(
          `Error fetching Contact Person data: ${response.statusText}`
        );
      }
      const regions = await response.json();
      populateSelectWithOptions(
        regionSelectElement,
        regions.data,
        "_id",
        "regionName"
      );
    } catch (error) {
      console.error("Error fetching regions:", error);
    }
  }

  static async saveRecord(firmData, action) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(endpointURL + action, {
          method: "POST",
          body: firmData,
        });
        const responseData = await response.json();
        ResponseHandlerModule.handleResponse(responseData);
        resolve(responseData);
      } catch (error) {
        ResponseHandlerModule.handleError(error);
        reject(error);
      }
    });
  }

  static async deleteRecord(regionId) {
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
        const response = await fetch(`${endpointURL}deleteRegion/${regionId}`, {
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
  }
}

export default RegionServices;
