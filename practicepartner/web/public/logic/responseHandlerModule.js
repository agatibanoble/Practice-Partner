// responseHandlerModule.js
const ResponseHandlerModule = (() => {
  const handleResponse = (response) => {
    if (response.success) {
      handleSuccess(response);
    } else {
      handleFailure(response);
    }
  };

  const handleSuccess = (response) => {
    alertify.alert("Success", response.message, () => {
      alertify.notify("Thank You.", "success", 5);
    });
  };

  const handleFailure = (response) => {
    alertify.alert(
      "Warning!",
      "Your request did not complete successfully.",
      () => {
        alertify.notify("Check and try again", "warning", 5);
      }
    );
  };

  const handleError = (error) => {
    alertify.alert(
      "Attention!!! Network Challenges",
      "We could not connect to the database due to network challenges.",
      () => {
        alertify.notify("Check your network connectivity", "danger", 5);
      }
    );
  };
  const confirmDelete = (response) => {
    return new Promise((resolve) => {
      alertify.confirm(
        "Confirmation",
        "Are you sure you want to delete this record?",
        resolve,
        () => {}
      );
    });
  };
  return {
    confirmDelete,
    handleResponse,
    handleSuccess,
    handleFailure,
    handleError,
  };
})();

export default ResponseHandlerModule;
