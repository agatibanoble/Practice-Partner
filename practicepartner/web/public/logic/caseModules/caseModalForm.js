// import endpointURL from "../configModule.js";
import ResponseHandlerModule from "../responseHandlerModule.js";
import CaseCategoryServices from "../../logic/services/caseCategoryServices.js";
import CourtServices from "../../logic/services/courtServices.js";
import ClientServices from "../services/clientServices.js";
import CaseServices from "../services/caseServices.js";
import { populateSelectWithOptions } from "../helperModules/populateSelectWithOptions.js";
import { getEditorInstance } from "../helperModules/CKEditor.js";

class CaseModalForm {
  static instance = null;
  constructor() {
    if (CaseModalForm.instance) {
      return CaseModalForm.instance; // Return the existing instance if it exists
    }
    CaseModalForm.instance = this;
    this.caseId = null;

    this.modal = $("#case-modal-form");
    this.modalTitle = $("#case-modal-form-modalTitle");
    this.form = $("#frm-case");
    this.editorInstance = null;
    this.attachEventHandlers();
    this.initFormPromise = this.initForm();
  }
  static getInstance() {
    if (!CaseModalForm.instance) {
      // Create a new instance if it doesn't exist
      CaseModalForm.instance = new CaseModalForm();
    }
    return CaseModalForm.instance;
  }

  async initForm() {
    await this.initEditor("#frm-case #case-fact-editor");
    await dateTimePicker("#case-start-date", "Y-m-d", "", "", "", true);
    await dateTimePicker("#case-end-date", "Y-m-d", "", "", "", true);
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

  async new() {
    await this.initFormPromise;
    this.modalTitle.text();
    showModal(this.modal, "Add New Case", this.modalTitle);
  }

  async open(caseId) {
    this.caseId = caseId;
    // await this.initEditor("#frm-case #case-fact-editor");
    if (!this.caseId) {
      alertify.notify("Please make a selection", "warning", 5);
      return;
    }
    try {
      await this.initFormPromise;
      const selectedRecord = await CaseServices.getSelectedCase(this.caseId);
      this.populateFormFields(selectedRecord);
      showModal(this.modal, "Edit Selected Case", this.modalTitle);
    } catch (error) {
      console.error("Error:", error);
    }
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
      $("#client-id", this.form).val(selectedRecord.client._id);
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
        selectedRecord.caseStartDate
          ? formatDate(selectedRecord.caseStartDate, "Y-m-d")
          : ""
      );
      $("#case-end-date", this.form).val(
        selectedRecord.caseEndDate
          ? formatDate(selectedRecord.caseEndDate, "Y-m-d")
          : ""
      );
      $("#_id", this.form).val(selectedRecord._id);
      this.setEditorContent(selectedRecord.caseFacts);
    }
  }

  // showModal(modalTitle) {
  //   this.modalTitle.text(modalTitle);
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
      const responseData = await CaseServices.saveRecord(formData);
      if (responseData && responseData.success) {
        this.populateFormFields(responseData.data);
      }
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
  updateFormFields(selectedClient) {
    $("#client-category", this.form).val(
      selectedClient.clientCategory?.clientCategoryName || ""
    );
    $("#client-type", this.form).val(selectedClient.clientType);
    $("#client-id", this.form).val(selectedClient._id);
  }
}
export const getInstance = () => CaseModalForm.getInstance();
export default CaseModalForm;
