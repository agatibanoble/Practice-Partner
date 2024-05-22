// // clientServices.js
// clientServices.js
import endpointURL from "../configModule.js";

const getSelectedConference = (conferenceId) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: endpointURL + "getConference/" + conferenceId, // Use the provided clientId parameter
      type: "GET",
      data: { id: conferenceId }, // Use the provided clientId parameter
      success: (response) => {
        resolve(response.data);
      },
      error: (xhr, status, error) => {
        console.error("Error fetching conference data:", error);
        reject(error);
      },
    });
  });
};

const getConferences = async (clientId) => {
  try {
    const response = await fetch(
      `${endpointURL}clients/${clientId}/conferences`,
      {
        method: "GET",
      }
    );
    if (!response.ok) {
      throw new Error(
        `Error fetching Contact Person data: ${response.statusText}`
      );
    }
    const data = await response.json();
    // console.log(data.data);
    return data.data;
  } catch (error) {
    console.error("Error fetching Contact Person data:", error);
    throw error;
  }
};
const deleteRecord = async (conferenceId) => {
  try {
    // Show confirmation prompt
    const confirmation = await new Promise((resolve) => {
      alertify.confirm(
        "Confirmation",
        "Are you sure you want to delete this record?",
        resolve,
        () => {} // Empty function for Cancel
      );
    });

    // Check if user confirmed deletion
    if (confirmation) {
      const response = await fetch(
        `${endpointURL}deleteConference/${conferenceId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        alertify.notify("Record deleted successfully", "success", 5);

        return true; // Deletion successful
      } else {
        throw new Error("Error deleting record");
      }
    } else {
      // User clicked Cancel
      alertify.notify("Deletion canceled by user", "info", 5);
      return false; // Deletion canceled
    }
  } catch (error) {
    // Handle error
    alertify.notify(error.message || "Error deleting record", "warning", 5);
    return false; // Deletion failed
  }
};

const ConferenceServices = {
  getConferences,
  getSelectedConference,
  deleteRecord,
};
export default ConferenceServices;
