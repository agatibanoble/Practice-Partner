$(document).ready(function () {
  var modalStack = [];

  function showModal(modalId, modalTitle, modalTitleId = null) {
    var modalIdStr = "#" + modalId.attr("id"); // Get the modal ID as a string
    var currentModal = $(modalIdStr);

    // Set the title of the modal
    if (modalTitleId !== null) {
      currentModal.find(modalTitleId).text(modalTitle);
    } else {
      currentModal.find(".modal-title").text(modalTitle);
    }

    // If there is a modal currently open, hide it and push it to the stack
    if (modalStack.length > 0) {
      var previousModalId = modalStack[modalStack.length - 1];
      $(previousModalId).modal("hide");
    }

    // Check for duplicate modal IDs before pushing to the stack
    if (!modalStack.includes(modalIdStr)) {
      // Show the current modal
      currentModal.modal("show");
      modalStack.push(modalIdStr); // Push the modal ID string to the stack
    }
  }

  // Make the function globally accessible
  window.showModal = showModal;

  // Generic event listener for hiding modals
  $(document).on("hidden.bs.modal", function (e) {
    var hiddenModal = $(e.target);

    var hiddenModalId = "#" + hiddenModal.attr("id");
    console.log(modalStack);
    // Remove the hidden modal from the stack only if it is the last one in the stack
    if (
      modalStack.length > 0 &&
      hiddenModalId === modalStack[modalStack.length - 1]
    ) {
      modalStack.pop();
    }

    // Show the previous modal if it exists
    if (modalStack.length > 0) {
      var previousModalId = modalStack[modalStack.length - 1];
      setTimeout(function () {
        $(previousModalId).modal("show");
      }, 300); // Adjust the timeout as needed
    }
  });
});
