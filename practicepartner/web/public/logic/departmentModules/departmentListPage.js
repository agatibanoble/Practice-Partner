import DepartmentServices from "../services/departmentServices.js";
import DepartmentModalForm from "./departmentModalForm.js";

class DepartmentListPage {
  constructor() {
    this.tableBody = $("#departmentTableBody");
    this.modal = $("#department-modal-page");
    this.modalTitle = $("#department-modal-page-modalTitle");
    this.initForm();
  }

  async open() {
    DepartmentServices.getDepartments()
      .then((selectedRecords) => {
        this.renderTable(selectedRecords);
      })
      .then(() => {
        this.modalTitle.text("List of Departments");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    console.log("selectedRecords");
    this.modal.css("display", "block").modal("show");
  }

  async renderTable(selectedRecords) {
    try {
      this.tableBody.empty();
      if (selectedRecords && selectedRecords.length > 0) {
        selectedRecords.forEach((department, index) => {
          const row = this.createDepartmentRow(index + 1, department);
          this.tableBody.append(row);
        });
      } else {
        this.tableBody.append(this.noRecordDisplay());
      }
    } catch (error) {
      this.tableBody.append(this.noRecordDisplay());
      console.error("Error fetching and displaying departments:", error);
    }
  }

  attachEventHandlers = () => {
    $("#btn-new-department").on("click", () => {
      DepartmentModalForm.new();
    });

    this.tableBody.on("click", ".btn-edit", (event) => {
      const departmentId = $(event.currentTarget).closest("tr").data("id");
      DepartmentModalForm.open(departmentId);
    });

    this.tableBody.on("click", ".btn-delete", async (event) => {
      const departmentId = $(event.currentTarget).closest("tr").data("id");
      const deleteResult = await DepartmentServices.deleteRecord(
        departmentId
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

  createDepartmentRow(index, department) {
    return `
      <tr data-id='${department._id}'>
        <td> ${index} </td>
        <td> ${department.departmentName} </td>
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
    DepartmentServices.getDepartments()
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

export default DepartmentListPage;
