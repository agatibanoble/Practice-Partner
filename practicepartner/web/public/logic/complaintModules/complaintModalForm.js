import DepartmentServices from "../services/departmentServices.js";
import ComplaintServices from "../services/complaintServices.js";

class ComplaintModalForm {
  static instance = null; // Static property to hold the single instance

  constructor() {
    if (ComplaintModalForm.instance) {
      return ComplaintModalForm.instance; // Return the existing instance if it exists
    }

    // Initialize the instance if it doesn't exist
    ComplaintModalForm.instance = this;

    // Initialize modal and form elements
    this.modal = $("#complaint-modal-form");
    this.modalTitle = $("#complaint-modal-form-modalTitle");
    this.form = $("#frm-complaint");

    // Attach event handlers
    this.attachEventHandlers();
    this.initForm();
  }

  // Static method to get the instance of the class
  static getInstance() {
    if (!ComplaintModalForm.instance) {
      // Create a new instance if it doesn't exist
      ComplaintModalForm.instance = new ComplaintModalForm();
    }
    return ComplaintModalForm.instance;
  }

  async initForm() {
    let selectElement = $("#complaint-department", this.form);
    await DepartmentServices.populateDepartments(selectElement);
  }

  async new() {
    this.modalTitle.text("Add New Complaint");
    this.showModal();
  }

  async open(complaintId) {
    if (!complaintId) {
      alertify.notify("Please make a selection", "warning", 5);
      return;
    }
    try {
      const selectedRecord = await ComplaintServices.getSelectedComplaint(
        complaintId
      );
      this.populateFormFields(selectedRecord);
      this.modalTitle.text("Edit Selected Complaint");
      this.showModal();
    } catch (error) {
      console.error("Error:", error);
    }
  }

  populateFormFields(selectedRecord) {
    if (selectedRecord) {
      $("#complaint-number", this.form).val(selectedRecord.complaintNumber);
      $("#complaint-title", this.form).val(selectedRecord.title);
      $("#complaint-description", this.form).val(selectedRecord.description);
      $("#complaint-department", this.form).val(
        selectedRecord.department ? selectedRecord.department._id : ""
      );
      $("#complaint-status", this.form).val(
        selectedRecord.status ? selectedRecord.status : ""
      );
      $("#complaint-date-filed", this.form).val(
        selectedRecord.dateFiled ? selectedRecord.dateFiled : ""
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
      const responseData = await ComplaintServices.saveRecord(formData);
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
export const getInstance = () => ComplaintModalForm.getInstance();

export default ComplaintModalForm;
