import ConferenceModalForm from "./conferenceModalForm.js";
import EmailModule from "../../communicationModules/emailModules/emailModule.js";
import constructFullName from "../../helperModules/constructFullName.js";
import ConferenceServices from "../../services/conferenceServices.js";
class ConferencePage {
  constructor(clientId) {
    this.clientId = clientId;
    this.currentPage = 1;
    this.cardBody = $(".cardBody");
    this.modal = $("#conference-page");
    this.modalTitle = $("#conference-page-modalTitle");
    this.initForm();
  }
  async open() {
    if (this.clientId) {
      ConferenceServices.getConferences(this.clientId)
        .then((selectedRecords) => {
          this.populateFormFields(selectedRecords);
        })
        .then(() => {
          this.modalTitle.text("Conference");
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

  async populateFormFields(selectedRecords) {
    try {
      //const clientConferenceData = selectedRecords.ContactAddresses;
      this.cardBody.empty();

      if (selectedRecords && selectedRecords.length > 0) {
        selectedRecords.forEach((conference, index) => {
          const row = this.createConferenceRow(
            index + 1,
            conference.client,
            conference
          );
          this.cardBody.append(row);
        });
      } else {
        this.cardBody.append(this.noRecordDisplay());
      }
    } catch (error) {
      this.cardBody.append(this.noRecordDisplay());
      console.error("Error fetching and displaying client conference:", error);
    }
  }

  attachEventHandlers = () => {
    $("#btn-new-conference").on("click", this.newRecord);

    $("#records").on("click", "#btn-send-mail", (event) => {
      this.sendMail($(event.currentTarget));
    });

    $("#records").on("click", "#btn-view", (event) => {
      this.viewRecord($(event.currentTarget));
    });

    $("#records").on("click", "#btn-edit", (event) => {
      this.editRecord($(event.currentTarget));
    });

    $("#records").on("click", "#btn-delete", (event) => {
      // const id = .closest(".my-data-row").data("id");
      this.deleteRecord($(event.currentTarget));
    });

    $(".modal").on("hidden.bs.modal", () => {
      this.refreshPage();
    });
  };

  noRecordDisplay() {
    return `
      <div class="col-xl-12 col-sm-12">
        <div class="card">
          <div class="card-body" style="display: flex; justify-content: center; align-items: center;">No Records Found</div>
        </div>
      </div>`;
  }

  createConferenceRow(index, client, conference) {
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
            <div class="dropdown-menu dropdown-menu-end my-data-row" data-id="${conference._id}">
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
                src="/assets/images/profile_pictures/${client.image}"
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
              <a id="mobile-phone">${conference.date}</a>
            </p>
            <p class="text-muted mb-0 mt-2">
              <i class="mdi mdi-email font-size-15 align-middle pe-2 text-primary"></i>
              <a id="email">${conference.topic}</a>
            </p>
            <p class="text-muted mb-0 mt-2">
              <i class="mdi mdi-google-maps font-size-15 align-middle pe-2 text-primary"></i>
              <a id="residential-address">${conference.topic}</a>
            </p>
          </div>
        </div>

        <div class="btn-group my-data-email" role="group" data-id="${client.email}">
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

  sendMail = (event) => {
    const email = event.closest(".my-data-email").data("id");
    new EmailModule(email).composeEmail();
  };
  newRecord = () => {
    new ConferenceModalForm().new(this.clientId);
  };
  viewRecord = (event) => {
    const id = event.closest(".conference-data-row").data("id");

    new ConferenceModalForm(id).open();
  };

  editRecord = (event) => {
    const conferenceId = event.closest(".conference-data-row").data("id");

    new ConferenceModalForm(conferenceId).open();
  };

  deleteRecord = async (event) => {
    const conferenceId = event.closest(".conference-data-row").data("id");
    //ConferenceServices.deleteRecord(conferenceId);
    const deleteResult = await ConferenceServices.deleteRecord(conferenceId);
    if (deleteResult) this.refreshPage();
  };

  async refreshPage() {
    if (this.clientId) {
      ConferenceServices.getConferences(this.clientId)
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

export default ConferencePage;
