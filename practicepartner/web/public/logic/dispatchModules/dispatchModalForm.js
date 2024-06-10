// import DocumentTypeServices from "../services/documentServices.js";
// import DispatchCategoryServices from "../../logic/services/documentServices.js";
import DispatchServices from "../services/dispatchServices.js";
import DocumentTypeServices from "../services/documentTypeServices.js";

class DispatchModalForm {
  static instance = null; // Static property to hold the single instance

  constructor() {
    if (DispatchModalForm.instance) {
      return DispatchModalForm.instance; // Return the existing instance if it exists
    }

    // Initialize the instance if it doesn't exist
    DispatchModalForm.instance = this;

    // Your existing code here
    this.modal = $("#dispatch-modal-form");
    this.modalTitle = $("#dispatch-modal-form-modalTitle");
    this.form = $("#frm-dispatch");

    // Attach event handlers
    this.attachEventHandlers();
    this.initFormPromise = this.initForm();
  }

  // Static method to get the instance of the class
  static getInstance() {
    if (!DispatchModalForm.instance) {
      // Create a new instance if it doesn't exist
      DispatchModalForm.instance = new DispatchModalForm();
    }
    return DispatchModalForm.instance;
  }

  async initForm() {
    let selectElement = $("#document-type", this.form);
    await DocumentTypeServices.populateDocumenttypes(selectElement);

    selectElement = $("#dispatch-category", this.form);
    await DispatchCategoryServices.populateDispatchCategories(selectElement);
  }

  async new() {
    await this.initFormPromise; // Ensure the form is initialized before showing the modal
    this.modalTitle.text("Add New Dispatch");
    this.showModal();
  }

  async open(dispatchId) {
    if (!dispatchId) {
      alertify.notify("Please make a selection", "warning", 5);
      return;
    }
    try {
      await this.initFormPromise; // Ensure the form is initialized before populating fields
      const selectedRecord = await DispatchServices.getSelectedDispatch(
        dispatchId
      );
      this.populateFormFields(selectedRecord);
      this.modalTitle.text("Edit Selected Dispatch");
      this.showModal();
    } catch (error) {
      console.error("Error:", error);
    }
  }

  populateFormFields(selectedRecord) {
    if (selectedRecord) {
      $("#dispatch-number", this.form).val(selectedRecord.dispatchNumber);
      $("#dispatch-title", this.form).val(selectedRecord.dispatchTitle);
      $("#dispatch-status", this.form).val(selectedRecord.dispatchStatus);
      $("#dispatch-department", this.form).val(
        selectedRecord.dispatchDepartment
          ? selectedRecord.dispatchDepartment
          : ""
      );
      $("#dispatch-category", this.form).val(
        selectedRecord.dispatchCategory ? selectedRecord.dispatchCategory : ""
      );
      $("#dispatch-priority", this.form).val(
        selectedRecord.dispatchPriority ? selectedRecord.dispatchPriority : ""
      );
      $("#dispatch-date", this.form).val(
        selectedRecord.dispatchDate ? selectedRecord.dispatchDate : ""
      );
      $("#dispatch-due-date", this.form).val(
        selectedRecord.dispatchDueDate ? selectedRecord.dispatchDueDate : ""
      );
      $("#dispatch-description", this.form).val(
        selectedRecord.dispatchDescription
          ? selectedRecord.dispatchDescription
          : ""
      );
      $("#_id", this.form).val(selectedRecord._id);
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

  async handleFormSubmission(form) {
    const formData = new FormData(form[0]);
    try {
      const responseData = await DispatchServices.saveRecord(formData);
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

// Export the getInstance() method instead of the class directly
export const getInstance = () => DispatchModalForm.getInstance();

export default DispatchModalForm;
