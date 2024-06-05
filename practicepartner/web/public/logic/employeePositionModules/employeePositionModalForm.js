import EmployeePositionServices from "../services/employeePositionServices.js";

class EmployeePositionModalForm {
  constructor() {
    if (EmployeePositionModalForm.instance) {
      return EmployeePositionModalForm.instance;
    }

    // this.employeePositionId = null;
    this.modal = $("#employee-position-modal-form");
    this.modalTitle = $("#employee-position-modal-form-modalTitle");
    this.form = $("#frm-employee-position");
    this.initForm();

    EmployeePositionModalForm.instance = this;
  }

  async new() {
    // this.employeePositionId = null; // Clear the ID for a new record
    this.modalTitle.text("Add New Employee Position");
    this.showModal();
  }

  async open(employeePositionId) {
    // this.employeePositionId = employeePositionId;
    if (!employeePositionId) {
      alertify.notify("Please make a selection", "warning", 5);
      return;
    }
    try {
      const selectedRecord = await EmployeePositionServices.getSelectedRecord(
        employeePositionId
      );
      this.populateFormFields(selectedRecord);
      this.modalTitle.text("Edit Selected Employee Position");
      this.showModal();
    } catch (error) {
      console.error("Error:", error);
    }
  }

  async populateFormFields(selectedRecord) {
    if (selectedRecord) {
      $("#employee-position-name", this.form).val(
        selectedRecord.employeePositionName
      );
      $("#_id", this.form).val(selectedRecord._id);
    }
  }

  showModal() {
    this.modal.css("display", "block").modal("show");
  }

  hideModal() {
    this.modal.css("display", "none").modal("hide");
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

  async initForm() {
    this.attachEventHandlers();
  }

  async handleFormSubmission(form) {
    const formData = new FormData(form[0]);
    try {
      const responseData = await EmployeePositionServices.saveRecord(formData);
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

const instance = new EmployeePositionModalForm();
Object.freeze(instance);

export default instance;
