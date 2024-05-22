import { formatDate } from "../helperModules/dateFormater.js";
import endpointURL from "../configModule.js";
import CaseModalForm from "./caseModalForm.js";
import CaseServices from "../services/caseServices.js";
import checkField from "../helperModules/checkField.js";

class CaseManager {
  constructor() {
    this.rowsPerPage = 10;
    this.currentPage = 1;
    this.tableBody = $("#tableBody");
    this.paginationElement = $("#pagination");
    this.attachEventHandlers();
    this.displayCases();
  }

  attachEventHandlers() {
    $("#btn-new-case").on("click", this.newCaseRecord.bind(this));
    $("#searchInput").on("keyup", this.handleSearch.bind(this));
    $("#records").on("click", ".btn-manage", this.manageCaseRecord.bind(this));
    $("#records").on(
      "click",
      ".btn-edit",
      this.viewOrEditCaseRecord.bind(this)
    );
    $("#records").on("click", ".btn-delete", this.deleteCaseRecord.bind(this));
    $("#case-modal-form").on("hidden.bs.modal", this.displayCases.bind(this));
    this.paginationElement.on(
      "click",
      "a.page-link",
      this.handlePageClick.bind(this)
    );
  }

  async deleteCase(id) {
    try {
      await CaseServices.deleteRecord(id);
      this.displayCases();
    } catch (error) {
      console.error("Error deleting case:", error);
    }
  }

  async displayCases() {
    try {
      const response = await CaseServices.getCases(
        this.currentPage,
        this.rowsPerPage
      );
      const { data, pagination } = response;
      this.renderTable(data);
      this.generatePagination(pagination.totalPages);
    } catch (error) {
      console.error("Error fetching and displaying cases:", error);
    }
  }

  renderTable(data) {
    this.tableBody.empty();
    if (data.length > 0) {
      data.forEach((record, index) => {
        this.tableBody.append(this.createCaseRow(index + 1, record));
      });
    } else {
      this.tableBody.append(
        $("<tr><td colspan='8' style='text-align:center'>No Records</td></tr>")
      );
    }
  }

  createCaseRow(index, record) {
    const caseCategory = record.caseCategory
      ? record.caseCategory.caseCategoryName
      : "N/A";
    return `
      <tr data-id='${record._id}'>
        <td>${index}</td>
        <td>
          <p class="mb-1">Folio:<a href='javascript:void(0);' class='btn-view text-primary text-body fw-bold'>${
            record.folioNumber
          }</a></p>
          <p class="mb-1">Case#: ${record.caseNumber}</p>
        </td>
        <td>
          <p class="mb-1">Client#: ${record.client.clientNumber}</p>
          <p class="mb-1">Client: ${
            record.client.clientName ? record.client.clientName : ""
          }</p>
        </td>
        <td>${record.caseTitle}</td>
        <td>
          <p class="mb-1">Category: ${caseCategory}</p>
          <p class="mb-0">Court: ${
            record.court ? record.court.courtName : "Not Provided"
          }</p>
        </td>
        <td>
          <p class="mb-1">Start: ${formatDate(
            record.caseStartDate,
            "d-m-Y"
          )}</p>
          <p class="mb-0">End: ${formatDate(record.caseEndDate, "d-m-Y")}</p>
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

  newCaseRecord() {
    new CaseModalForm().new();
  }

  manageCaseRecord(event) {
    const caseId = $(event.currentTarget).closest("tr").data("id");
    new CaseProfileModal(caseId).open();
  }

  viewOrEditCaseRecord(event) {
    const caseId = $(event.currentTarget).closest("tr").data("id");
    new CaseModalForm(caseId).open();
  }

  deleteCaseRecord(event) {
    const caseId = $(event.currentTarget).closest("tr").data("id");
    this.deleteCase(caseId);
  }

  handleSearch() {
    this.currentPage = 1;
    this.displayCases();
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
      this.displayCases();
    }
  }
}

new CaseManager();
