import endpointURL from "../configModule.js";
import ClientModalForm from "./clientModalForm.js";
import ClientProfileModal from "./clientProfileModule.js";
import ClientServices from "../services/clientServices.js";

class ClientManager {
  constructor() {
    this.rowsPerPage = 10;
    this.currentPage = 1;
    this.tableBody = $("#tableBody");
    this.paginationElement = $("#pagination");
    this.attachEventHandlers();
    this.displayClients();
  }

  attachEventHandlers() {
    $("#btn-new-client").on("click", this.newClientRecord.bind(this));
    $("#searchInput").on("keyup", this.handleSearch.bind(this));
    $("#records").on(
      "click",
      ".btn-manage",
      this.manageClientRecord.bind(this)
    );
    $("#records").on(
      "click",
      ".btn-view, .btn-edit",
      this.viewOrEditClientRecord.bind(this)
    );
    $("#records").on(
      "click",
      ".btn-delete",
      this.deleteClientRecord.bind(this)
    );
    $("#client-modal-form").on(
      "hidden.bs.modal",
      this.displayClients.bind(this)
    );
  }
  async deleteClient(id) {
    try {
      const confirmed = await this.confirmDelete();
      if (!confirmed) return;

      await $.ajax({
        url: `${endpointURL}deleteClient/${id}`,
        type: "DELETE",
        contentType: "application/json",
      });
      this.displayClients();
      alertify.notify("Record deleted successfully", "success", 5);
    } catch (error) {
      console.error("Error deleting client:", error);
      alertify.notify("Error deleting record", "warning", 5);
    }
  }
  confirmDelete() {
    return new Promise((resolve) => {
      alertify.confirm(
        "Confirmation",
        "Are you sure you want to delete this record?",
        resolve,
        () => {}
      );
    });
  }
  async displayClients() {
    try {
      const response = await ClientServices.getClients(
        this.currentPage,
        this.rowsPerPage
      );
      const { data, pagination } = response;
      this.renderTable(data);
      this.generatePagination(pagination.totalPages);
    } catch (error) {
      console.error("Error fetching and displaying clients:", error);
    }
  }

  renderTable(data) {
    this.tableBody.empty();
    if (data.length > 0) {
      data.forEach((client, index) => {
        this.tableBody.append(this.createClientRow(index + 1, client));
      });
    } else {
      this.tableBody.append(
        $("<tr><td colspan='6' style='text-align:center'>No Records</td></tr>")
      );
    }
  }

  createClientRow(index, client) {
    // Create client row HTML
    const clientCategory = client.clientCategory
      ? client.clientCategory.clientCategoryName
      : "N/A";

    return `
          <tr data-id='${client._id}'>
            <td>${index}</td>
            <td><a href='javascript:void(0);' class='btn-view text-primary text-body fw-bold'>${client.clientNumber}</a></td>
            <td>${client.clientName}</td>
            <td>${clientCategory}</td>
            <td>
              <p class="mb-1">Client Type: ${client.clientType}</p>
              <p class="mb-0">Ref Type: ${client.clientReferralType}</p>
            </td>
            <td style='text-align: middle'>
              <div class="dropdown">
                <a href="#" class="dropdown-toggle card-drop" data-bs-toggle="dropdown" aria-expanded="false">
                  <i class="mdi mdi-dots-horizontal font-size-18"></i>
                </a>
                <ul class="dropdown-menu dropdown-menu-end">
                  <li><a href="#" class="dropdown-item btn-manage"><i class="mdi mdi-account-details font-size-16 text-success me-1"></i>Manage</a></li>
                  <li><a href="#" class="dropdown-item btn-view"><i class="mdi mdi-eye font-size-16 text-success me-1"></i>View</a></li>
                  <li><a href="#" class="dropdown-item btn-edit"><i class="mdi mdi-pencil font-size-16 text-success me-1"></i>Edit</a></li>
                  <li><a href="#" class="dropdown-item btn-delete"><i class="mdi mdi-trash-can font-size-16 text-danger me-1"></i>Delete</a></li>
                </ul>
              </div>
            </td>
          </tr>`;
  }

  newClientRecord() {
    new ClientModalForm().new();
  }

  manageClientRecord(event) {
    const clientId = $(event.currentTarget).closest("tr").data("id");
    new ClientProfileModal(clientId).open();
  }

  viewOrEditClientRecord(event) {
    const clientId = $(event.currentTarget).closest("tr").data("id");
    new ClientModalForm(clientId).open();
  }

  deleteClientRecord(event) {
    const clientId = $(event.currentTarget).closest("tr").data("id");
    this.deleteClient(clientId);
  }

  handleSearch() {
    this.currentPage = 1;
    this.displayClients();
  }

  generatePagination(totalPages) {
    this.paginationElement.empty();

    for (let i = 1; i <= totalPages; i++) {
      const listItem = $("<li></li>").addClass("page-item");
      const link = $("<a></a>")
        .addClass("page-link")
        .attr("href", "javascript: void(0);")
        .text(i);

      if (i === this.currentPage) {
        listItem.addClass("active");
      }

      listItem.append(link);
      this.paginationElement.append(listItem);
    }

    this.attachPaginationEventHandlers();
  }

  attachPaginationEventHandlers() {
    $("#pagination").on("click", "a.page-link", () => {
      const page = parseInt($(this).text());
      if (!isNaN(page) && page !== this.currentPage) {
        this.currentPage = page;
        this.displayClients();
      }
    });
  }
}

new ClientManager();
