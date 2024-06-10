import DocumentTypeServices from "../services/documentTypeServices.js";
import DocumentTypeModalForm from "./documentTypeModalForm.js";

class DocumentTypeListPage {
  constructor() {
    this.tableBody = $("#documentTypeTableBody");
    this.modal = $("#document-type-modal-page");
    this.modalTitle = $("#document-type-modal-page-modalTitle");
    this.initForm();
  }

  async open() {
    DocumentTypeServices.getDocumentTypes()
      .then((selectedRecords) => {
        this.renderTable(selectedRecords);
      })
      .then(() => {
        this.modalTitle.text("List of Document Types");
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
        selectedRecords.forEach((documentType, index) => {
          const row = this.createDocumentTypeRow(index + 1, documentType);
          this.tableBody.append(row);
        });
      } else {
        this.tableBody.append(this.noRecordDisplay());
      }
    } catch (error) {
      this.tableBody.append(this.noRecordDisplay());
      console.error("Error fetching and displaying document types:", error);
    }
  }

  attachEventHandlers = () => {
    $("#btn-new-document-type").on("click", () => {
      DocumentTypeModalForm.new();
    });

    this.tableBody.on("click", ".btn-edit", (event) => {
      const documentTypeId = $(event.currentTarget).closest("tr").data("id");
      DocumentTypeModalForm.open(documentTypeId);
    });

    this.tableBody.on("click", ".btn-delete", async (event) => {
      const documentTypeId = $(event.currentTarget).closest("tr").data("id");
      const deleteResult = await DocumentTypeServices.deleteRecord(
        documentTypeId
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

  createDocumentTypeRow(index, documentType) {
    return `
      <tr data-id='${documentType._id}'>
        <td> ${index} </td>
        <td> ${documentType.documentTypeName} </td>
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
    DocumentTypeServices.getDocumentTypes()
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

export default DocumentTypeListPage;
