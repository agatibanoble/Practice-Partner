import ClientModalForm from "./clientModalForm.js";
import ClientServices from "../services/clientServices.js";
import ContactAddressPage from "./contactAddressPage.js";
import ContactPersonPage from "./contactPersonPage.js";
import ConferencePage from "./conferenceModules/conferencePage.js";
class ClientProfileModal {
  constructor(clientId) {
    this.clientId = clientId;
    this.modal = $("#client-profile-modal");
    this.modalTitle = $("#client-profile-modalTitle");
    this.initForm();
  }

  async open() {
    if (this.clientId) {
      ClientServices.getSelectedClient(this.clientId)
        .then((selectedRecord) => {
          this.populateClientFormFields(selectedRecord);
        })
        .then(() => {
          this.modalTitle.text("Client Profile Management");
          // this.modal.css("display", "block").modal("show");
        })
        .catch((error) => {
          // Handle error
          console.error("Error:", error);
        });
    } else {
      //this.modalTitle.text("Add New Case");
    }

    this.modal.css("display", "block").modal("show");
  }

  populateClientFormFields(selectedRecord) {
    $(".client-number").text("Client No.:" + selectedRecord.clientNumber);
    $(".client-name").text("Name: " + selectedRecord.clientName);
    $(".client-image").attr(
      "src",
      "/assets/images/profile_pictures/" + selectedRecord.clientImage
    );
    $(".client-category").text(
      "Category: " + selectedRecord.clientCategory.clientCategoryName
    );
    $(".client-type").text("Type: " + selectedRecord.clientType);
    $(".client-referral-type").text(
      "Referral: " + selectedRecord.clientReferralType
    );
    $(".client-description").html(selectedRecord.clientDescription);
  }

  attachEventHandlers = async () => {
    $("#btn-edit-client").click(() =>
      new ClientModalForm(this.clientId).open()
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
    $("#client-modal-form, #about-client-modal-form").on(
      "hidden.bs.modal"
      // this.getAndPopulateClientRecord.bind(this)
    );
  };

  initForm() {
    // this.getAndPopulateClientRecord();
    this.attachEventHandlers();
  }
}

// Instantiate and export ClientProfileModal as default
export default ClientProfileModal;
