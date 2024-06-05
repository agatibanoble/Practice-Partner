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
    this.initForm();
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
    this.modalTitle.text("Add New Employee");
    this.showModal();
  }

  async open(employeeId) {
    if (!employeeId) {
      alertify.notify("Please make a selection", "warning", 5);
      return;
    }
    try {
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
      $("#employee-firstname", this.form).val(selectedRecord.firstName);
      $("#employee-middlename", this.form).val(selectedRecord.middleName);
      $("#employee-lastname", this.form).val(selectedRecord.lastName);
      $("#employee-department", this.form).val(
        selectedRecord.department ? selectedRecord.employeeDepartment._id : ""
      );
      $("#employee-position", this.form).val(
        selectedRecord.position ? selectedRecord.employeePosition._id : ""
      );
      $("#employee-category", this.form).val(
        selectedRecord.employeeCategory
          ? selectedRecord.employeeCategory._id
          : ""
      );
      $("#employee-hire-date", this.form).val(
        selectedRecord.dateOfJoining ? selectedRecord.hireDate : ""
      );
      $("#employee-date-of-birth", this.form).val(
        selectedRecord.dateOfBirth ? selectedRecord.dateOfBirth : ""
      );
      $("#employee-description", this.form).val(
        selectedRecord.dateOfBirth ? selectedRecord.employeeDescription : ""
      );
      $("#_id", this.form).val(selectedRecord._id);
      this.setEditorContent(selectedRecord.employeeDetails);
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
