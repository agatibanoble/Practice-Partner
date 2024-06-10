import DispatchModalForm from "./dispatchModalForm.js";
import DispatchServices from "../services/dispatchServices.js";

class dispatchProfileModal {
  constructor() {
    this.dispatchId = null;
    this.modal = $("#dispatch-profile-modal");
    this.modalTitle = $("#dispatch-profile-modalTitle");
    this.initForm();
  }

  async open(dispatchId) {
    this.dispatchId = dispatchId;
    if (this.dispatchId) {
      DispatchServices.getSelectedDispatch(this.dispatchId)
        .then((selectedRecord) => {
          this.populatedispatchFormFields(selectedRecord);
        })
        .then(() => {
          this.modalTitle.text("dispatch Profile Management");
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }

    this.modal.css("display", "block").modal("show");
  }

  populatedispatchFormFields(selectedRecord) {
    $(".dispatch-number").text("dispatch No.:" + selectedRecord.dispatchNumber);
    $(".dispatch-name").text(
      "Name: " +
        selectedRecord.dispatchFirstName +
        " " +
        selectedRecord.dispatchLastName
    );
    selectedRecord.dispatchImage
      ? $(".dispatch-image").attr(
          "src",
          "/assets/images/profile_pictures/" + selectedRecord.dispatchImage
        )
      : "";
    selectedRecord.department
      ? $(".dispatch-department").text(
          "Department: " + selectedRecord.department
        )
      : "";
    selectedRecord.dispatchCategory
      ? $(".dispatch-category").text(
          "Category: " + selectedRecord.dispatchCategory
        )
      : "";
    selectedRecord.dispatchStatus
      ? $(".dispatch-status").text("Status: " + selectedRecord.dispatchStatus)
      : "";
    selectedRecord.dispatchGender
      ? $(".dispatch-gender").text("Gender: " + selectedRecord.dispatchGender)
      : "";
    selectedRecord.dispatchHireDate
      ? $(".dispatch-hire-date").text(
          "Hire Date: " + selectedRecord.dispatchHireDate
        )
      : "";
    selectedRecord.dispatchDateOfBirth
      ? $(".dispatch-date-of-birth").text(
          "DOB: " + selectedRecord.dispatchDateOfBirth
        )
      : "";
    selectedRecord.dispatchEmail
      ? $(".dispatch-email").text("Email: " + selectedRecord.dispatchEmail)
      : "";
    selectedRecord.dispatchPhone
      ? $(".dispatch-phone").text("Phone: " + selectedRecord.dispatchPhone)
      : "";
    selectedRecord.dispatchAddress
      ? $(".dispatch-address").text(
          "Address: " + selectedRecord.dispatchAddress
        )
      : "";
    selectedRecord.dispatchDescription
      ? $(".dispatch-description").html(selectedRecord.dispatchDescription)
      : "";
  }

  attachEventHandlers = async () => {
    $("#btn-edit-dispatch").click(() =>
      new DispatchModalForm().open(this.dispatchId)
    );
    // Add event handlers for other buttons as needed
  };

  initForm() {
    this.attachEventHandlers();
  }
}

// Instantiate and export dispatchProfileModal as default
export default dispatchProfileModal;
