import CaseCategoryServices from "../services/caseCategoryServices.js";

class CaseCategoryModalForm {
  constructor() {
    if (CaseCategoryModalForm.instance) {
      return CaseCategoryModalForm.instance;
    }

    // this.clientCategoryId = null;
    this.modal = $("#case-category-modal-form");
    this.modalTitle = $("#case-category-modal-form-modalTitle");
    this.form = $("#frm-case-category");
    this.initForm();

    CaseCategoryModalForm.instance = this;
  }

  async new() {
    // this.clientCategoryId = null; // Clear the ID for a new record
    this.modalTitle.text("Add New Case Category");
    this.showModal();
  }

  async open(caseCategoryId) {
    // this.clientCategoryId = clientCategoryId;
    if (!caseCategoryId) {
      alertify.notify("Please make a selection", "warning", 5);
      return;
    }
    try {
      const selectedRecord = await CaseCategoryServices.getSelectedRecord(
        caseCategoryId
      );
      this.populateFormFields(selectedRecord);
      this.modalTitle.text("Edit Selected Case Category");
      this.showModal();
    } catch (error) {
      console.error("Error:", error);
    }
  }

  async populateFormFields(selectedRecord) {
    if (selectedRecord) {
      $("#case-category-name", this.form).val(selectedRecord.caseCategoryName);
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
      const responseData = await CaseCategoryServices.saveRecord(formData);
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

const instance = new CaseCategoryModalForm();
Object.freeze(instance);

export default instance;
