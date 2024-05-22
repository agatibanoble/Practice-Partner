// Export a generic formatDate function
export function formatDate(inputDate, format= 'd-m-Y') {
  return flatpickr.formatDate(new Date(inputDate), format);

}
