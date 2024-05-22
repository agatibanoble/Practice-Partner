import endpointURL from "../configModule.js";
import ResponseHandlerModule from "../responseHandlerModule.js";
import CaseCategoryServices from "../../logic/services/caseCategoryServices.js";
import CourtServices from "../../logic/services/courtServices.js";
import ClientServices from "../services/clientServices.js";
import CaseServices from "../services/caseServices.js";
import { populateSelectWithOptions } from "../helperModules/populateSelectWithOptions.js";
import { getEditorInstance } from "../helperModules/CKEditor.js";
import removeEmptyFields from "../helperModules/emptyFieldsUtil.js";

class CaseModalForm {
  constructor(caseId = null) {
    this.caseId = caseId;
    this.editorInstance = null;
    this.modal = $("#case-modal-form");
    this.modalTitle = $("#case-modal-form-modalTitle");
    this.form = $("#frm-case");
    this.initForm();
  }

  async new() {
    this.modalTitle.text("Add New Case");
    this.showModal();
  }

  async open() {
    if (!this.caseId) {
      alertify.notify("Please make a selection", "warning", 5);
      return;
    }
    try {
      const selectedRecord = await CaseServices.getSelectedCase(this.caseId);
      this.populateFormFields(selectedRecord);
      this.modalTitle.text("Edit Selected Case");
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
      $("#client-number", this.form).val(
        selectedRecord.client.clientNumber +
          ": " +
          selectedRecord.client.clientName
      );
      $("#client-category", this.form).val(
        selectedRecord.client.clientCategory
          ? selectedRecord.client.clientCategory.clientCategoryName
          : ""
      );
      $("#client-type", this.form).val(selectedRecord.client.clientType);
      $("#client-id", this.form).val(selectedRecord.client.id);
      $("#case-number", this.form).val(selectedRecord.caseNumber);
      $("#folio-number", this.form).val(selectedRecord.folioNumber);
      $("#case-title", this.form).val(selectedRecord.caseTitle);
      $("#case-category", this.form).val(
        selectedRecord.caseCategory ? selectedRecord.caseCategory : ""
      );

      $("#court", this.form).val(
        selectedRecord.court ? selectedRecord.court._id : ""
      );
      $("#case-start-date", this.form).val(
        selectedRecord.caseStartDate ? selectedRecord.caseStartDate : ""
      );
      $("#case-end-date", this.form).val(
        selectedRecord.caseEndDate ? selectedRecord.caseEndDate : ""
      );
      $("#_id", this.form).val(selectedRecord._id);
      this.setEditorContent(selectedRecord.caseFacts);
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
    const self = this; // Store reference to 'this' for proper context inside event handlers

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

  updateFormFields(selectedClient) {
    $("#client-category", this.form).val(
      selectedClient.clientCategory?.clientCategoryName || ""
    );
    $("#client-type", this.form).val(selectedClient.clientType);
    $("#client-id", this.form).val(selectedClient._id);
  }

  async initForm() {
    await this.initEditor("#frm-case #case-fact-editor");
    const caseCategories = await CaseCategoryServices.getCaseCategories();
    let selectElement = $("#case-category", this.form);
    populateSelectWithOptions(
      selectElement,
      caseCategories,
      "_id",
      "caseCategoryName"
    );

    const courts = await CourtServices.getCourts();
    selectElement = $("#court", this.form);
    populateSelectWithOptions(selectElement, courts, "_id", "courtName");

    this.attachEventHandlers();
  }

  async handleFormSubmission(form) {
    const formData = new FormData(form[0]);
    const data = removeEmptyFields(formData);
    const id = formData.get("_id");
    const action = id ? `updateCase/${id}` : "createCase";

    try {
      const response = await fetch(endpointURL + action, {
        method: "POST",
        body: data,
      });
      const responseData = await response.json();
      console.log(responseData);
      this.populateFormFields(responseData.data.case);
      ResponseHandlerModule.handleResponse(responseData);
    } catch (error) {
      ResponseHandlerModule.handleError(error);
    }
  }

  resetForm() {
    this.form[0].reset();
    this.form.find("input[type=hidden]").val("");
    this.setEditorContent("");
    this.editorInstance?.setData("");
  }
}

export default CaseModalForm;
