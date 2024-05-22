import CourtServices from "../services/courtServices.js";
import CourtModalForm from "./courtModalForm.js";

class CourtListPage {
  constructor() {
    this.tableBody = $("#courtTableBody");
    this.modal = $("#court-modal-page");
    this.modalTitle = $("#court-modal-page-modalTitle");
    this.initForm();
  }

  async open() {
    CourtServices.getCourts()
      .then((selectedRecords) => {
        this.renderTable(selectedRecords);
      })
      .then(() => {
        this.modalTitle.text("List of Court");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    this.modal.css("display", "block").modal("show");
  }

  async renderTable(selectedRecords) {
    try {
      this.tableBody.empty();
      if (selectedRecords && selectedRecords.length > 0) {
        selectedRecords.forEach((Court, index) => {
          const row = this.createCourtRow(index + 1, Court);
          this.tableBody.append(row);
        });
      } else {
        this.tableBody.append(this.noRecordDisplay());
      }
    } catch (error) {
      this.tableBody.append(this.noRecordDisplay());
      console.error("Error fetching and displaying courts:", error);
    }
  }

  attachEventHandlers = () => {
    $("#btn-new-court").on("click", () => {
      CourtModalForm.new();
    });

    this.tableBody.on("click", ".btn-edit", (event) => {
      const CourtId = $(event.currentTarget).closest("tr").data("id");
      CourtModalForm.open(CourtId);
    });

    this.tableBody.on("click", ".btn-delete", async (event) => {
      const CourtId = $(event.currentTarget).closest("tr").data("id");
      const deleteResult = await CourtServices.deleteRecord(CourtId);
      if (deleteResult) this.refreshPage();
    });

    $(".modal").on("hidden.bs.modal", () => {
      this.refreshPage();
    });
  };

  noRecordDisplay() {
    return `<tr><td colspan='4' style='text-align:center'>No Records</td></tr>`;
  }

  createCourtRow(index, Court) {
    return `
      <tr data-id='${Court._id}'>
        <td> ${index} </td>
        <td> ${Court.CourtName} </td>
        <td style='text-align: middle'>
          <div class="dropdown">
            <a href="#" class="dropdown-toggle card-drop" data-bs-toggle="dropdown" aria-expanded="false">
              <i class="mdi mdi-dots-horizontal font-size-18"></i>
            </a>
            <ul class="dropdown-menu dropdown-menu-end">
              <li><a href="#" class="dropdown-item btn-edit"><i class="mdi mdi-pencil font-size-16 text-success me-1"></i>Edit</a></li>
              <li><a href="#" class="dropdown-item btn-delete"><i class="mdi mdi-trash-can font-size-16 text-danger me-1"></i>Delete</a></li>
            </ul>
          </div>
        </td>
      </tr>`;
  }

  async refreshPage() {
    CourtServices.getCourts()
      .then((selectedRecords) => {
        this.renderTable(selectedRecords);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  async initForm() {
    $(document).ready(async () => {
      try {
        this.attachEventHandlers();
      } catch (error) {
        console.error("Error initializing form:", error);
      }
    });
  }
}

export default CourtListPage;
