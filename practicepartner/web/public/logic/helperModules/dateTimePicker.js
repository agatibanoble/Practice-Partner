function dateTimePicker(
  element,
  format = "Y-m-d",
  minDate = "",
  maxDate = "",
  defaultDate = "",
  enableTime = false
) {
  flatpickr(element, {
    dateFormat: format,
    minDate: minDate !== "" ? minDate : "",
    maxDate: maxDate !== "" ? maxDate : "",
    defaultDate: defaultDate !== "" ? defaultDate : new Date(),
    enableTime: enableTime,
    disable: [
      function (date) {
        // Disable weekends
        return date.getDay() === 0 || date.getDay() === 6;
      },
    ],
    onChange: function (selectedDates, dateStr, instance) {
      console.log("Date selected: ", dateStr);
    },
  });
}

// Attach the function to the window object to make it globally accessible
window.dateTimePicker = dateTimePicker;
