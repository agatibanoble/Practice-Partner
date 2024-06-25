import DeliveryTypeServices from "../services/deliveryTypeServices.js";
import DeliveryTypeModalForm from "./deliveryTypeModalForm.js";

class DeliveryTypeListPage {
  constructor() {
    this.tableBody = $("#deliveryTypeTableBody");
    this.modal = $("#delivery-type-modal-page");
    this.modalTitle = $("#delivery-type-modal-page-modalTitle");
    this.initForm();
  }

  async open() {
    DeliveryTypeServices.getDeliveryTypes()
      .then((selectedRecords) => {
        this.renderTable(selectedRecords);
      })
      .then(() => {
        this.modalTitle.text("List of Delivery Types");
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
        selectedRecords.forEach((deliveryType, index) => {
          const row = this.createDeliveryTypeRow(index + 1, deliveryType);
          this.tableBody.append(row);
        });
      } else {
        this.tableBody.append(this.noRecordDisplay());
      }
    } catch (error) {
      this.tableBody.append(this.noRecordDisplay());
      console.error("Error fetching and displaying delivery types:", error);
    }
  }

  attachEventHandlers = () => {
    $("#btn-new-delivery-type").on("click", () => {
      DeliveryTypeModalForm.new();
    });

    this.tableBody.on("click", ".btn-edit", (event) => {
      const deliveryTypeId = $(event.currentTarget).closest("tr").data("id");
      DeliveryTypeModalForm.open(deliveryTypeId);
    });

    this.tableBody.on("click", ".btn-delete", async (event) => {
      const deliveryTypeId = $(event.currentTarget).closest("tr").data("id");
      const deleteResult = await DeliveryTypeServices.deleteRecord(
        deliveryTypeId
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

  createDeliveryTypeRow(index, deliveryType) {
    return `
      <tr data-id='${deliveryType._id}'>
        <td> ${index} </td>
        <td> ${deliveryType.deliveryTypeName} </td>
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
    DeliveryTypeServices.getDeliveryTypes()
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

export default DeliveryTypeListPage;
