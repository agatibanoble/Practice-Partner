import ClientCategoryServices from "../services/clientCategoryServices.js";
import clientCategoryModalForm from "./clientCategoryModalForm.js";

class ClientCategoryListPage {
  constructor() {
    this.tableBody = $("#clientCategoryTableBody");
    this.modal = $("#client-category-modal-page");
    this.modalTitle = $("#client-category-modal-page-modalTitle");
    this.initForm();
  }

  async open() {
    ClientCategoryServices.getClientCategories()
      .then((selectedRecords) => {
        this.renderTable(selectedRecords);
      })
      .then(() => {
        this.modalTitle.text("List of Client Categories");
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
        selectedRecords.forEach((clientCategory, index) => {
          const row = this.createClientCategoryRow(index + 1, clientCategory);
          this.tableBody.append(row);
        });
      } else {
        this.tableBody.append(this.noRecordDisplay());
      }
    } catch (error) {
      this.tableBody.append(this.noRecordDisplay());
      console.error("Error fetching and displaying client categories:", error);
    }
  }

  attachEventHandlers = () => {
    $("#btn-new-client-category").on("click", () => {
      clientCategoryModalForm.new();
    });

    this.tableBody.on("click", ".btn-edit", (event) => {
      const clientCategoryId = $(event.currentTarget).closest("tr").data("id");
      clientCategoryModalForm.open(clientCategoryId);
    });

    this.tableBody.on("click", ".btn-delete", async (event) => {
      const clientCategoryId = $(event.currentTarget).closest("tr").data("id");
      const deleteResult = await ClientCategoryServices.deleteRecord(
        clientCategoryId
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

  createClientCategoryRow(index, clientCategory) {
    return `
      <tr data-id='${clientCategory._id}'>
        <td> ${index} </td>
        <td> ${clientCategory.clientCategoryName} </td>
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
    ClientCategoryServices.getClientCategories()
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

export default ClientCategoryListPage;
