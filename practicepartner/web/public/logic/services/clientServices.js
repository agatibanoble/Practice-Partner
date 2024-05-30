import ResponseHandlerModule from "../responseHandlerModule.js";
import removeEmptyFields from "../helperModules/emptyFieldsUtil.js";
import endpointURL from "../configModule.js";
const endpoint = `${endpointURL}clients/`;
// Function to initialize autocomplete for a given text input element
class ClientServices{
static async getClients  (currentPage = 1, rowsPerPage = 10) {
  
  return new Promise((resolve, reject) => {
      $.ajax({
        url: `${endpoint}get`,
        method: "GET",
        data :{ page: currentPage, limit: rowsPerPage },
        dataType: "json",
        contentType: "application/json",
        success: function (response) {
          resolve(response);
        },
        error: function (xhr, status, error) {
          reject(error);
        },
      });
    });
  
};


static searchClients (textInputElement) {
  return new Promise((resolve, reject) => {
    $(textInputElement).autocomplete({
      minLength: 1,
      source: function (req, response) {
        const searchTerm = req.term.trim(); // Trim leading and trailing whitespace

        if (!searchTerm) {
          return; // Exit if search term is empty
        }

        // Make an AJAX request to fetch autocomplete suggestions
        $.ajax({
          url: `${endpoint}search`,
          method: "GET",
          data: { searchItem: searchTerm },
          dataType: "json",
          success: function (res) {
            if (res.data && res.data.length > 0) {
              const formattedResults = res.data.map((obj) => ({
                label: `${obj.clientNumber}: ${obj.clientName}`,
                value: `${obj.clientNumber}: ${obj.clientName}`,
                data: obj,
              }));
              response(formattedResults); // Provide formatted suggestions to autocomplete
            } else {
              response([
                {
                  label: `No matching record found for "${searchTerm}"`,
                  value: "",
                },
              ]);
            }
          },
          error: function (xhr, status, error) {
            reject(error); // Reject the promise if there's an error in the AJAX call
          },
        });
      },
      select: function (event, ui) {
        const selectedData = ui.item.data;
        console.log(selectedData);
        $(textInputElement).data("selectedData", selectedData); // Store selected data
        $("#client-category").val(
          selectedData.clientCategory.clientCategoryName || ""
        );
        $("#client-type").val(selectedData.clientType || "");
        $("#client-id").val(selectedData._id || "");
        resolve(selectedData); // Resolve the promise with selected data
      },
    });
  });
};

static getSelectedClient (clientId) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: `${endpoint}get/${clientId}`, // Use the provided clientId parameter
      type: "GET",
      data: { id: clientId }, // Use the provided clientId parameter
      success: (response) => {
        resolve(response.data);
      },
      error: (xhr, status, error) => {
        console.error("Error fetching client data:", error);
        reject(error);
      },
    });
  });
};

  static async saveRecord(formData) {
    return new Promise(async (resolve, reject) => {
      try {
        const data = removeEmptyFields(formData);
        const id = data.get("id");
        const action = id
          ? `update/${id}`
          : "create";
        const response = await fetch(endpoint + action, {
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

static async deleteRecord (clientId)  {
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
      const response = await fetch(`${endpoint}delete/${clientId}`, {
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
}
// Expose the searchClients function for external use
// const ClientServices = { getClients, searchClients, getSelectedClient,deleteRecord };
export default ClientServices;
