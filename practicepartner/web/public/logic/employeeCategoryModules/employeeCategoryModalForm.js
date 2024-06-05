import EmployeeCategoryServices from "../services/employeeCategoryServices.js";

class EmployeeCategoryModalForm {
  constructor() {
    if (EmployeeCategoryModalForm.instance) {
      return EmployeeCategoryModalForm.instance;
    }

    // this.employeeCategoryId = null;
    this.modal = $("#employee-category-modal-form");
    this.modalTitle = $("#employee-category-modal-form-modalTitle");
    this.form = $("#frm-employee-category");
    this.initForm();

    EmployeeCategoryModalForm.instance = this;
  }

  async new() {
    // this.employeeCategoryId = null; // Clear the ID for a new record
    this.modalTitle.text("Add New Employee Category");
    this.showModal();
  }

  async open(employeeCategoryId) {
    // this.employeeCategoryId = employeeCategoryId;
    if (!employeeCategoryId) {
      alertify.notify("Please make a selection", "warning", 5);
      return;
    }
    try {
      const selectedRecord = await EmployeeCategoryServices.getSelectedRecord(
        employeeCategoryId
      );
      this.populateFormFields(selectedRecord);
      this.modalTitle.text("Edit Selected Employee Category");
      this.showModal();
    } catch (error) {
      console.error("Error:", error);
    }
  }

  async populateFormFields(selectedRecord) {
    if (selectedRecord) {
      $("#employee-category-name", this.form).val(
        selectedRecord.employeeCategoryName
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
      const responseData = await EmployeeCategoryServices.saveRecord(formData);
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

const instance = new EmployeeCategoryModalForm();
Object.freeze(instance);

export default instance;
