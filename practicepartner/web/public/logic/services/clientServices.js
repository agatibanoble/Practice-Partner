// // clientServices.js
// clientServices.js
import endpointURL from "../configModule.js";

// Function to initialize autocomplete for a given text input element

const getClients = async (currentPage = 1, rowsPerPage = 10) => {
  try {
    const response = await $.ajax({
      url: `${endpointURL}getClients`,
      type: "GET",
      data: { page: currentPage, limit: rowsPerPage },
      contentType: "application/json",
    });

    return response;
  } catch (error) {
    console.error("Error fetching clients:", error);
    throw error;
  }
};

// Example usage:
// getClients().then((response) => {
//   // Handle the response
// }).catch((error) => {
//   // Handle errors
// });

// const searchClients = (textInputElement) => {
//   return new Promise((resolve, reject) => {
//     $(textInputElement).autocomplete({
//       minLength: 1,
//       source: function (req, response) {
//         var activeElement = $(":focus").attr("id");

//         $.ajax({
//           url: endpointURL + "searchClients",
//           method: "GET",
//           data: {
//             searchItem: req.term,
//           },
//           dataType: "json",
//           success: function (res) {
//             var result = [];
//             if (res.data.length) {
//               result = res.data.map(function (obj) {
//                 return {
//                   label: obj.clientNumber + ": " + obj.clientName,
//                   value: obj.clientNumber + ": " + obj.clientName,
//                   data: obj,
//                 };
//               });
//             } else {
//               result.push({
//                 label: "There is no matching record found for " + req.term,
//                 value: "",
//               });
//             }
//             response(result);
//           },
//         });
//       },
//       select: function (event, ui) {
//         var data = ui.item.data;
//         // resolve(data);
//         textInputElement.data("selectedData", data); // Store selected data in a data attribute
//       },
//     });
//   });
// };
const searchClients = (textInputElement) => {
  return new Promise((resolve, reject) => {
    $(textInputElement).autocomplete({
      minLength: 1,
      source: function (req, response) {
        const searchTerm = req.term.trim(); // Trim leading and trailing whitespace

        if (!searchTerm) {
          return; // Exit if search term is empty
        }

        // Make an AJAX request to fetch autocomplete suggestions
        $.ajax({
          url: `${endpointURL}searchClients`,
          method: "GET",
          data: { searchItem: searchTerm },
          dataType: "json",
          success: function (res) {
            if (res.data && res.data.length > 0) {
              const formattedResults = res.data.map((obj) => ({
                label: `${obj.clientNumber}: ${obj.clientName}`,
                value: `${obj.clientNumber}: ${obj.clientName}`,
                data: obj,
              }));
              response(formattedResults); // Provide formatted suggestions to autocomplete
            } else {
              response([
                {
                  label: `No matching record found for "${searchTerm}"`,
                  value: "",
                },
              ]);
            }
          },
          error: function (xhr, status, error) {
            reject(error); // Reject the promise if there's an error in the AJAX call
          },
        });
      },
      select: function (event, ui) {
        const selectedData = ui.item.data;
        console.log(selectedData);
        $(textInputElement).data("selectedData", selectedData); // Store selected data
        $("#client-category").val(
          selectedData.clientCategory.clientCategoryName || ""
        );
        $("#client-type").val(selectedData.clientType || "");
        $("#client-id").val(selectedData._id || "");
        resolve(selectedData); // Resolve the promise with selected data
      },
    });
  });
};

const getSelectedClient = (clientId) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: endpointURL + "getClient/" + clientId, // Use the provided clientId parameter
      type: "GET",
      data: { id: clientId }, // Use the provided clientId parameter
      success: (response) => {
        resolve(response.data);
      },
      error: (xhr, status, error) => {
        console.error("Error fetching client data:", error);
        reject(error);
      },
    });
  });
};

// Expose the searchClients function for external use
const ClientServices = { getClients, searchClients, getSelectedClient };
export default ClientServices;
