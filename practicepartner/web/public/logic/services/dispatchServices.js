import ResponseHandlerModule from "../responseHandlerModule.js";
import removeEmptyFields from "../helperModules/emptyFieldsUtil.js";
// import endpointURL from "../configModule.js";
// const endpoint = ``;

class DispatchServices {
  static async getDispatch(currentPage = 1, rowsPerPage = 10, searchTerm = "") {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: `${endpointURL}dispatch/get`,
        method: "GET",
        data: { page: currentPage, limit: rowsPerPage, searchTerm: searchTerm },
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
  }

  static searchDispatch(textInputElement) {
    return new Promise((resolve, reject) => {
      $(textInputElement).autocomplete({
        minLength: 1,
        source: function (req, response) {
          const searchTerm = req.term.trim();

          if (!searchTerm) {
            return;
          }

          $.ajax({
            url: `${endpointURL}dispatch/search`,
            method: "GET",
            data: { searchItem: searchTerm },
            dataType: "json",
            success: function (res) {
              if (res.data && res.data.length > 0) {
                const formattedResults = res.data.map((obj) => ({
                  label: `${obj.dispatchNumber}`,
                  value: `${obj.dispatchNumber}`,
                  data: obj,
                }));
                response(formattedResults);
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
              reject(error);
            },
          });
        },
        select: function (event, ui) {
          const selectedData = ui.item.data;
          $(textInputElement).data("selectedData", selectedData);
          //   $("#Dispatch-category").val(selectedData.DispatchCategory || "");
          //   $("#Dispatch-type").val(selectedData.DispatchType || "");
          //   $("#Dispatch-id").val(selectedData._id || "");
          resolve(selectedData);
        },
      });
    });
  }

  static getSelectedDispatch(DispatchId) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: `${endpointURL}dispatch/get/${DispatchId}`,
        type: "GET",
        data: { id: DispatchId },
        success: (response) => {
          resolve(response.data);
        },
        error: (xhr, status, error) => {
          console.error("Error fetching Dispatch data:", error);
          reject(error);
        },
      });
    });
  }

  static async saveRecord(formData) {
    return new Promise(async (resolve, reject) => {
      try {
        const data = removeEmptyFields(formData);
        const id = data.get("id");
        const action = id ? `update/${id}` : "create";
        const response = await fetch(`${endpointURL}dispatch/${action}`, {
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

  static async deleteRecord(DispatchId) {
    try {
      const confirmation = await new Promise((resolve) => {
        alertify.confirm(
          "Confirmation",
          "Are you sure you want to delete this record?",
          resolve,
          () => {}
        );
      });

      if (confirmation) {
        const response = await fetch(
          `${endpointURL}dispatch/delete/${DispatchId}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          alertify.notify("Record deleted successfully", "success", 5);
          return true;
        } else {
          throw new Error("Error deleting record");
        }
      } else {
        alertify.notify("Deletion canceled by user", "info", 5);
        return false;
      }
    } catch (error) {
      alertify.notify(error.message || "Error deleting record", "warning", 5);
      return false;
    }
  }
}

export default DispatchServices;
