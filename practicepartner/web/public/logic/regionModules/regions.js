var index = 0;
var regions = []; // Define regions array outside the $(document).ready() function

$(document).ready(function () {
  var rowsPerPage = 10;
  var currentPage = 1;
  var currentIndex = 0; // Initialize current index

  // View button click
  $("#records").on("click", ".view-btn", function () {
    var row = $(this).closest("tr");
    var id = row.data("id");
    // AJAX call to fetch record data
    $.ajax({
      url: "getRegionById/" + id, // Replace with your actual endpoint
      type: "GET",
      data: { id: id },
      success: function (response) {
        // Populate modal form with fetched data
        $("#region-name").val(response.regionName).prop("disabled", true); // Disable the input field;
        $("#country").val(response.country).prop("disabled", true); // Disable the input field;
        $("#saveButton").hide();
        // Display the modal
        $("#recordModal").css("display", "block");
        $("#recordModal").modal("show");
      },
      error: function (xhr, status, error) {
        console.error("Error fetching record:", error);
      },
    });
  });

  // Edit button click
  $("#records").on("click", ".edit-btn", function () {
    var row = $(this).closest("tr");
    var id = row.data("id");
    // AJAX call to fetch record data
    $.ajax({
      url: "getRegionById/" + id, // Replace with your actual endpoint
      type: "GET",
      data: { id: id },
      success: function (response) {
        // Populate modal form with fetched data
        $("#region-name").val(response.regionName).prop("disabled", false); // Disable the input field;
        $("#country").val(response.country).prop("disabled", false); // Disable the input field;
        $("#_region_id").val(response._id).prop("disabled", false); // Disable the input field;
        $("#saveButton").show();
        // Display the modal
        $("#recordModal").css("display", "block");
        $("#recordModal").modal("show");
      },
      error: function (xhr, status, error) {
        console.error("Error fetching record:", error);
      },
    });
  });

  // Delete button click
  $("#records").on("click", ".delete-btn", function () {
    var row = $(this).closest("tr");
    var id = row.data("id");

    // Show Alertify confirmation prompt
    alertify.confirm(
      "Confirmation",
      "Are you sure you want to delete this record?",
      function () {
        // User clicked OK, perform fetch to delete record
        fetch("deleteRegion/" + id, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: id }), // Pass the record ID to delete
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Error deleting record");
            }
            // Remove the row from the table
            row.remove();
            alertify.notify("Record deleted successfully", "success", 5);
            console.log("Record deleted successfully:", id);
          })
          .catch((error) => {
            // Handle error
            alertify.notify("Error deleting record", "warning", 5);
            console.error("Error deleting record:", error);
          });
      },
      function () {
        // User clicked Cancel
        alertify.notify("Deletion canceled by user", "info", 5);
        console.log("Deletion canceled by user");
      }
    );
  });

  // Form submission handling
  $("#recordForm").on("submit", function (event) {
    event.preventDefault();
    var form = $(this)[0];
    if (!form.checkValidity()) {
      event.stopPropagation();
      alertify.alert(
        "Attention!!!",
        "Please fill out all required fields.",
        function () {
          // Callback function
          // Displaying another notification at the bottom right
          alertify.notify("Carefully fill the form and resubmit", "success", 5);
        }
      );
    } else {
      var formData = new FormData(form);
      // Assuming you have an endpoint named 'saveRegion' to handle form submission
      fetch("saveRegion", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json()) // Parse response as JSON
        .then((response) => {
          console.log(response);
          if (response.success) {
            // If the response is okay, do something (e.g., show success message)
            alertify.alert("Success", response.message, function () {
              // Callback function
              // Displaying another notification at the bottom right
              alertify.notify("Thank You.", "success", 5);

              // Check if the region already exists in the table
              var existingRow = $(
                `#tableBody tr[data-id="${response.region._id}"]`
              );
              if (existingRow.length) {
                // If the region already exists, replace the row
                var newRow = createRegionRow(0, response.region); // Assuming 'index' is defined
                existingRow.replaceWith(newRow);
              } else {
                // If the region is new, append it as the first row
                var newRow = createRegionRow(index + 1, response.region); // Assuming 'index' is defined
                $("#tableBody").prepend(newRow);
              }
            });
          } else {
            // If there's an error in response, handle it accordingly
            alertify.alert(
              "Warning!",
              "Your request did not complete successfully.",
              function () {
                // Callback function
                // Displaying another notification at the bottom right
                alertify.notify("Check and try again", "warning", 5);
              }
            );
          }
        })
        .catch((error) => {
          // If there's a network error, handle it here
          alertify.alert(
            "Attention!!! Network Challenges",
            "We could not connect to the database due to network challenges.",
            function () {
              // Callback function
              // Displaying another notification at the bottom right
              alertify.notify("Check your network connectivity", "danger", 5);
            }
          );
        });
    }
    form.classList.add("was-validated");
  });

  ///////////////////////////////////////////////////////////////////////////
  // Initial data fetch
  displayRegions();

  $("#searchInput").on("keyup", function () {
    currentPage = 1;
    displayRegions();
  });

  $("#pagination").on("click", "a.page-link", function (event) {
    currentPage = parseInt($(this).text());
    displayRegions();
  });

  function displayRegions() {
    var startIndex = (currentPage - 1) * rowsPerPage;
    var searchTerm = $("#searchInput").val().toLowerCase();

    // Fetch data from the server
    $.ajax({
      url: "/getRegions",
      type: "GET",
      data: {
        page: currentPage,
        limit: rowsPerPage,
        searchTerm: searchTerm,
      },
      success: function (response) {
        regions = response.data; // Update regions array
        var pagination = response.pagination;

        $("#tableBody").empty();

        // Display regions in the table
        if (regions.length > 0) {
          // If there are regions, iterate over them and append rows to the table
          regions.forEach(function (region, index) {
            // var row = createRegionRow(index + 1, region); // Add 1 to index to start from 1
            var row = createRegionRow(startIndex + index + 1, region); // Use startIndex and increment index
            $("#tableBody").append(row);
          });
          currentIndex = startIndex + 1; // Update current index
          // renderSortedData("region_name", "asc"); // Call renderSortedData after updating regions
        } else {
          // If there are no regions, display a single row with "No Records" message
          var noRecordsRow =
            "<tr><td colspan='4' style='text-align:center'>No Records</td></tr>";
          $("#tableBody").append(noRecordsRow);
        }

        generatePagination(pagination.totalPages);
      },
      error: function (xhr, status, error) {
        console.error("Error fetching data:", error);
        // Handle error here, such as displaying an error message
      },
    });
  }

  // Function to generate pagination
  function generatePagination(totalPages) {
    var paginationElement = $("#pagination");
    paginationElement.empty();

    // Page numbers
    for (var i = 1; i <= totalPages; i++) {
      var listItem = $("<li></li>").addClass("page-item");
      var link = $("<a></a>")
        .addClass("page-link")
        .attr("href", "javascript: void(0);")
        .text(i);
      if (i === currentPage) {
        listItem.addClass("active");
      }
      listItem.append(link);
      paginationElement.append(listItem);
    }

    // Attach event handler to page links
    paginationElement.on("click", "a.page-link", function () {
      var page = parseInt($(this).text());
      if (!isNaN(page)) {
        currentPage = page;
        displayRegions();
      }
    });
  }

  function createRegionRow(index, region) {
    return `
      <tr data-id='${region._id}'>
        <td>${index}</td>
        <td><a href='javascript: void(0);' class='view-btn text-primary'" class="text-body fw-bold">${
          region.regionName
        }</a></td>
        <td>${getCountryName(region.country)}</td>
        <td style='text-align: right'>
          <div class='d-flex justify-content-end gap-3'>
            <a href='javascript:void(0);' class='view-btn text-primary'>
              <i class='mdi mdi-eye font-size-18'></i>
            </a>
            <a href='javascript:void(0);' class='edit-btn text-success'>
              <i class='mdi mdi-pencil font-size-18'></i>
            </a>
            <a href='javascript:void(0);' class='delete-btn text-danger'>
              <i class='mdi mdi-delete font-size-18'></i>
            </a>
          </div>
        </td>
      </tr>`;
  }

  function getCountryName(country) {
    return country ? country.country_name : "N/A";
  }
});
