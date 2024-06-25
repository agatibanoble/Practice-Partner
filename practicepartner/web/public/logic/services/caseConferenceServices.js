class CaseConferenceServices {
  static async getSelectedCaseConferences(
    caseId,
    currentPage = 1,
    rowsPerPage = 10
  ) {
    try {
      const response = await $.ajax({
        url: `${endpointURL}caseconferences/case/${caseId}/get`,
        type: "GET",
        data: { page: currentPage, limit: rowsPerPage },
        contentType: "application/json",
      });

      return response;
    } catch (error) {
      console.error("Error fetching caseconferences:", error);
      throw error;
    }
  }

  static async getCaseConferences(currentPage = 1, rowsPerPage = 10) {
    try {
      const response = await $.ajax({
        url: `${endpointURL}caseconferences/get`,
        type: "GET",
        data: { page: currentPage, limit: rowsPerPage },
        contentType: "application/json",
      });

      return response;
    } catch (error) {
      console.error("Error fetching caseconferences:", error);
      throw error;
    }
  }

  static searchCaseConferences(textInputElement) {
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
            url: `${endpointURL}caseconferences/search`,
            method: "GET",
            data: { searchItem: searchTerm },
            dataType: "json",
            success: function (res) {
              if (res.data && res.data.length > 0) {
                const formattedResults = res.data.map((obj) => ({
                  label: `${obj.caseConferenceTopic}`,
                  value: `${obj.caseConferenceTopic}`,
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
          resolve(selectedData); // Resolve the promise with selected data
        },
      });
    });
  }
  static async getSelectedCaseConference(caseId) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: `${endpointURL}caseconferences/get/${caseId}`, // Use the provided clientId parameter
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

  static async getClientCaseConferences(clientId) {
    try {
      const response = await fetch(
        `${endpointURL}clients/${clientId}/caseconferences`,
        {
          method: "GET",
        }
      );
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
        const response = await fetch(
          `${endpointURL}caseconferences/${action}`,
          {
            method: "POST",
            body: data,
          }
        );
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
        const response = await fetch(
          `${endpointURL}caseconferences/delete/${caseId}`,
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
export default CaseConferenceServices;
