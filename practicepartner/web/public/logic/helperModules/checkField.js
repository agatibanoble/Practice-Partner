function checkField(fieldValue) {
  console.log("fieldValue");
  return new Promise((resolve, reject) => {
    // Check if the field value is not empty

    if (fieldValue.trim() !== "") {
      console.log("fieldValue");
      resolve(fieldValue.trim());
    } else {
      reject("Field value is empty");
    }
  });
}

export default checkField;
