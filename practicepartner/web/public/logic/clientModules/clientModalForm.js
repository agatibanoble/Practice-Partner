import endpointURL from "../configModule.js";
import ResponseHandlerModule from "../responseHandlerModule.js";
import ClientCategoryServices from "../services/clientCategoryServices.js";
import ClientServices from "../services/clientServices.js";
import { populateSelectWithOptions } from "../helperModules/populateSelectWithOptions.js";
import { getEditorInstance } from "../helperModules/CKEditor.js";
import removeEmptyFields from "../helperModules/emptyFieldsUtil.js";

class ClientModalForm {
  constructor(clientId = null) {
    this.clientId = clientId;
    this.editorInstance = null;
    this.modal = $("#client-modal-form");
    this.modalTitle = $("#modalTitle");
    this.form = $("#frm-client");
    this.initForm();
  }

  async new() {
    await this.initEditor("#frm-client #client-description-editor");
    this.modalTitle.text("Add New Client");
    this.showModal();
  }

  async open() {
    await this.initEditor("#frm-client #client-description-editor");
    if (!this.clientId) {
      alertify.notify("Please make a selection", "warning", 5);
      return;
    }
    try {
      const selectedRecord = await ClientServices.getSelectedClient(
        this.clientId
      );
      this.populateFormFields(selectedRecord);
      this.modalTitle.text("Edit Selected Client");
      this.showModal();
    } catch (error) {
      console.error("Error:", error);
    }
  }

  async initEditor(selector) {
    this.editorInstance = await getEditorInstance(selector);
  }

  async populateFormFields(selectedRecord) {
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

  setEditorContent(content) {
    if (this.editorInstance?.setData) {
      this.editorInstance.setData(content || "");
    } else {
      console.error("CKEditor instance is not valid or not created yet.");
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

  async initForm() {
    const clientCategories = await ClientCategoryServices.getClientCategories();
    const selectElement = $("#client-category", this.form);

    populateSelectWithOptions(
      selectElement,
      clientCategories,
      "_id",
      "clientCategoryName"
    );

    await this.initEditor("#frm-client #client-description-editor");
    this.attachEventHandlers();
  }

  async handleFormSubmission(form) {
    const formData = new FormData(form[0]);
    const data = removeEmptyFields(formData);
    const id = formData.get("id");
    const action = id ? `updateClient/${id}` : "createClient";
    console.log(action);
    try {
      const response = await fetch(endpointURL + action, {
        method: "POST",
        body: data,
      });
      const responseData = await response.json();
      ResponseHandlerModule.handleResponse(responseData);
    } catch (error) {
      ResponseHandlerModule.handleError(error);
    }
  }

  resetForm() {
    this.form[0].reset();
    this.form.find("input[type=hidden]").val("");
    this.setEditorContent("");
    // this.editorInstance?.destroy();
    this.editorInstance?.setData("");
  }
}

export default ClientModalForm;
