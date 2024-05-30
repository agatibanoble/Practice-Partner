import ClientCategoryServices from "../services/clientCategoryServices.js";
import ClientServices from "../services/clientServices.js";
import { populateSelectWithOptions } from "../helperModules/populateSelectWithOptions.js";
import { getEditorInstance } from "../helperModules/CKEditor.js";


class ClientModalForm {
  static modal = $("#client-modal-form");
  static modalTitle = $("#modalTitle");
  static form = $("#frm-client");
  static editorInstance = null;

  static async init() {
    const clientCategories = await ClientCategoryServices.getClientCategories();
    const selectElement = $("#client-category", this.form);

    populateSelectWithOptions(selectElement, clientCategories, "_id", "clientCategoryName");
    await this.initEditor("#frm-client #client-description-editor");
    this.attachEventHandlers();
  }

  static async new() {
    await this.initEditor("#frm-client #client-description-editor");
    this.modalTitle.text("Add New Client");
    this.showModal();
  }

  static async open(clientId) {
    await this.initEditor("#frm-client #client-description-editor");
    if (!clientId) {
      alertify.notify("Please make a selection", "warning", 5);
      return;
    }
    try {
      const selectedRecord = await ClientServices.getSelectedClient(clientId);
      this.populateFormFields(selectedRecord);
      this.modalTitle.text("Edit Selected Client");
      this.showModal();
    } catch (error) {
      console.error("Error:", error);
    }
  }

  static async initEditor(selector) {
    this.editorInstance = await getEditorInstance(selector);
  }

  static async populateFormFields(selectedRecord) {
    if (selectedRecord) {
      const {
        clientNumber,
        clientName,
        clientCategory,
        clientType,
        clientReferralType,
        _id,
        clientDescription,
      } = selectedRecord;
      $("#client-number", this.form).val(clientNumber);
      $("#client-name", this.form).val(clientName);
      $("#client-category", this.form).val(clientCategory?._id || "");
      $("#client-type", this.form).val(clientType);
      $("#client-referral-type", this.form).val(clientReferralType);
      $("#_id", this.form).val(_id);
      this.setEditorContent(clientDescription);
    }
  }

  static setEditorContent(content) {
    if (this.editorInstance?.setData) {
      this.editorInstance.setData(content || "");
    } else {
      console.error("CKEditor instance is not valid or not created yet.");
    }
  }

  static showModal() {
    this.modal.css("display", "block").modal("show");
  }

  static attachEventHandlers() {
    this.form.on("submit", async (event) => {
      event.preventDefault();
      await this.handleFormSubmission($(event.currentTarget));
    });

    this.modal.on("hidden.bs.modal", () => {
      this.resetForm();
    });
  }

  static async handleFormSubmission(form) {
    const formData = new FormData(form[0]);
    try {
      const responseData = await ClientServices.saveRecord(formData);
      if (responseData && responseData.success)
        this.populateFormFields(responseData.data);
    } catch (error) {
      console.error("Error saving record:", error);
    }
  }


  static resetForm() {
    this.form[0].reset();
    this.form.find("input[type=hidden]").val("");
    this.setEditorContent("");
  }
}

export default ClientModalForm;

// Initialize the form when the script is loaded
$(document).ready(() => {
  ClientModalForm.init();
});
