// Helper function to remove empty fields from FormData
function removeEmptyFields(formData) {
  // Create a new FormData object to store non-empty key-value pairs
  var cleanedFormData = new FormData();

  // Loop through each key-value pair in the form data
  formData.forEach(function (value, key) {
    // Check if the value is not empty ("", null, or undefined)
    if (value !== "" && value !== null && value !== undefined) {
      // Add the non-empty key-value pair to the cleanedFormData
      cleanedFormData.append(key, value);
    }
  });

  // Return the cleaned FormData object
  return cleanedFormData;
}

export default removeEmptyFields;
window.removeEmptyFields = removeEmptyFields;
