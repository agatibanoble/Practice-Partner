import endpointURL from "../configModule.js";
import removeEmptyFields from "../helperModules/emptyFieldsUtil.js";
import ResponseHandlerModule from "../responseHandlerModule.js";
import { populateSelectWithOptions } from "../helperModules/populateSelectWithOptions.js";
import ClientServices from "../services/clientServices.js";
import ContactPersonServices from "../services/contactPersonServices.js";
import RegionServices from "../services/regionServices.js";

class ContactPersonModalForm {
  constructor(contactPersonId = null) {
    this.contactPersonId = contactPersonId;
    this.modal = $("#contact-person-modal-form");
    this.modalTitle = $("#contact-person-form-modalTitle");
    this.form = $("#frm-contact-person-form");
    this.initForm();
  }

  async new(clientId = null) {
    if (clientId) {
      try {
        const record = await ClientServices.getSelectedClient(clientId);
        $("#client-number", this.form).val(record.clientNumber);
        $("#client-name", this.form).val(record.clientName);
        $("#client-id", this.form).val(record._id);
        this.modal.css("display", "block").modal("show");
        $(".modal-backdrop").css("filter", "blur(100px)");
      } catch (error) {
        console.error("Error:", error);
      }
    }
    this.modalTitle.text("Add New Contact Person");
    this.modal.css("display", "block").modal("show");
  }

  async open() {
    // console.log(this.contactPersonId);
    if (this.contactPersonId) {
      try {
        const record = await ContactPersonServices.getSelectedContactPerson(
          this.contactPersonId
        );
        if (record) {
          this.populateFormFields(record);
          this.modalTitle.text("Edit Selected Address");
          this.modal.css("display", "block").modal("show");
        } else {
          throw new Error("Failed to fetch Contact Person");
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
    $("#first-name", this.form).val(record.firstName);
    $("#last-name", this.form).val(record.lastName);
    $("#other-name", this.form).val(record.otherName);
    $("#region-id", this.form).val(record.regionId);
    $("#city", this.form).val(record.city);
    $("#street", this.form).val(record.street);
    $("#building-number", this.form).val(record.buildingNumber);
    $("#land-mark", this.form).val(record.landMark);
    $("#gps-address", this.form).val(record.gpsAddress);
    $("#postal-address", this.form).val(record.postalAddress);
    $("#residential-address").val(record.residentialAddress);
    $("#office-phone", this.form).val(record.officePhone);
    $("#mobile-phone", this.form).val(record.mobilePhone);
    $("#alternate-phone", this.form).val(record.alternatePhone);
    $("#email", this.form).val(record.email);
    $("#alternate-email", this.form).val(record.alternateEmail);
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
    const regions = await RegionServices.getRegions();
    const selectElement = $("#region-id", this.form);
    populateSelectWithOptions(selectElement, regions, "_id", "regionName");
    this.attachEventHandlers();
  }

  async handleFormSubmission(form) {
    const formData = new FormData(form[0]);
    const data = removeEmptyFields(formData);
    const id = formData.get("id");
    const action = id ? `updateContactPerson/${id}` : "createContactPerson";

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

export default ContactPersonModalForm;
