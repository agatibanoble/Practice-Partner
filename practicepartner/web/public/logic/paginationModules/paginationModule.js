// paginationModule.js
const generatePagination = (totalPages, currentPage, paginationElement) => {
  paginationElement.empty();

  for (let i = 1; i <= totalPages; i++) {
    const listItem = $("<li></li>").addClass("page-item");
    const link = $("<a></a>")
      .addClass("page-link")
      .attr("href", "javascript: void(0);")
      .text(i);

    if (i === currentPage) {
      listItem.addClass("active");
    }

    listItem.append(link);
    paginationElement.append(listItem);
  }

  attachPaginationEventHandlers();
};

const attachPaginationEventHandlers = () => {
  $("#pagination").on("click", "a.page-link", function () {
    const page = parseInt($(this).text());
    if (!isNaN(page) && page !== currentPage) {
      currentPage = page;
      fetchAndDisplayClients();
    }
  });
};

export { generatePagination };
