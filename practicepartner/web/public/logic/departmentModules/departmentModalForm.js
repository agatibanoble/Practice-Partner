import DepartmentServices from "../services/departmentServices.js";

class DepartmentModalForm {
  constructor() {
    if (DepartmentModalForm.instance) {
      return DepartmentModalForm.instance;
    }

     this.modal = $("#department-modal-form");
    this.modalTitle = $("#department-modal-form-modalTitle");
    this.form = $("#frm-department");
    this.initForm();

    DepartmentModalForm.instance = this;
  }

  async new() {
     this.modalTitle.text("Add New Department");
    this.showModal();
  }

  async open(departmentId) {
     if (!departmentId) {
      alertify.notify("Please make a selection", "warning", 5);
      return;
    }
    try {
      const selectedRecord = await DepartmentServices.getSelectedRecord(
        departmentId
      );
      this.populateFormFields(selectedRecord);
      this.modalTitle.text("Edit Selected Department");
      this.showModal();
    } catch (error) {
      console.error("Error:", error);
    }
  }

  async populateFormFields(selectedRecord) {
    if (selectedRecord) {
      $("#department-name", this.form).val(selectedRecord.departmentName);
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
      const responseData = await DepartmentServices.saveRecord(formData);
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

const instance = new DepartmentModalForm();
Object.freeze(instance);

export default instance;
