import CountryServices from "../services/countryServices.js";
import CountryModalForm from "./countryModalForm.js";
class CountryListPage {
  constructor() {
    this.tableBody = $("#countryTableBody");
    this.modal = $("#country-modal-page");
    this.modalTitle = $("#country-modal-page-modalTitle");
    this.initForm();
  }

  async open() {
    CountryServices.getCountries()
      .then((selectedRecords) => {
        this.renderTable(selectedRecords);
      })
      .then(() => {
        this.modalTitle.text("List of Countries");
      })
      .catch((error) => {
        // Handle error
        console.error("Error:", error);
      });

    this.modal.css("display", "block").modal("show");
  }

  async renderTable(selectedRecords) {
    try {
      this.tableBody.empty();
      if (selectedRecords && selectedRecords.length > 0) {
        selectedRecords.forEach((country, index) => {
          const row = this.createCountryRow(index + 1, country);
          this.tableBody.append(row);
        });
      } else {
        this.tableBody.append(this.noRecordDisplay());
      }
    } catch (error) {
      this.tableBody.append(this.noRecordDisplay());
      console.error("Error fetching and displaying countries:", error);
    }
  }

  attachEventHandlers = () => {
    $("#btn-new-country").on("click", this.newRecord);
    this.tableBody.on("click", "#btn-edit", this.editRecord.bind(this));
    this.tableBody.on("click", "#btn-delete", this.deleteRecord.bind(this));
    $(".modal").on("hidden.bs.modal", () => {
      this.refreshPage();
    });
  };

  noRecordDisplay() {
    return `<tr><td style='text-align:center'>No Records</td></tr>`;
  }

  createCountryRow(index, country) {
    return `
      <tr data-id='${country._id}'>
        <td> ${index}  </td>
        <td> ${country.countryName} </td>
        <td style='text-align: middle'>
          <div class="dropdown">
            <a href="#" class="dropdown-toggle card-drop" data-bs-toggle="dropdown" aria-expanded="false">
              <i class="mdi mdi-dots-horizontal font-size-18"></i>
            </a>
            <ul class="dropdown-menu dropdown-menu-end">
              <li><a href="#" class="dropdown-item btn-edit" id="btn-edit"><i class="mdi mdi-pencil font-size-16 text-success me-1"></i>Edit</a></li>
              <li><a href="#" class="dropdown-item btn-delete" id="btn-delete"><i class="mdi mdi-trash-can font-size-16 text-danger me-1"></i>Delete</a></li>
            </ul>
          </div>
        </td>
      </tr>`;
  }

  newRecord = () => {
    new CountryModalForm().new();
    // this.modal.css("display", "none").modal("hide");
  };

  editRecord = (event) => {
    const counrtyId = $(event.currentTarget).closest("tr").data("id");
    new CountryModalForm(counrtyId).open();
  };

  async deleteRecord(event) {
    const counrtyId = $(event.currentTarget).closest("tr").data("id");
    const deleteResult = await CountryServices.deleteRecord(counrtyId);
    if (deleteResult) this.refreshPage();
  }

  async refreshPage() {
    CountryServices.getCountries()
      .then((selectedRecords) => {
        this.renderTable(selectedRecords);
      })
      .catch((error) => {
        // Handle error
        console.error("Error:", error);
      });
  }
  async initForm() {
    $(document).ready(async () => {
      try {
        this.attachEventHandlers(); // Call attachEventHandlers to set up event handling
      } catch (error) {
        console.error("Error initializing form:", error);
      }
    });
  }
}
export default CountryListPage;
