import { formatDate } from "../helperModules/dateFormater.js";
import ComplaintModalForm from "./complaintModalForm.js";
import ComplaintServices from "../services/complaintServices.js";

class ComplaintListPage {
  constructor() {
    this.rowsPerPage = 10;
    this.currentPage = 1;
    this.tableBody = $("#complaintTableBody");
    this.paginationElement = $("#pagination");
    this.attachEventHandlers();
    this.renderTable();
  }

  attachEventHandlers() {
    $("#btn-new-complaint").on("click", this.newComplaintRecord.bind(this));
    $("#searchInput").on("keyup", this.handleSearch.bind(this));
    $("#records").on(
      "click",
      ".btn-manage",
      this.manageComplaintRecord.bind(this)
    );
    $("#records").on(
      "click",
      ".btn-edit",
      this.viewOrEditComplaintRecord.bind(this)
    );
    $("#records").on(
      "click",
      ".btn-delete",
      this.deleteComplaintRecord.bind(this)
    );
    $("#complaint-modal-form").on(
      "hidden.bs.modal",
      this.renderTable.bind(this)
    );
    this.paginationElement.on(
      "click",
      "a.page-link",
      this.handlePageClick.bind(this)
    );
  }

  async deleteComplaint(id) {
    try {
      await ComplaintServices.deleteRecord(id);
      this.renderTable();
    } catch (error) {
      console.error("Error deleting complaint:", error);
    }
  }

  async renderTable() {
    const { data, pagination } = await ComplaintServices.getComplaints(
      this.currentPage,
      this.rowsPerPage
    );
    this.tableBody.empty();

    if (data.length > 0) {
      data.forEach((record, index) => {
        this.tableBody.append(this.createRow(index + 1, record));
      });
      this.generatePagination(pagination.totalPages);
    } else {
      this.tableBody.append(
        $("<tr><td colspan='11' style='text-align:center'>No Records</td></tr>")
      );
    }
  }

  createRow(index, record) {
    return `
      <tr data-id='${record._id}'>
        <td>${index}</td>
        <td>${record.complaintNumber}</td>
        <td>${record.title}</td>
        <td>${record.description || ""}</td>
        <td>${record.department || "Not Provided"}</td>
        <td>${record.status || "Not Provided"}</td>
        <td>${formatDate(record.dateFiled, "d-m-Y")}</td>
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

  newComplaintRecord() {
    new ComplaintModalForm().new();
  }

  manageComplaintRecord(event) {
    const complaintId = $(event.currentTarget).closest("tr").data("id");
    new ComplaintProfileModal(complaintId).open();
  }

  viewOrEditComplaintRecord(event) {
    const complaintId = $(event.currentTarget).closest("tr").data("id");
    ComplaintModalForm.open(complaintId);
  }

  deleteComplaintRecord(event) {
    const complaintId = $(event.currentTarget).closest("tr").data("id");
    this.deleteComplaint(complaintId);
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
        .attr("href", "javascript: void(0);")
        .text(i);

      if (i === this.currentPage) {
        listItem.addClass("active");
      }

      listItem.append(link);
      this.paginationElement.append(listItem);
    }
  }

  handlePageClick(event) {
    const page = parseInt($(event.currentTarget).text());
    if (!isNaN(page) && page !== this.currentPage) {
      this.currentPage = page;
      this.renderTable();
    }
  }
}

new ComplaintListPage();
