import EmployeeCategoryServices from "../services/employeeCategoryServices.js";
import EmployeeCategoryModalForm from "./employeeCategoryModalForm.js";

class EmployeeCategoryListPage {
  constructor() {
    this.tableBody = $("#employeeCategoryTableBody");
    this.modal = $("#employee-category-modal-page");
    this.modalTitle = $("#employee-category-modal-page-modalTitle");
    this.initForm();
  }

  async open() {
    EmployeeCategoryServices.getEmployeeCategories()
      .then((selectedRecords) => {
        this.renderTable(selectedRecords);
      })
      .then(() => {
        this.modalTitle.text("List of Employee Categories");
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
        selectedRecords.forEach((employeeCategory, index) => {
          const row = this.createEmployeeCategoryRow(
            index + 1,
            employeeCategory
          );
          this.tableBody.append(row);
        });
      } else {
        this.tableBody.append(this.noRecordDisplay());
      }
    } catch (error) {
      this.tableBody.append(this.noRecordDisplay());
      console.error(
        "Error fetching and displaying employee categories:",
        error
      );
    }
  }

  attachEventHandlers = () => {
    $("#btn-new-employee-category").on("click", () => {
      EmployeeCategoryModalForm.new();
    });

    this.tableBody.on("click", ".btn-edit", (event) => {
      const employeeCategoryId = $(event.currentTarget)
        .closest("tr")
        .data("id");
      EmployeeCategoryModalForm.open(employeeCategoryId);
    });

    this.tableBody.on("click", ".btn-delete", async (event) => {
      const employeeCategoryId = $(event.currentTarget)
        .closest("tr")
        .data("id");
      const deleteResult = await EmployeeCategoryServices.deleteRecord(
        employeeCategoryId
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

  createEmployeeCategoryRow(index, employeeCategory) {
    return `
      <tr data-id='${employeeCategory._id}'>
        <td> ${index} </td>
        <td> ${employeeCategory.employeeCategoryName} </td>
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
    EmployeeCategoryServices.getEmployeeCategories()
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

export default EmployeeCategoryListPage;
