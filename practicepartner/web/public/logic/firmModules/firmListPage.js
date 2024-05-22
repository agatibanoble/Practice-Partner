import FirmServices from "../../logic/services/firmServices.js";
import removeEmptyFields from "../helperModules/emptyFieldsUtil.js";
import FirmModalForm from "./firmModalForm.js";

class FirmModalPage {
  constructor(firmId = null) {
    this.firmId;
    this.modal = $("#firm-modal-page");
    this.modalTitle = $("#firm-modal-page-modalTitle");
    this.form = $("#frm-firm");
    this.initForm();
  }

  async open() {
    try {
      const selectedFirm = await FirmServices.getSelectedRecord();
      this.populateFormFields(selectedFirm);
      this.modalTitle.text("View Law Firm Details");
      this.showModal();
    } catch (error) {
      console.error("Error:", error);
    }
  }

  editRecord = () => {
    new FirmModalForm().open();
  };

  async populateFormFields(selectedFirm) {
    console.log(selectedFirm);
    if (selectedFirm) {
      $("#registration-number").text(selectedFirm.registrationNumber);
      $("#firm-name").text(selectedFirm.firmName);
      $("#date-established").text(selectedFirm.dateEstablished);
      $("#address").text(selectedFirm.address);
      $("#city").text(selectedFirm.city);
      $("#region").text(selectedFirm.region.regionName);
      $("#country").text(selectedFirm.region.country.countryName);
      $("#postal-code").text(selectedFirm.postalCode);
      $("#phone-number").text(selectedFirm.phoneNumber);
      $("#email").text(selectedFirm.email);
      $("#website").text(selectedFirm.website);
      $("#description").text(selectedFirm.description);
      // Add additional fields as needed
      $("#_id").val(selectedFirm._id); // Assuming _id is the ID field
    }
  }

  async showModal() {
    this.modal.css("display", "block").modal("show");
  }

  async attachEventHandlers() {
    $("#btn-edit").on("click", this.editRecord.bind(this));
    this.form.on("submit", async (event) => {
      event.preventDefault();
      await this.handleFormSubmission($(event.currentTarget));
    });

    this.modal.on("hidden.bs.modal", () => {
      this.resetForm();
    });
  }

  async initForm() {
    this.attachEventHandlers();
  }

  async handleFormSubmission(form) {
    const formData = new FormData(form[0]);
    const data = removeEmptyFields(formData);
    const id = formData.get("id");
    const action = id ? `updateFirm/${id}` : "createFirm";

    FirmServices.saveRecord(data, action)
      .then((responseData) => {
        console.log("Record saved successfully:", responseData.data);
        this.populateFormFields(responseData.data);
        // Additional logic for successful completion can be added here
      })
      .catch((error) => {
        console.error("Error saving record:", error);
        // Additional error handling logic can be added here
      });
  }

  resetForm() {
    this.form[0].reset();
    this.form.find("input[type=hidden]").val("");
  }
}

export default FirmModalPage;
