import ClientCategoryServices from "../services/clientCategoryServices.js";
import ClientServices from "../services/clientServices.js";
import { populateSelectWithOptions } from "../helperModules/populateSelectWithOptions.js";
import { getEditorInstance } from "../helperModules/CKEditor.js";

class ClientModalForm {
  static instance = null; // Static property to hold the single instance
  constructor() {
    if (ClientModalForm.instance) {
      return ClientModalForm.instance; // Return the existing instance if it exists
    }

    // Initialize the instance if it doesn't exist
    ClientModalForm.instance = this;

    this.modal = $("#client-modal-form");
    this.modalTitle = $("#modalTitle");
    this.form = $("#frm-client");
    this.editorInstance = null;
    this.attachEventHandlers();
    this.initFormPromise = this.initForm();
  }
  // Static method to get the instance of the class
  static getInstance() {
    if (!ClientModalForm.instance) {
      // Create a new instance if it doesn't exist
      ClientModalForm.instance = new ClientModalForm();
    }
    return ClientModalForm.instance;
  }
  async initForm() {
    const selectElement = $("#client-category", this.form);
    await ClientCategoryServices.populateClientCategories(selectElement);

    await this.initEditor("#frm-client #client-description-editor");
  }

  async new() {
    await this.initFormPromise;
    await this.initEditor("#frm-client #client-description-editor");
    this.modalTitle.text("Add New Client");
    // this.showModal();
    showModal(this.modal, "Add New Client", this.modalTitle);
  }

  async open(clientId) {
    await this.initEditor("#frm-client #client-description-editor");
    if (!clientId) {
      alertify.notify("Please make a selection", "warning", 5);
      return;
    }
    try {
      await this.initFormPromise;
      const selectedRecord = await ClientServices.getSelectedClient(clientId);
      this.populateFormFields(selectedRecord);
      // this.modalTitle.text("Edit Selected Client");
      // this.showModal();
      showModal(this.modal, "Edit Selected Client", this.modalTitle);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  populateFormFields(selectedRecord) {
    if (selectedRecord) {
      $("#client-number", this.form).val(selectedRecord.clientNumber);
      $("#client-name", this.form).val(selectedRecord.clientName);
      $("#client-category", this.form).val(selectedRecord.clientCategory._id);
      $("#client-type", this.form).val(selectedRecord.clientType);
      $("#client-referral-type", this.form).val(
        selectedRecord.clientReferralType
      );
      $("#_id", this.form).val(selectedRecord._id);
      this.setEditorContent(selectedRecord.clientDescription);
    }
  }

  // showModal() {
  //   this.modal.css("display", "block").modal("show");
  // }

  attachEventHandlers() {
    this.form.on("submit", async (event) => {
      event.preventDefault();
      await this.handleFormSubmission($(event.currentTarget));
    });
    $("#client-number").on("focus", () => {
      ClientServices.searchClients($("#client-number"));
    });

    this.modal.on("hidden.bs.modal", () => {
      this.resetForm();
    });
  }

  async handleFormSubmission(form) {
    const formData = new FormData(form[0]);
    try {
      const responseData = await ClientServices.saveRecord(formData);
      if (responseData && responseData.success)
        this.populateFormFields(responseData.data);
    } catch (error) {
      console.error("Error saving record:", error);
    }
  }

  resetForm() {
    this.form[0].reset();
    this.form.find("input[type=hidden]").val("");
    this.setEditorContent("");
  }

  setEditorContent(content) {
    if (this.editorInstance?.setData) {
      this.editorInstance.setData(content || "");
    } else {
      console.error("CKEditor instance is not valid or not created yet.");
    }
  }
  async initEditor(selector) {
    this.editorInstance = await getEditorInstance(selector);
  }
} // Export the getInstance() method instead of the class directly
export const getInstance = () => ClientModalForm.getInstance();

export default ClientModalForm;
