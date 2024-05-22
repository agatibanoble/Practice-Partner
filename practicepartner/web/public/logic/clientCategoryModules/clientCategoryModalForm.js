import ClientCategoryServices from "../services/clientCategoryServices.js";

class ClientCategoryModalForm {
  constructor() {
    if (ClientCategoryModalForm.instance) {
      return ClientCategoryModalForm.instance;
    }

    // this.clientCategoryId = null;
    this.modal = $("#client-category-modal-form");
    this.modalTitle = $("#client-category-modal-form-modalTitle");
    this.form = $("#frm-client-category");
    this.initForm();

    ClientCategoryModalForm.instance = this;
  }

  async new() {
    // this.clientCategoryId = null; // Clear the ID for a new record
    this.modalTitle.text("Add New Client Category");
    this.showModal();
  }

  async open(clientCategoryId) {
    // this.clientCategoryId = clientCategoryId;
    if (!clientCategoryId) {
      alertify.notify("Please make a selection", "warning", 5);
      return;
    }
    try {
      const selectedRecord = await ClientCategoryServices.getSelectedRecord(
        clientCategoryId
      );
      this.populateFormFields(selectedRecord);
      this.modalTitle.text("Edit Selected Client Category");
      this.showModal();
    } catch (error) {
      console.error("Error:", error);
    }
  }

  async populateFormFields(selectedRecord) {
    if (selectedRecord) {
      $("#client-category-name", this.form).val(
        selectedRecord.clientCategoryName
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
      const responseData = await ClientCategoryServices.saveRecord(formData);
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

const instance = new ClientCategoryModalForm();
Object.freeze(instance);

export default instance;
