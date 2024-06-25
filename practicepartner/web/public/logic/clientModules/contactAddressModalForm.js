import endpointURL from "../configModule.js";
import removeEmptyFields from "../helperModules/emptyFieldsUtil.js";
import ResponseHandlerModule from "../responseHandlerModule.js";
import { populateSelectWithOptions } from "../helperModules/populateSelectWithOptions.js";
import ClientServices from "../services/clientServices.js";
import ContactAddressServices from "../services/contactAddressServices.js";
import RegionServices from "../services/regionServices.js";

class ContactAddressModalForm {
  constructor(contactAddressId = null) {
    // Initialize ContactAddressModalForm instance with optional contactAddressId
    this.contactAddressId = contactAddressId;
    this.modal = $("#contact-address-modal-form");
    this.modalTitle = $("#contact-address-form-modalTitle");
    this.form = $("#frm-contact-address-form");
    this.initForm();
  }

  async new(clientId = null) {
    // Open a new modal to add a new client address
    if (clientId) {
      // Fetch selected client details if a clientId is provided
      ClientServices.getSelectedClient(clientId)
        .then((record) => {
          // Populate form fields with selected client details
          $("#client-number", this.form).val(record.clientNumber);
          $("#client-name", this.form).val(record.clientName);
          $("#client-id", this.form).val(record._id);
        })
        .then(() => {
          // Show the modal after populating form fields
          // this.modal.css("display", "block").modal("show");
        })
        .catch((error) => {
          // Handle error if client details fetch fails
          console.error("Error:", error);
        });
    }
    // this.modalTitle.text("Add New Address");
    // this.modal.css("display", "block").modal("show");
    showModal(this.modal, "Add New Address", this.modalTitle);
  }

  async open() {
    // Open the modal to edit a selected client address
    if (this.contactAddressId) {
      try {
        // Fetch selected client address details asynchronously
        const record = await ContactAddressServices.getSelectedContactAddress(
          this.contactAddressId
        );
        if (record) {
          // Populate form fields with selected client address details
          this.populateFormFields(record);
          // this.modalTitle.text("Edit Selected Address"); // Set modal title for edit mode
          // this.modal.modal("show");
          // this.modal.css("display", "block").modal("show"); // Show the modal
          showModal(this.modal, "Edit Selected Address", this.modalTitle);
        } else {
          // Handle error if client address fetch fails
          throw new Error("Failed to fetch client address");
        }
      } catch (error) {
        // Handle error if async operation fails
        console.error("Error:", error);
        alertify.notify("There was an error", "danger", 5);
        // Display appropriate error message to the user
        // Handle error and display appropriate message to the user
      }
    } else {
      // Alert user if no client address is selected
      alertify.notify("Please make a selection", "warning", 5);
    }
  }

  async populateFormFields(record) {
    // Populate form fields with client address details
    if (record) {
      // console.log(record);
      let client = record;
      let address = record.contactAddresses[0];
      $("#client-number", this.form).val(client.clientNumber);
      $("#client-name", this.form).val(client.clientName);
      $("#region-id", this.form).val(address.regionId);
      $("#city", this.form).val(address.city);
      $("#land-mark", this.form).val(address.landMark);
      $("#street", this.form).val(address.street);
      $("#gps-address", this.form).val(address.gpsAddress);
      $("#residential-address", this.form).val(address.residentialAddress);
      $("#postal-address", this.form).val(address.postalAddress);
      $("#building-number", this.form).val(address.buildingNumber);
      $("#office-phone", this.form).val(address.officePhone);
      $("#mobile-phone", this.form).val(address.mobilePhone);
      $("#alternate-phone", this.form).val(address.alternatePhone);
      $("#alternate-email", this.form).val(address.alternateEmail);
      $("#email", this.form).val(address.email);
      $("#_id", this.form).val(address._id); // Set client address ID
    }
  }

  async attachEventHandlers() {
    // Attach event handlers for form submission and modal events
    this.form.on("submit", (event) => {
      event.preventDefault();
      this.handleFormSubmission($(event.currentTarget)); // Handle form submission
    });

    this.modal.on("hidden.bs.modal", () => {
      this.resetForm(); // Reset form when modal is hidden
    });
  }
  async initForm() {
    const regions = await RegionServices.getRegions();
    const selectElement = $("#region-id", this.form);
    populateSelectWithOptions(selectElement, regions, "_id", "regionName");
    $(document).ready(async () => {
      try {
        // this.form = $("#frm-contact-address-form");
        this.attachEventHandlers(); // Call attachEventHandlers to set up event handling
      } catch (error) {
        console.error("Error initializing form:", error);
      }
    });
  }

  async handleFormSubmission(form) {
    // Handle form submission asynchronously
    try {
      let formData = new FormData(form[0]); // Get form dataChange 'const' to 'let'
      formData = removeEmptyFields(formData); // Remove empty fields from form data
      const id = formData.get("_id");
      const action = id ? `updateContactAddress/${id}` : "createContactAddress";
      // Send form data to backend API using fetch
      const response = await fetch(`${endpointURL}${action}`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to submit form data");
      }

      const responseData = await response.json();
      ResponseHandlerModule.handleResponse(responseData); // Handle API response
    } catch (error) {
      console.error("Form Submission Error:", error); // Handle form submission error
      ResponseHandlerModule.handleError(error);
    }
  }

  resetForm() {
    // Reset form fields and hidden inputs
    this.form[0].reset(); // Reset the form
    $(this.form).find("input[type=hidden]", this.form).val(""); // Clear hidden inputs
  }
}

export default ContactAddressModalForm;
