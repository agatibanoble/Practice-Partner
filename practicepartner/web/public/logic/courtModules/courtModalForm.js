import CourtServices from "../services/courtServices.js";

class CourtModalForm {
  constructor() {
    if (CourtModalForm.instance) {
      return CourtModalForm.instance;
    }

    // this.clientCategoryId = null;
    this.modal = $("#court-modal-form");
    this.modalTitle = $("#court-modal-form-modalTitle");
    this.form = $("#frm-court");
    this.initForm();

    CourtModalForm.instance = this;
  }

  async new() {
    // this.clientCategoryId = null; // Clear the ID for a new record
    this.modalTitle.text("Add New Court");
    this.showModal();
  }

  async open(courtId) {
    // this.clientCategoryId = clientCategoryId;
    if (!courtId) {
      alertify.notify("Please make a selection", "warning", 5);
      return;
    }
    try {
      const selectedRecord = await CourtServices.getSelectedRecord(courtId);
      if (selectedRecord) this.populateFormFields(selectedRecord);
      this.modalTitle.text("Edit Selected Court");
      this.showModal();
    } catch (error) {
      console.error("Error:", error);
    }
  }

  async populateFormFields(selectedRecord) {
    if (selectedRecord) {
      $("#court-name", this.form).val(selectedRecord.courtName);
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
      const responseData = await CourtServices.saveRecord(formData);
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

const instance = new CourtModalForm();
Object.freeze(instance);

export default instance;
