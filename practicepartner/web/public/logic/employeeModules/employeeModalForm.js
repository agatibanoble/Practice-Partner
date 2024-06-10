import DepartmentServices from "../services/departmentServices.js";
import employeePositionServices from "../services/employeePositionServices.js";
import EmployeeCategoryServices from "../../logic/services/employeeCategoryServices.js";
import EmployeeServices from "../services/employeeServices.js";
class EmployeeModalForm {
  static instance = null; // Static property to hold the single instance

  constructor() {
    if (EmployeeModalForm.instance) {
      return EmployeeModalForm.instance; // Return the existing instance if it exists
    }

    // Initialize the instance if it doesn't exist
    EmployeeModalForm.instance = this;

    // Your existing code here
    this.modal = $("#employee-modal-form");
    this.modalTitle = $("#employee-modal-form-modalTitle");
    this.form = $("#frm-employee");

    // Attach event handlers
    this.attachEventHandlers();
    this.initFormPromise = this.initForm();
  }

  // Static method to get the instance of the class
  static getInstance() {
    if (!EmployeeModalForm.instance) {
      // Create a new instance if it doesn't exist
      EmployeeModalForm.instance = new EmployeeModalForm();
    }
    return EmployeeModalForm.instance;
  }

  async initForm() {
    let selectElement = $("#employee-department", this.form);
    await DepartmentServices.populateDepartments(selectElement);

    selectElement = $("#employee-position", this.form);
    await employeePositionServices.populateEmployeePositions(selectElement);

    selectElement = $("#employee-category", this.form);
    await EmployeeCategoryServices.populateEmployeeCategories(selectElement);
  }

  async new() {
    await this.initFormPromise; // Ensure the form is initialized before showing the modal
    this.modalTitle.text("Add New Employee");
    this.showModal();
  }

  async open(employeeId) {
    if (!employeeId) {
      alertify.notify("Please make a selection", "warning", 5);
      return;
    }
    try {
      await this.initFormPromise; // Ensure the form is initialized before populating fields
      const selectedRecord = await EmployeeServices.getSelectedEmployee(
        employeeId
      );
      this.populateFormFields(selectedRecord);
      this.modalTitle.text("Edit Selected Employee");
      this.showModal();
    } catch (error) {
      console.error("Error:", error);
    }
  }

  populateFormFields(selectedRecord) {
    if (selectedRecord) {
      $("#employee-number", this.form).val(selectedRecord.employeeNumber);
      $("#employee-firstname", this.form).val(selectedRecord.employeeFirstName);
      $("#employee-middlename", this.form).val(
        selectedRecord.employeeMiddleName
      );
      $("#employee-lastname", this.form).val(selectedRecord.employeeLastName);
      $("#employee-department", this.form).val(
        selectedRecord.department ? selectedRecord.employeeDepartment : ""
      );
      $("#employee-position", this.form).val(
        selectedRecord.employeePosition ? selectedRecord.employeePosition : ""
      );
      $("#employee-status", this.form).val(
        selectedRecord.employeeStatus ? selectedRecord.employeeStatus : ""
      );
      $("#employee-gender", this.form).val(
        selectedRecord.employeeGender ? selectedRecord.employeeGender : ""
      );
      $("#employee-email", this.form).val(
        selectedRecord.employeeEmail ? selectedRecord.employeeEmail : ""
      );
      $("#employee-phone", this.form).val(
        selectedRecord.employeePhone ? selectedRecord.employeePhone : ""
      );
      $("#employee-department", this.form).val(
        selectedRecord.employeeDepartment
          ? selectedRecord.employeeDepartment
          : ""
      );
      $("#employee-category", this.form).val(
        selectedRecord.employeeCategory ? selectedRecord.employeeCategory : ""
      );
      $("#employee-hire-date", this.form).val(
        selectedRecord.employeeHireDate ? selectedRecord.employeeHireDate : ""
      );
      $("#employee-date-of-birth", this.form).val(
        selectedRecord.employeeDateOfBirth
          ? selectedRecord.employeeDateOfBirth
          : ""
      );
      $("#employee-address", this.form).val(
        selectedRecord.employeeAddress ? selectedRecord.employeeAddress : ""
      );
      $("#employee-description", this.form).val(
        selectedRecord.employeeDescription
          ? selectedRecord.employeeDescription
          : ""
      );
      $("#_id", this.form).val(selectedRecord._id);
    }
  }

  showModal() {
    this.modal.css("display", "block").modal("show");
  }

  attachEventHandlers() {
    this.form.on("submit", async (event) => {
      event.preventDefault();
      await this.handleFormSubmission($(event.currentTarget));
    });

    this.modal.on("hidden.bs.modal", () => {
      this.resetForm();
    });
  }

  async handleFormSubmission(form) {
    const formData = new FormData(form[0]);
    try {
      const responseData = await EmployeeServices.saveRecord(formData);
      if (responseData && responseData.success)
        this.populateFormFields(responseData.data);
    } catch (error) {
      console.error("Error saving record:", error);
    }
  }

  resetForm() {
    this.form[0].reset();
    this.form.find("input[type=hidden]").val("");
  }
}

// Export the getInstance() method instead of the class directly
export const getInstance = () => EmployeeModalForm.getInstance();

export default EmployeeModalForm;
