// Import ClientModalForm
import ClientModalForm from "./clientModalForm.js";
import ClientDescriptionModule from "./clientDescriptionModalModule.js";
import endpointURL from "./configModule.js";

// Define ClientModule
const ClientModule = (() => {
  // let getClientIdFromUrl() = 0;

  // Function to get client ID from URL
  const getClientIdFromUrl = () => {
    const currentUrl = window.location.href;
    const urlParts = currentUrl.split("/");
    return urlParts[4];
  };

  // Function to fetch and populate client record
  const getAndPopulateClientRecord = () => {
    $.ajax({
      url: endpointURL + "getClient/" + getClientIdFromUrl(),
      type: "GET",
      data: { id: getClientIdFromUrl() },
      success: function (response) {
        // Populate client record in the DOM
        $(".client-number").text("Client No.:" + response.data.clientNumber);
        $(".client-name").text("Name: " + response.data.clientName);
        $(".client-image").attr(
          "src",
          "/assets/images/profile_pictures/" + response.data.clientImage
        );
        $(".client-category").text(
          "Category: " + response.data.clientCategory.clientCategoryName
        );
        $(".client-type").text("Type: " + response.data.clientType);
        $(".client-referral-type").text(
          "Referral: " + response.data.clientReferralType
        );
        $(".client-description").html(response.data.clientDescription);
      },
      error: function (xhr, status, error) {
        console.error("Error fetching record:", error);
      },
    });
  };

  // Function to attach event listeners
  const attachEventListeners = () => {
    $("#btn-open-client-modal-form").click(() =>
      ClientModalForm.populateModalForm(getClientIdFromUrl(), false)
    );
    $("#btn-open-about-client-modal-form").click(() =>
      ClientDescriptionModule.populateModalForm(getClientIdFromUrl(), false)
    );
    $("#client-modal-form, #about-client-modal-form").on(
      "hidden.bs.modal",
      getAndPopulateClientRecord
    );
    const scrollLinks = document.querySelectorAll(".scroll-link");
    scrollLinks.forEach((link) => {
      link.addEventListener("click", (event) => {
        event.preventDefault();
        const targetId = event.target.getAttribute("href");
        scrollToSection(targetId);
      });
    });
  };

  // Function to initialize the module
  const init = () => {
    getClientIdFromUrl();
    getAndPopulateClientRecord();
    attachEventListeners();
  };

  // Initialize the module
  init();

  // Export the module
  return { init };
})();

// Export ClientModule as default
export default ClientModule;
