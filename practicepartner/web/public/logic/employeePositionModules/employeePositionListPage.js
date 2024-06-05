import EmployeePositionServices from "../services/employeePositionServices.js";
import EmployeePositionModalForm from "./employeePositionModalForm.js";

class EmployeePositionListPage {
  constructor() {
    this.tableBody = $("#employeePositionTableBody");
    this.modal = $("#employee-position-modal-page");
    this.modalTitle = $("#employee-position-modal-page-modalTitle");
    this.initForm();
  }

  async open() {
    EmployeePositionServices.getEmployeePositions()
      .then((selectedRecords) => {
        this.renderTable(selectedRecords);
      })
      .then(() => {
        this.modalTitle.text("List of Employee Positions");
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
        selectedRecords.forEach((employeePosition, index) => {
          const row = this.createEmployeePositionRow(
            index + 1,
            employeePosition
          );
          this.tableBody.append(row);
        });
      } else {
        this.tableBody.append(this.noRecordDisplay());
      }
    } catch (error) {
      this.tableBody.append(this.noRecordDisplay());
      console.error("Error fetching and displaying employee positions:", error);
    }
  }

  attachEventHandlers = () => {
    $("#btn-new-employee-position").on("click", () => {
      EmployeePositionModalForm.new();
    });

    this.tableBody.on("click", ".btn-edit", (event) => {
      const employeePositionId = $(event.currentTarget)
        .closest("tr")
        .data("id");
      EmployeePositionModalForm.open(employeePositionId);
    });

    this.tableBody.on("click", ".btn-delete", async (event) => {
      const employeePositionId = $(event.currentTarget)
        .closest("tr")
        .data("id");
      const deleteResult = await EmployeePositionServices.deleteRecord(
        employeePositionId
      );
      if (deleteResult) this.refreshPage();
    });

    $(".modal").on("hidden.bs.modal", () => {
      this.refreshPage();
    });
  };

  noRecordDisplay() {
    return `<tr><td colspan='4' style='text-align:center'>No Records</td></tr>`;
  }

  createEmployeePositionRow(index, employeePosition) {
    return `
      <tr data-id='${employeePosition._id}'>
        <td> ${index} </td>
        <td> ${employeePosition.employeePositionName} </td>
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
    EmployeePositionServices.getEmployeePositions()
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

export default EmployeePositionListPage;
