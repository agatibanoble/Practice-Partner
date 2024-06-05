import endpointURL from "../configModule.js";
import removeEmptyFields from "../helperModules/emptyFieldsUtil.js";
import { populateSelectWithOptions } from "../helperModules/populateSelectWithOptions.js";
import ResponseHandlerModule from "../responseHandlerModule.js";

class EmployeePositionServices {
  static async getEmployeePositions() {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: `${endpointURL}employeepositions/get`,
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

  static async getSelectedEmployeePosition(positionId) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: `${endpointURL}employeepositions/get/${positionId}`,
        type: "GET",
        success: (response) => {
          resolve(response.data);
        },
        error: (xhr, status, error) => {
          console.error("Error fetching position data:", error);
          reject(error);
        },
      });
    });
  }

  static async populateEmployeePositions(selectElement) {
    try {
      const response = await fetch(`${endpointURL}employeepositions/get`, {
        method: "GET",
      });
      if (!response.ok) {
        throw new Error(
          `Error fetching employee positions data: ${response.statusText}`
        );
      }
      const employeepositions = await response.json();
      populateSelectWithOptions(
        selectElement,
        employeepositions.data,
        "_id",
        "employeePositionName"
      );
    } catch (error) {
      console.error("Error fetching employeepositions:", error);
    }
  }

  static async saveRecord(formData) {
    return new Promise(async (resolve, reject) => {
      try {
        const data = removeEmptyFields(formData);
        const id = data.get("id");
        const action = id
          ? `employeepositions/update/${id}`
          : "employeepositions/create";
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

  static async deleteRecord(positionId) {
    try {
      const confirmation = await new Promise((resolve) => {
        alertify.confirm(
          "Confirmation",
          "Are you sure you want to delete this position?",
          resolve,
          () => {} // Empty function for Cancel
        );
      });

      if (confirmation) {
        const response = await fetch(
          `${endpointURL}employeepositions/delete/${positionId}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          alertify.notify(
            "Employee Position deleted successfully",
            "success",
            5
          );
          return true;
        } else {
          throw new Error("Error deleting position");
        }
      } else {
        alertify.notify("Deletion canceled by user", "info", 5);
        return false;
      }
    } catch (error) {
      alertify.notify(error.message || "Error deleting position", "warning", 5);
      return false;
    }
  }
}

export default EmployeePositionServices;
