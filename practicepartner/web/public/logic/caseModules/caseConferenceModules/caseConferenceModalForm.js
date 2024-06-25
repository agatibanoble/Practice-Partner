import { populateSelectWithOptions } from "../../helperModules/populateSelectWithOptions.js";
import CaseServices from "../../services/caseServices.js";
import CaseConferenceServices from "../../services/caseConferenceServices.js";
import ContactPersonServices from "../../services/contactPersonServices.js";
import { getEditorInstance } from "../../helperModules/CKEditor.js";

class ConferenceModalForm {
  static instance = null;
  constructor() {
    if (ConferenceModalForm.instance) {
      return ConferenceModalForm.instance; // Return the existing instance if it exists
    }
    ConferenceModalForm.instance = this;
    this.conferenceId = null;
    this.selectedCase = null;
    this.modal = $("#case-conference-modal-form");
    this.modalTitle = $("#case-conference-form-modalTitle");
    this.form = $("#frm-case-conference");
    this.editorInstance = null;
    this.attachEventHandlers();
    this.initFormPromise = this.initForm();
  }
  static getInstance() {
    if (!ConferenceModalForm.instance) {
      // Create a new instance if it doesn't exist
      ConferenceModalForm.instance = new ConferenceModalForm();
    }
    return ConferenceModalForm.instance;
  }
  async initForm() {
    try {
      // await this.initEditor("#frm-case-conference #case-conference-note");
      this.editorInstance = await getEditorInstance(
        "#frm-case-conference #case-conference-note"
      );
      await dateTimePicker("#case-conference-date", "Y-m-d", "", "", "", true);
      await dateTimePicker("#case-start-time", "Y-m-d", "", "", "", true);
      await dateTimePicker("#case-end-time", "Y-m-d", "", "", "", true);
      this.attachEventHandlers();
    } catch (error) {
      console.error("Error initializing form:", error);
    }
  }

  async new(caseId = null) {
    try {
      this.caseId = caseId;
      // this.editorInstance = await getEditorInstance(
      //   "#frm-case-conference #case-conference-note-editor"
      // );

      // const selectedCase = await CaseServices.getSelectedCase(caseId);
      // $("#client-number").val(selectedCase.client.clientNumber);

      showModal(this.modal, "Add New Conference", this.modalTitle);
    } catch (error) {
      console.error("Error creating new conference:", error);
    }
  }

  async open() {
    try {
      if (this.conferenceId) {
        const record = await CaseConferenceServices.getSelectedConference(
          this.conferenceId
        );
        if (record) {
          this.populateFormFields(record);
          showModal(this.modal, "Edit Selected Conference", this.modalTitle);
        } else {
          throw new Error("Failed to fetch conference");
        }
      } else {
        alertify.notify("Please make a selection", "warning", 5);
      }
    } catch (error) {
      console.error("Error opening conference:", error);
      alertify.notify("There was an error", "danger", 5);
    }
  }

  populateFormFields(record) {
    $("#client-number", this.form).val(record.clientNumber);
    $("#client-name", this.form).val(record.clientName);
    $("#client-id", this.form).val(record._id);
    $("#_id", this.form).val(record._id);
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

  async handleFormSubmission(form) {
    const formData = new FormData(form[0]);
    try {
      const responseData = await CaseConferenceServices.saveRecord(formData);
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
}
export const getInstance = () => ConferenceModalForm.getInstance();
export default ConferenceModalForm;
