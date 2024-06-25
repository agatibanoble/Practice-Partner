class CaseServices {
  static async getCases(currentPage = 1, rowsPerPage = 10) {
    try {
      const response = await $.ajax({
        url: `${endpointURL}cases/get`,
        type: "GET",
        data: { page: currentPage, limit: rowsPerPage },
        contentType: "application/json",
      });

      return response;
    } catch (error) {
      console.error("Error fetching cases:", error);
      throw error;
    }
  }

  static searchCases(textInputElement) {
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
            url: `${endpointURL}cases/search`,
            method: "GET",
            data: { searchItem: searchTerm },
            dataType: "json",
            success: function (res) {
              if (res.data && res.data.length > 0) {
                const formattedResults = res.data.map((obj) => ({
                  label: `${obj.caseNumber}: ${obj.caseTitle}`,
                  value: `${obj.caseNumber}: ${obj.caseTitle}`,
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
          selectedData.caseCategory
            ? $("#case-category").val(
                selectedData.caseCategory.caseCategoryName || ""
              )
            : "";
          selectedData.client
            ? $("#client-name").val(selectedData.clientName || "")
            : "";
          selectedData._id ? $("#case-id").val(selectedData._id || "") : "";
          resolve(selectedData); // Resolve the promise with selected data
        },
      });
    });
  }
  static async getSelectedCase(caseId) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: `${endpointURL}cases/get/${caseId}`, // Use the provided clientId parameter
        type: "GET",
        data: { id: caseId }, // Use the provided clientId parameter
        success: (response) => {
          resolve(response.data);
        },
        error: (xhr, status, error) => {
          console.error("Error fetching case data:", error);
          reject(error);
        },
      });
    });
  }

  static async getClientCases(clientId) {
    try {
      const response = await fetch(`${endpointURL}clients/${clientId}/cases`, {
        method: "GET",
      });
      if (!response.ok) {
        throw new Error(
          `Error fetching Contact Person data: ${response.statusText}`
        );
      }
      const data = await response.json();
      // console.log(data.data);
      return data.data;
    } catch (error) {
      console.error("Error fetching Contact Person data:", error);
      throw error;
    }
  }
  static async saveRecord(formData) {
    return new Promise(async (resolve, reject) => {
      try {
        const data = removeEmptyFields(formData);
        const id = data.get("id");
        const action = id ? `update/${id}` : "create";
        const response = await fetch(`${endpointURL}cases/${action}`, {
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
  static async deleteRecord(caseId) {
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
        const response = await fetch(`${endpointURL}cases/delete/${caseId}`, {
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
export default CaseServices;
