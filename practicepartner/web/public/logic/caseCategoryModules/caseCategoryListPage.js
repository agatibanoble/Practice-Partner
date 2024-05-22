import CaseCategoryServices from "../services/caseCategoryServices.js";
import CaseCategoryModalForm from "./caseCategoryModalForm.js";

class CaseCategoryListPage {
  constructor() {
    this.tableBody = $("#caseCategoryTableBody");
    this.modal = $("#case-category-modal-page");
    this.modalTitle = $("#case-category-modal-page-modalTitle");
    this.initForm();
  }

  async open() {
    CaseCategoryServices.getCaseCategories()
      .then((selectedRecords) => {
        this.renderTable(selectedRecords);
      })
      .then(() => {
        this.modalTitle.text("List of Case Categories");
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
        selectedRecords.forEach((caseCategory, index) => {
          const row = this.createCaseCategoryRow(index + 1, caseCategory);
          this.tableBody.append(row);
        });
      } else {
        this.tableBody.append(this.noRecordDisplay());
      }
    } catch (error) {
      this.tableBody.append(this.noRecordDisplay());
      console.error("Error fetching and displaying case categories:", error);
    }
  }

  attachEventHandlers = () => {
    $("#btn-new-case-category").on("click", () => {
      CaseCategoryModalForm.new();
    });

    this.tableBody.on("click", ".btn-edit", (event) => {
      const caseCategoryId = $(event.currentTarget).closest("tr").data("id");
      CaseCategoryModalForm.open(caseCategoryId);
    });

    this.tableBody.on("click", ".btn-delete", async (event) => {
      const caseCategoryId = $(event.currentTarget).closest("tr").data("id");
      const deleteResult = await CaseCategoryServices.deleteRecord(
        caseCategoryId
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

  createCaseCategoryRow(index, caseCategory) {
    return `
      <tr data-id='${caseCategory._id}'>
        <td> ${index} </td>
        <td> ${caseCategory.caseCategoryName} </td>
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
    CaseCategoryServices.getCaseCategories()
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

export default CaseCategoryListPage;
