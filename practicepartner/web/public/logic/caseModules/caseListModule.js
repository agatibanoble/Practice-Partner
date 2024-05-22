
import {formatDate } from "../helperModules/dateFormater.js"
// mainModule.js
// import { generatePagination } from "../paginationModules/paginationModule.js";
import endpointURL from "../configModule.js";
import CaseModalModule from "./caseModalModule.js";

$(document).ready(function () {
  const rowsPerPage = 10;
  let currentPage = 1;
  let currentIndex = 0;

  const tableBody = $("#tableBody");
  const paginationElement = $("#pagination");

  const attachEventHandlers = () => {
    $("#searchInput").on("keyup", function () {
      currentPage = 1;
      fetchAndDisplayClients();
    });

    $("#records").on("click", ".btn-manage", function () {
      manageCaseRecord($(this));
    });

    $("#records").on("click", ".btn-view", function () {
      viewCaseRecord($(this));
    });

    $("#records").on("click", ".btn-edit", function () {
      editCaseRecord($(this));
    });

    $("#records").on("click", ".btn-delete", function () {
      deleteCaseRecord($(this));
    });
    // Attach an event listener to the modal's hidden.bs.modal event
    $("#case-modal-form").on("hidden.bs.modal", function () {
      fetchAndDisplayClients();
      // Refresh the page when the modal is hidden (completed its functions)
      // window.location.reload();
    });
  };

  const fetchCases = async (currentPage, rowsPerPage) => {
    try {
      const response = await $.ajax({
        url: `${endpointURL}getCases`,
        type: "GET",
        data: { page: currentPage, limit: rowsPerPage },
        contentType: "application/json",
      });
      console.log(response);
      return response;
    } catch (error) {
      console.error("Error fetching cases:", error);
      throw error;
    }
  };
  const deleteCase = (id, row) => {
    // Show confirmation prompt
    alertify.confirm(
      "Confirmation",
      "Are you sure you want to delete this record?",
      function () {
        // Perform AJAX request to delete record
        $.ajax({
          url: `${endpointURL}deleteCase/${id}`,
          type: "DELETE",
          contentType: "application/json",
          success: function () {
            // Remove the row from the table
            // row.remove();

            alertify.notify("Record deleted successfully", "success", 5);
            fetchAndDisplayClients();
          },
          error: function (xhr, status, error) {
            // Handle error
            alertify.notify("Error deleting record", "warning", 5);
          },
        });
      },
      function () {
        // User clicked Cancel
        alertify.notify("Deletion canceled by user", "info", 5);
        console.log("Deletion canceled by user");
      }
    );
  };

  const fetchAndDisplayClients = async () => {
    try {
      const response = await fetchCases(currentPage, rowsPerPage);
      const { count, data, pagination } = response;

      tableBody.empty();
      if (data.length > 0) {
        $.each(data, function (index, client) {
          tableBody.append(createCaseRow(index + 1, client));
        });
        console.log(tableBody);
      } else {
        tableBody.append(
          $(
            "<tr><td colspan='8' style='text-align:center'>No Records</td></tr>"
          )
        );
      }
      $("");
      generatePagination(pagination.totalPages, currentPage, paginationElement);
    } catch (error) {
      console.error("Error fetching and displaying clients:", error);
    }
  };

  // Function implementation here
  function createCaseRow(index, client) {
    const caseCategory = client.caseCategoryId
      ? client.caseCategoryId.caseCategoryName
      : "N/A";

    return `
          <tr data-id='${client._id}'>
            <td>${index}</td>
            <td><p class="mb-1">Folio:<a href='javascript:void(0);' class='btn-view text-primary text-body fw-bold'>${client.folioNumber}</a></p><p class="mb-1">Case#: ${client.caseNumber}</p></td>
            <td><p class="mb-1">Client#:${client.clientId.clientNumber}</p><p class="mb-1">Client:${client.clientId.clientName}</p></td>
            <td>${client.caseTitle}</td>
            <td>
              <p class="mb-1">Category: ${caseCategory}</p>
              <p class="mb-0">Court: ${client.courtId.courtName}</p>
            </td>
            <td>
              <p class="mb-1">Start: ${formatDate(client.caseStartDate, 'd-m-Y')}</p>
              <p class="mb-0">End: ${formatDate(client.caseEndDate, 'd-m-Y')}</p>
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

  const manageCaseRecord = (btn) => {
    // Function implementation here
    var row = btn.closest("tr");
    var id = row.data("id");
    window.location.href = "manageClient/" + id; // Replace with your desired URL
  };

  const viewCaseRecord = (btn) => {
    // Function implementation here
    var row = btn.closest("tr");
    var id = row.data("id");
    console.log(id);
    CaseModalModule.populateModalForm(id, true);
  };

  const editCaseRecord = (btn) => {
    // Function implementation here
    var row = btn.closest("tr");
    var id = row.data("id");
    console.log(id);
    CaseModalModule.populateModalForm(id, false);
  };

  const deleteCaseRecord = async (btn) => {
    // Function implementation here
    // Function implementation here
    var row = btn.closest("tr");
    var id = row.data("id");
    deleteCase(id, row);
  };
  // paginationModule.js
  const generatePagination = (totalPages, currentPage, paginationElement) => {
    paginationElement.empty();

    for (let i = 1; i <= totalPages; i++) {
      const listItem = $("<li></li>").addClass("page-item");
      const link = $("<a></a>")
        .addClass("page-link")
        .attr("href", "javascript: void(0);")
        .text(i);

      if (i === currentPage) {
        listItem.addClass("active");
      }

      listItem.append(link);
      paginationElement.append(listItem);
    }

    attachPaginationEventHandlers();
  };

  const attachPaginationEventHandlers = () => {
    $("#pagination").on("click", "a.page-link", function () {
      const page = parseInt($(this).text());
      if (!isNaN(page) && page !== currentPage) {
        currentPage = page;
        fetchAndDisplayClients();
      }
    });
  };
  attachEventHandlers();
  fetchAndDisplayClients();
});
// export { fetchCases, deleteCase };
