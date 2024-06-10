import EmployeeModalForm from "./employeeModalForm.js";
import EmployeeServices from "../services/employeeServices.js";

class EmployeeProfileModal {
  constructor() {
    this.employeeId = null;
    this.modal = $("#employee-profile-modal");
    this.modalTitle = $("#employee-profile-modalTitle");
    this.initForm();
  }

  async open(employeeId) {
    this.employeeId = employeeId;
    if (this.employeeId) {
      EmployeeServices.getSelectedEmployee(this.employeeId)
        .then((selectedRecord) => {
          this.populateEmployeeFormFields(selectedRecord);
        })
        .then(() => {
          this.modalTitle.text("Employee Profile Management");
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }

    this.modal.css("display", "block").modal("show");
  }

  populateEmployeeFormFields(selectedRecord) {
    $(".employee-number").text("Employee No.:" + selectedRecord.employeeNumber);
    $(".employee-name").text(
      "Name: " +
        selectedRecord.employeeFirstName +
        " " +
        selectedRecord.employeeLastName
    );
    selectedRecord.employeeImage
      ? $(".employee-image").attr(
          "src",
          "/assets/images/profile_pictures/" + selectedRecord.employeeImage
        )
      : "";
    selectedRecord.department
      ? $(".employee-department").text(
          "Department: " + selectedRecord.department
        )
      : "";
    selectedRecord.employeeCategory
      ? $(".employee-category").text(
          "Category: " + selectedRecord.employeeCategory
        )
      : "";
    selectedRecord.employeeStatus
      ? $(".employee-status").text("Status: " + selectedRecord.employeeStatus)
      : "";
    selectedRecord.employeeGender
      ? $(".employee-gender").text("Gender: " + selectedRecord.employeeGender)
      : "";
    selectedRecord.employeeHireDate
      ? $(".employee-hire-date").text(
          "Hire Date: " + selectedRecord.employeeHireDate
        )
      : "";
    selectedRecord.employeeDateOfBirth
      ? $(".employee-date-of-birth").text(
          "DOB: " + selectedRecord.employeeDateOfBirth
        )
      : "";
    selectedRecord.employeeEmail
      ? $(".employee-email").text("Email: " + selectedRecord.employeeEmail)
      : "";
    selectedRecord.employeePhone
      ? $(".employee-phone").text("Phone: " + selectedRecord.employeePhone)
      : "";
    selectedRecord.employeeAddress
      ? $(".employee-address").text(
          "Address: " + selectedRecord.employeeAddress
        )
      : "";
    selectedRecord.employeeDescription
      ? $(".employee-description").html(selectedRecord.employeeDescription)
      : "";
  }

  attachEventHandlers = async () => {
    $("#btn-edit-employee").click(() =>
      new EmployeeModalForm().open(this.employeeId)
    );
    // Add event handlers for other buttons as needed
  };

  initForm() {
    this.attachEventHandlers();
  }
}

// Instantiate and export EmployeeProfileModal as default
export default EmployeeProfileModal;
