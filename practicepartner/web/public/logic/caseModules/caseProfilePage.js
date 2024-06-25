import CaseModalForm from "./caseModalForm.js";
import CaseServices from "../services/caseServices.js";
// import ContactAddressPage from "./contactAddressPage.js";
// import ContactPersonPage from "./contactPersonPage.js";
import CaseConferencePage from "./caseConferenceModules/caseConferencePage.js";

class CaseProfilePage {
  constructor() {
    this.caseId = null;
    this.selectedRecord = null;
    this.modal = $("#case-profile-modal");
    this.modalTitle = $("#case-profile-modalTitle");
    this.initForm();
  }

  async open(caseId) {
    try {
      this.caseId = caseId;
      if (this.caseId) {
        await this.populateCaseFormFields(caseId);
        // this.modalTitle.text("Case Profile Management");
        // this.modal.css("display", "block").modal("show");
        showModal(this.modal, "Case Profile Management", this.modalTitle);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  async populateCaseFormFields(caseId) {
    this.selectedRecord = await CaseServices.getSelectedCase(caseId);

    this.clientId = this.selectedRecord.client._id;
    $(".client-name").text("Client: " + this.selectedRecord.client.clientName);
    $(".client-number").text(
      "Client No: " + this.selectedRecord.client.clientNumber
    );
    $(".case-number").text("Case No.:" + this.selectedRecord.caseNumber);
    $(".folio-number").text("Filio No.:" + this.selectedRecord.folioNumber);
    $(".case-title").text(this.selectedRecord.caseTitle);

    $(".client-image").attr(
      "src",
      "/assets/images/profile_pictures/" +
        this.selectedRecord.client.clientImage
    );
    this.selectedRecord.caseCategory
      ? $(".case-category").text(
          "Category: " + this.selectedRecord.caseCategory.caseCategoryName
        )
      : "";
    this.selectedRecord.court
      ? $(".court").text("Court: " + this.selectedRecord.court.courtName)
      : "";
    this.selectedRecord.caseStartDate
      ? $(".case-start-date").text(
          "Start Date: " + formatDate(this.selectedRecord.caseDate, "d-M-Y")
        )
      : "";
    this.selectedRecord.caseFacts
      ? $(".case-facts").html(this.selectedRecord.caseFacts)
      : "";
  }

  attachEventHandlers = async () => {
    $("#btn-edit-case").click(() => new CaseModalForm().open(this.caseId));
    $("#case-menu #btn-case-details").click(() =>
      new CaseDetailsPage(this.caseId).open()
    );
    $("#case-menu #btn-case-parties").click(() =>
      new CasePartiesPage(this.caseId).open()
    );
    $("#case-menu #btn-case-conferences").click(
      () => new CaseConferencePage().open(this.caseId)
      // alert("case conference clicked")
    );
    // $("#btn-case-conferences").click(() =>
    //   new CaseSchedulePage(this.caseId).open()
    // );
    $("#btn-case-fees").click(() => new CaseFeePage(this.caseId).open());
    $("#btn-case-invoices").click(() =>
      new CaseInvoicePage(this.caseId).open()
    );
    $("#btn-case-payments").click(() =>
      new CasePaymentPage(this.caseId).open()
    );
    $("#case-modal-form, #about-case-modal-form").on(
      "hidden.bs.modal"
      // this.getAndPopulateCaseRecord.bind(this)
    );
    this.modal.on("hidden.bs.modal", () => {
      this.populateCaseFormFields(this.caseId);
    });
  };

  initForm() {
    // this.getAndPopulateCaseRecord();
    this.attachEventHandlers();
  }
}

// Instantiate and export CaseProfilePage as default
export default CaseProfilePage;
