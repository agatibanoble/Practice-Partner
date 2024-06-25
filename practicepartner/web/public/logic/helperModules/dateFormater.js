// Export a generic formatDate function
function formatDate(inputDate, format = "d-m-Y") {
  return flatpickr.formatDate(new Date(inputDate), format);
}
window.formatDate = formatDate;
