import DocumentTypeServices from "../services/documentTypeServices.js";

class DocumentTypeModalForm {
  constructor() {
    if (DocumentTypeModalForm.instance) {
      return DocumentTypeModalForm.instance;
    }

    this.modal = $("#document-type-modal-form");
    this.modalTitle = $("#document-type-modal-form-modalTitle");
    this.form = $("#frm-document-type");
    this.initForm();

    DocumentTypeModalForm.instance = this;
  }

  async new() {
    this.modalTitle.text("Add New DocumentType");
    this.showModal();
  }

  async open(documentTypeId) {
    if (!documentTypeId) {
      alertify.notify("Please make a selection", "warning", 5);
      return;
    }
    try {
      const selectedRecord = await DocumentTypeServices.getSelectedRecord(
        documentTypeId
      );
      this.populateFormFields(selectedRecord);
      this.modalTitle.text("Edit Selected Document Type");
      this.showModal();
    } catch (error) {
      console.error("Error:", error);
    }
  }

  async populateFormFields(selectedRecord) {
    if (selectedRecord) {
      $("#document-type-name", this.form).val(selectedRecord.documentTypeName);
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
      const responseData = await DocumentTypeServices.saveRecord(formData);
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

const instance = new DocumentTypeModalForm();
Object.freeze(instance);

export default instance;
