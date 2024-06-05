import endpointURL from "../configModule.js";
import removeEmptyFields from "../helperModules/emptyFieldsUtil.js";
import { populateSelectWithOptions } from "../helperModules/populateSelectWithOptions.js";
import ResponseHandlerModule from "../responseHandlerModule.js";

class EmployeeCategoryServices {
  static async getEmployeeCategories() {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: `${endpointURL}employeecategories/get`,
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

  static async getSelectedRecord(employeeCategoryId) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: `${endpointURL}employeecategories/get/${employeeCategoryId}`,
        type: "GET",
        success: (response) => {
          resolve(response.data);
        },
        error: (xhr, status, error) => {
          console.error("Error fetching employee category data:", error);
          reject(error);
        },
      });
    });
  }

  static async populateEmployeeCategories(selectElement) {
    try {
      const response = await fetch(`${endpointURL}employeecategories/get`, {
        method: "GET",
      });
      if (!response.ok) {
        throw new Error(
          `Error fetching employee categories data: ${response.statusText}`
        );
      }
      const employeeCategories = await response.json();
      populateSelectWithOptions(
        selectElement,
        employeeCategories.data,
        "_id",
        "employeeCategoryName"
      );
    } catch (error) {
      console.error("Error fetching employee categories:", error);
    }
  }

  static async saveRecord(formData) {
    return new Promise(async (resolve, reject) => {
      try {
        const data = removeEmptyFields(formData);
        const id = data.get("id");
        const action = id
          ? `employeecategories/update/${id}`
          : "employeecategories/create";
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

  static async deleteRecord(employeeCategoryId) {
    try {
      const confirmation = await new Promise((resolve) => {
        alertify.confirm(
          "Confirmation",
          "Are you sure you want to delete this record?",
          resolve,
          () => {} // Empty function for Cancel
        );
      });

      if (confirmation) {
        const response = await fetch(
          `${endpointURL}employeecategories/delete/${employeeCategoryId}`,
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

export default EmployeeCategoryServices;
