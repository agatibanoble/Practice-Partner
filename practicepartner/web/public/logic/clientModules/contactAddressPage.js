import endpointURL from "../configModule.js";
import ContactAddressModalForm from "./contactAddressModalForm.js";
import emailModule from "../communicationModules/emailModules/emailModule.js";
import ContactAddressServices from "../services/contactAddressServices.js";

class ContactAddressPage {
  constructor(clientId) {
    this.clientId = clientId;
    this.currentPage = 1;
    this.cardBody = $(".cardBody");
    this.modal = $("#contact-address-page");
    this.modalTitle = $("#contact-address-page-modalTitle");
    this.initForm();
  }

  async open() {
    if (this.clientId) {
      ContactAddressServices.getContactAddresses(this.clientId)
        .then((selectedRecords) => {
          this.populateFormFields(selectedRecords);
        })
        .then(() => {
          // this.modalTitle.text("Client Addresses");
          // this.modal.css("display", "block").modal("show");
        })
        .catch((error) => {
          // Handle error
          console.error("Error:", error);
        });
    } else {
      //this.modalTitle.text("Add New Case");
    }

    // this.modal.css("display", "block").modal("show");
    showModal(this.modal, "Client Addresses", this.modalTitle);
  }

  async populateFormFields(selectedRecords) {
    try {
      // const contactAddressData = selectedRecords.contactAddresses;
      this.cardBody.empty();
      if (
        selectedRecords.contactAddresses &&
        selectedRecords.contactAddresses.length > 0
      ) {
        selectedRecords.contactAddresses.forEach((contactAddress, index) => {
          const row = this.createContactAddressRow(
            index + 1,
            selectedRecords,
            contactAddress
          );
          this.cardBody.append(row);
        });
      } else {
        this.cardBody.append(this.noRecordDisplay());
      }
    } catch (error) {
      this.cardBody.append(this.noRecordDisplay());
      console.error("Error fetching and displaying client addresses:", error);
    }
  }

  attachEventHandlers() {
    $("#btn-new-contact-address").on("click", this.newRecord);
    this.cardBody.on("click", "#btn-send-mail", () => this.sendMail());
    this.cardBody.on("click", "#btn-view", (event) => this.viewRecord(event));
    this.cardBody.on("click", "#btn-edit", (event) => this.editRecord(event));
    this.cardBody.on("click", "#btn-delete", (event) =>
      this.deleteRecord(event)
    );
    $(".modal").on("hidden.bs.modal", () => this.refreshPage());
  }

  deleteRecord(id) {
    // Show confirmation prompt
    alertify.confirm(
      "Confirmation",
      "Are you sure you want to delete this record?",
      () => {
        // Perform AJAX request to delete record
        $.ajax({
          url: `${endpointURL}deleteContactAddress/${id}`,
          type: "DELETE",
          contentType: "application/json",
          success: () => {
            alertify.notify("Record deleted successfully", "success", 5);
            this.refreshPage();
          },
          error: () => {
            // Handle error
            alertify.notify("Error deleting record", "warning", 5);
          },
        });
      },
      () => {
        // User clicked Cancel
        alertify.notify("Deletion canceled by user", "info", 5);
      }
    );
  }

  noRecordDisplay() {
    return `
      <div class="col-sm-12">
        <div class="card">
          <div class="card-body" style="display: flex; justify-content: center; align-items: center;">No Records Found</div>
        </div>
      </div>`;
  }

  createContactAddressRow(index, client, contactAddress) {
    return `
    <div class="col-xl-6 col-sm-6">
      <div class="card">
        <div class="card-body">
          <div class="dropdown float-end">
            <a
              class="text-muted dropdown-toggle font-size-16"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
            >
              <i class="bx bx-dots-horizontal-rounded"></i>
            </a>
            <div class="dropdown-menu dropdown-menu-end my-data-row" data-id="${contactAddress._id}">
              <a class="dropdown-item btn-view" id="btn-view" href="#">
                <i class="mdi mdi-eye"></i> View
              </a>
              <a class="dropdown-item btn-edit" id="btn-edit" href="#">
                <i class="mdi mdi-pencil"></i> Edit
              </a>
              <a class="dropdown-item btn-delete" id="btn-delete" href="#">
                <i class="mdi mdi-delete"></i> Delete
              </a>
            </div>
          </div>
          <div class="d-flex align-items-center">
            <div>
              <img
                src="/assets/images/profile_pictures/${client.clientImage}"
                alt=""
                class="avatar-lg rounded-circle img-thumbnail"
              />
            </div>
            <div class="flex-1 ms-3">
              <h5 class="font-size-15 mb-1">
                <a href="#" class="text-dark" id="client-name">${client.clientName}</a>
              </h5>
              <p class="text-muted mb-0" id="client-number">${client.clientNumber}</p>
            </div>
          </div>
          <div class="mt-3 pt-1">
            <p class="text-muted mb-0">
              <i class="mdi mdi-phone font-size-15 align-middle pe-2 text-primary"></i>
              <a id="mobile-phone">${contactAddress.mobilePhone}</a>
            </p>
            <p class="text-muted mb-0 mt-2">
              <i class="mdi mdi-email font-size-15 align-middle pe-2 text-primary"></i>
              <a id="email">${contactAddress.email}</a>
            </p>
            <p class="text-muted mb-0 mt-2">
              <i class="mdi mdi-google-maps font-size-15 align-middle pe-2 text-primary"></i>
              <a id="residential-address">${contactAddress.residentialAddress}</a>
            </p>
          </div>
        </div>

        <div class="btn-group my-data-email" role="group" data-id="${contactAddress.email}">
          <button type="button" class="btn btn-outline-light text-truncate">
            <i class="uil uil-user me-1"></i> Detail
          </button>
          <button type="button" class="btn btn-outline-light text-truncate btn-send-mail" id="btn-send-mail">
            <i class="uil uil-envelope-alt me-1"></i> Send Mail
          </button>
        </div>
      </div>
      <!-- end card -->
    </div>`;
  }

  sendMail() {
    const email = this.cardBody.find(".my-data-email").data("id");
    emailModule.composeEmail(email);
  }

  newRecord = () => {
    new ContactAddressModalForm().new(this.clientId);
  };

  viewRecord(event) {
    const id = $(event.currentTarget).closest(".my-data-row").data("id");
    new ContactAddressModalForm(id).open();
  }

  editRecord(event) {
    const id = $(event.currentTarget).closest(".my-data-row").data("id");
    new ContactAddressModalForm(id).open();
  }

  deleteRecord(event) {
    const id = $(event.currentTarget).closest(".my-data-row").data("id");
    this.deleteRecord(id);
  }

  async refreshPage() {
    if (this.clientId) {
      ContactAddressServices.getContactAddresses(this.clientId)
        .then((selectedRecords) => {
          this.populateFormFields(selectedRecords);
        })
        .catch((error) => {
          // Handle error
          console.error("Error:", error);
        });
    } else {
      //this.modalTitle.text("Add New Case");
    }
  }
  async initForm() {
    $(document).ready(async () => {
      try {
        this.attachEventHandlers(); // Call attachEventHandlers to set up event handling
      } catch (error) {
        console.error("Error initializing form:", error);
      }
    });
  }
}

export default ContactAddressPage;
