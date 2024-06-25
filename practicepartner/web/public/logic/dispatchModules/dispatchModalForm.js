// import { formatDate } from "../helperModules/dateFormater.js";
import ClientServices from "../services/clientServices.js";
import DeliveryTypeServices from "../services/deliveryTypeServices.js";
import DispatchServices from "../services/dispatchServices.js";
import DocumentTypeServices from "../services/documentTypeServices.js";
// import { dateTimePicker } from "../helperModules/dateTimePicker.js";

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
    dateTimePicker("#dispatch-date", "Y-m-d", "", "", "", true);
    dateTimePicker("#dispatch-due-date", "Y-m-d", "", "", "", true);
    dateTimePicker("#dispatch-received-date", "Y-m-d", "", "", "", true);
    // dateTimePicker();
    let selectElement = $("#document-type", this.form);
    await DocumentTypeServices.populateDocumenttypes(selectElement);

    selectElement = $("#delivery-type", this.form);
    await DeliveryTypeServices.populateDeliveryTypes(selectElement);
  }

  async new() {
    // await this.initFormPromise; // Ensure the form is initialized before showing the modal
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
      $("#client-name", this.form).val(
        selectedRecord.client.clientNumber +
          ":" +
          selectedRecord.client.clientName
      );
      $("#client-id", this.form).val(selectedRecord.client._id);
      $("#dispatch-status", this.form).val(selectedRecord.dispatchStatus);
      $("#dispatch-priority", this.form).val(
        selectedRecord.dispatchPriority ? selectedRecord.dispatchPriority : ""
      );
      $("#dispatch-type", this.form).val(
        selectedRecord.dispatchType ? selectedRecord.dispatchType : ""
      );
      $("#document-type", this.form).val(
        selectedRecord.documentType ? selectedRecord.documentType._id : ""
      );
      $("#dispatch-date", this.form).val(
        selectedRecord.dispatchDate
          ? formatDate(selectedRecord.dispatchDate, "Y-m-d")
          : ""
      );
      $("#dispatch-received-date", this.form).val(
        selectedRecord.dispatchReceivedDate
          ? formatDate(selectedRecord.dispatchReceivedDate, "Y-m-d")
          : ""
      );
      $("#dispatch-due-date", this.form).val(
        selectedRecord.dispatchDueDate
          ? formatDate(selectedRecord.dispatchDueDate, "Y-m-d")
          : ""
      );
      $("#dispatch-note", this.form).val(
        selectedRecord.dispatchNote ? selectedRecord.dispatchNote : ""
      );
      $("#delivery-type", this.form).val(
        selectedRecord.deliveryType ? selectedRecord.deliveryType._id : ""
      );
      $("#dispatch-delivered-by", this.form).val(
        selectedRecord.dispatchDeliveredBy
          ? selectedRecord.dispatchDeliveredBy
          : ""
      );
      $("#dispatch-source-address", this.form).val(
        selectedRecord.dispatchSourceAddress
          ? selectedRecord.dispatchSourceAddress
          : ""
      );
      $("#dispatch-destination-address", this.form).val(
        selectedRecord.dispatchDestinationAddress
          ? selectedRecord.dispatchDestinationAddress
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
    $("#client-name").on("focus", () => {
      ClientServices.searchClients($("#client-name"));
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
