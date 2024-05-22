async function populateSelectWithOptions(
  selectElement,
  optionsArray,
  valueField,
  textField
) {
  // Clear existing options from the select element
  selectElement.empty();

  // Add a default "Select an Item" option
  const defaultOption = $("<option>");
  defaultOption.val("");
  defaultOption.text("Select an Item");
  selectElement.append(defaultOption);

  // Loop through the optionsArray and create options for each item
  optionsArray.forEach((option) => {
    const optionElement = $("<option>");
    optionElement.val(option[valueField]);
    optionElement.text(option[textField]);
    selectElement.append(optionElement);
  });
}

export { populateSelectWithOptions };
