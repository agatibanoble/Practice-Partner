import ClientModalForm from "./clientModalForm.js";
import ClientServices from "../services/clientServices.js";
import ContactAddressPage from "./contactAddressPage.js";
import ContactPersonPage from "./contactPersonPage.js";
import ConferencePage from "./conferenceModules/conferencePage.js";

class ClientProfileModal {
  constructor() {
    this.clientId = null;
    this.modal = $("#client-profile-modal");
    this.modalTitle = $("#client-profile-modalTitle");
    this.initForm();
  }

  async open(clientId) {
    this.clientId = clientId;

    if (this.clientId) {
      try {
        const selectedRecord = await ClientServices.getSelectedClient(
          this.clientId
        );
        this.populateClientFormFields(selectedRecord);
        this.modalTitle.text("Client Profile Management");
      } catch (error) {
        console.error("Error:", error);
      }
    }

    // this.modal.css("display", "block").modal("show");
    showModal(this.modal, "Client Profile Management", this.modalTitle);
  }

  populateClientFormFields(selectedRecord) {
    $(".client-number").text(`Client No.: ${selectedRecord.clientNumber}`);
    $(".client-name").text(`Name: ${selectedRecord.clientName}`);
    $(".client-image").attr(
      "src",
      `/assets/images/profile_pictures/${selectedRecord.clientImage}`
    );
    $(".client-category").text(
      selectedRecord.clientCategory
        ? `Category: ${selectedRecord.clientCategory.clientCategoryName}`
        : ""
    );
    $(".client-type").text(
      selectedRecord.clientType ? `Type: ${selectedRecord.clientType}` : ""
    );
    $(".client-referral-type").text(
      selectedRecord.clientReferralType
        ? `Referral: ${selectedRecord.clientReferralType}`
        : ""
    );
    $(".client-description").html(selectedRecord.clientDescription || "");
  }

  attachEventHandlers() {
    $("#btn-edit-client").click(() =>
      new ClientModalForm().open(this.clientId)
    );
    $("#btn-client-addresses").click(() =>
      new ContactAddressPage(this.clientId).open()
    );
    $("#btn-contact-persons").click(() =>
      new ContactPersonPage(this.clientId).open()
    );
    $("#btn-client-conferences").click(() =>
      new ConferencePage(this.clientId).open()
    );
    $("#client-modal-form, #about-client-modal-form").on("hidden.bs.modal");
  }

  initForm() {
    this.attachEventHandlers();
  }
}

// Instantiate and export ClientProfileModal as default
export default ClientProfileModal;
