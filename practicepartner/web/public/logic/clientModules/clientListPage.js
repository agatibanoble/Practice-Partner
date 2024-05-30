import endpointURL from "../configModule.js";
import ClientModalForm from "./clientModalForm.js";
import ClientProfileModal from "./clientProfileModule.js";
import ClientServices from "../services/clientServices.js";

class ClientListPage {
  constructor() {
    this.rowsPerPage = 10;
    this.currentPage = 1;
    this.tableBody = $("#tableBody");
    this.paginationElement = $("#pagination");
    this.attachEventHandlers();
    this.renderTable();
  }

  attachEventHandlers() {
    // $("#btn-new-client").on("click", () => this.newClientRecord());
     $("#btn-new-client").on("click", this.newClientRecord)
    $("#searchInput").on("keyup", () => this.handleSearch());
    $("#records").on("click", ".btn-manage", (e) => this.manageClientRecord(e));
    $("#records").on("click", ".btn-view, .btn-edit", (e) => this.viewOrEditClientRecord(e));
    $("#records").on("click", ".btn-delete", (e) => this.deleteClientRecord(e));
    $("#client-modal-form").on("hidden.bs.modal", () => this.renderTable());
    this.paginationElement.on("click", "a.page-link", (e) => this.changePage(e));
  }

  async deleteClient(id) {
    try {
      await ClientServices.deleteRecord(id);
      this.renderTable();
    } catch (error) {
      console.error("Error deleting client:", error);
    }
  }

  async renderTable() {
    try {
      const { data, pagination } = await ClientServices.getClients(this.currentPage, this.rowsPerPage);
      this.tableBody.empty();
      if (data.length > 0) {
        data.forEach((client, index) => this.tableBody.append(this.createRow(index + 1, client)));
        this.generatePagination(pagination.totalPages);
      } else {
        this.tableBody.append("<tr><td colspan='6' style='text-align:center'>No Records</td></tr>");
      }
    } catch (error) {
      console.error("Error fetching and displaying clients:", error);
    }
  }

  createRow(index, client) {
    const clientCategory = client.clientCategory ? client.clientCategory.clientCategoryName : "N/A";

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
        <td>
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

  newClientRecord(event) {
     event.preventDefault();
     ClientModalForm.new();
  }

  manageClientRecord(event) {
    const clientId = $(event.currentTarget).closest("tr").data("id");
    new ClientProfileModal.open(clientId);
  }

  viewOrEditClientRecord(event) {
    const clientId = $(event.currentTarget).closest("tr").data("id");
    new ClientModalForm.open(clientId);
  }

  deleteClientRecord(event) {
    const clientId = $(event.currentTarget).closest("tr").data("id");
    this.deleteClient(clientId);
  }

  handleSearch() {
    this.currentPage = 1;
    this.renderTable();
  }

  generatePagination(totalPages) {
    this.paginationElement.empty();

    for (let i = 1; i <= totalPages; i++) {
      const listItem = $("<li></li>").addClass("page-item");
      const link = $("<a></a>")
        .addClass("page-link")
        .attr("href", "javascript:void(0);")
        .text(i);

      if (i === this.currentPage) {
        listItem.addClass("active");
      }

      listItem.append(link);
      this.paginationElement.append(listItem);
    }
  }

  changePage(event) {
    const page = parseInt($(event.target).text());
    if (!isNaN(page) && page !== this.currentPage) {
      this.currentPage = page;
      this.renderTable();
    }
  }
}

// new ClientListPage();
// Initialize the page when the script is loaded
$(document).ready(() => {
  new ClientListPage();
});
