// Courts.js

import endpointURL from "../configModule.js";
import removeEmptyFields from "../helperModules/emptyFieldsUtil.js";
import { populateSelectWithOptions } from "../helperModules/populateSelectWithOptions.js";
import ResponseHandlerModule from "../responseHandlerModule.js";
class ClientCategoryServices {
  static async getClientCategories() {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: `${endpointURL}clientcategories/get`,
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

  static async getSelectedRecord(clientCategoryId) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: endpointURL + "clientcategories/get/" + clientCategoryId, // Use the provided clientId parameter
        type: "GET",
        // data: { id: clientCategoryId }, // Use the provided clientId parameter
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

  static async populateClientCategories(selectElement) {
    if (!countryId) return;
    try {
      const response = await fetch(`${endpointURL}clientcategories/get`, {
        method: "GET",
      });
      if (!response.ok) {
        throw new Error(
          `Error fetching Contact Person data: ${response.statusText}`
        );
      }
      const clientCategories = await response.json();
      populateSelectWithOptions(
        selectElement,
        clientCategories.data,
        "_id",
        "clientCategoryName"
      );
    } catch (error) {
      console.error("Error fetching regions:", error);
    }
  }

  static async saveRecord(formData) {
    return new Promise(async (resolve, reject) => {
      try {
        const data = removeEmptyFields(formData);
        const id = data.get("id");
        const action = id
          ? `clientcategories/update/${id}`
          : "clientcategories/create";
        const response = await fetch(endpointURL + action, {
          method: "POST",
          body: data,
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

  static async deleteRecord(clientCategoryId) {
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
        const response = await fetch(
          `${endpointURL}clientcategories/delete/${clientCategoryId}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

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

export default ClientCategoryServices;
