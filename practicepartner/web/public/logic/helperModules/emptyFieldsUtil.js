// emptyFieldsUtil.js

// function removeEmptyFields(obj) {
//   for (const key in obj) {
//     if (obj[key] && typeof obj[key] === "object") {
//       // Recursively call removeEmptyFields for nested objects
//       obj[key] = removeEmptyFields(obj[key]);
//       // If the nested object becomes empty after removal, delete it
//       if (
//         Object.keys(obj[key]).length === 0 &&
//         obj[key].constructor === Object
//       ){
//         delete obj[key];
//       }
//     } else if (obj[key] === "" || obj[key] === null || obj[key] === undefined) {
//       // Remove fields with empty values
//       delete obj[key];
//     }
//   }
//   return obj;
// }

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
