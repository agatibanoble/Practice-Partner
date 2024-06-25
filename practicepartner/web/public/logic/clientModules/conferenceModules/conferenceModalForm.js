import endpointURL from "../../configModule.js";
import removeEmptyFields from "../../helperModules/emptyFieldsUtil.js";
import ResponseHandlerModule from "../../responseHandlerModule.js";
import { populateSelectWithOptions } from "../../helperModules/populateSelectWithOptions.js";
import ClientServices from "../../services/clientServices.js";
import ConferenceServices from "../../services/conferenceServices.js";
import ContactPersonServices from "../../services/contactPersonServices.js";
import { getEditorInstance } from "../../helperModules/CKEditor.js";

class ConferenceModalForm {
  constructor(conferenceId = null) {
    this.conferenceId = conferenceId;
    this.modal = $("#conference-modal-form");
    this.modalTitle = $("#conference-form-modalTitle");
    this.form = $("#frm-conference-form");
    this.initForm();
  }

  async new(clientId = null) {
    this.editorInstance = await getEditorInstance(
      "#frm-conference-form #note-editor"
    );
    if (clientId) {
      try {
        const record = await ClientServices.getSelectedClient(clientId);
        $("#client-number", this.form).val(record.clientNumber);
        $("#client-name", this.form).val(record.clientName);
        $("#client-id", this.form).val(record._id);
        // this.modal.css("display", "block").modal("show");

        // $(".modal-backdrop")
        //   .prev(".modal")
        //   .css("background-color", "lightblue");
      } catch (error) {
        console.error("Error:", error);
      }
    }
    // this.modalTitle.text("Add New Conference");
    showModal(this.modal, "Add New Conference", this.modalTitle);
    // this.modal.css("display", "block").modal("show");
    // $(".modal-backdrop").css("filter", "blur(100px)");
  }

  async open() {
    // console.log(this.conferenceId);
    this.editorInstance = await getEditorInstance(
      "#frm-conference-form #note-editor"
    );
    if (this.conferenceId) {
      try {
        const record = await ConferenceServices.getSelectedConference(
          this.conferenceId
        );
        if (record) {
          this.populateFormFields(record);
          // this.modalTitle.text("Edit Selected Address");
          // this.modal.css("display", "block").modal("show");
          showModal(this.modal, "Edit Selected Conference", this.modalTitle);
        } else {
          throw new Error("Failed to fetch Conference");
        }
      } catch (error) {
        console.error("Error:", error);
        alertify.notify("There was an error", "danger", 5);
      }
    } else {
      alertify.notify("Please make a selection", "warning", 5);
    }
  }

  async populateFormFields(record) {
    $("#client-number", this.form).val(record.client.clientNumber);
    $("#client-name", this.form).val(record.client.clientName);
    $("#client-id", this.form).val(record.client._id);
    $("#_id", this.form).val(record._id);
  }

  async attachEventHandlers() {
    this.form.on("submit", async (event) => {
      event.preventDefault();
      await this.handleFormSubmission($(event.currentTarget));
    });

    this.modal.on("hidden.bs.modal", () => {
      this.resetForm();
    });
  }

  async initForm() {
    const cases = await Case.getCases(this.clientId);
    const selectElement = $("#contact-person-id", this.form);
    populateSelectWithOptions(selectElement, conferences, "_id", "firstName");
    this.attachEventHandlers();
  }

  async handleFormSubmission(form) {
    const formData = new FormData(form[0]);
    const data = removeEmptyFields(formData);
    const id = formData.get("id");
    const action = id ? `updateConference/${id}` : "createConference";

    try {
      const response = await fetch(`${endpointURL}${action}`, {
        method: "POST",
        body: data,
      });
      const responseData = await response.json();
      ResponseHandlerModule.handleResponse(responseData);
      // Additional logic after form submission if needed
    } catch (error) {
      console.error("Form Submission Error:", error);
      ResponseHandlerModule.handleError(error);
    }
  }

  resetForm() {
    this.form[0].reset();
    this.form.find("input[type=hidden]").val("");
  }
}

export default ConferenceModalForm;
