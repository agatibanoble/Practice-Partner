import RegionServices from "../services/regionServices.js";
import RegionModalForm from "./regionModalForm.js";
class RegionListPage {
  constructor() {
    this.tableBody = $("#regionTableBody");
    this.modal = $("#region-modal-page");
    this.modalTitle = $("#region-modal-page-modalTitle");
    this.initForm();
  }

  async open() {
    RegionServices.getRegions()
      .then((selectedRecords) => {
        this.renderTable(selectedRecords);
      })
      .then(() => {
        this.modalTitle.text("List of Regions");
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
        selectedRecords.forEach((region, index) => {
          const row = this.createRegionRow(index + 1, region);
          this.tableBody.append(row);
        });
      } else {
        this.tableBody.append(this.noRecordDisplay());
      }
    } catch (error) {
      this.tableBody.append(this.noRecordDisplay());
      console.error("Error fetching and displaying regions:", error);
    }
  }

  attachEventHandlers = () => {
    $("#btn-new-region").on("click", this.newRecord);
    this.tableBody.on("click", "#btn-edit", this.editRecord.bind(this));
    this.tableBody.on("click", "#btn-delete", this.deleteRecord.bind(this));
    $(".modal").on("hidden.bs.modal", () => {
      this.refreshPage();
    });
  };

  noRecordDisplay() {
    return `<tr><td colspan='4' style='text-align:center'>No Records</td></tr>`;
  }

  createRegionRow(index, region) {
    return `
      <tr data-id='${region._id}'>
        <td> ${index}  </td>
        <td> ${region.regionName} </td>
        <td> ${region.country.countryName} </td>
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
    new RegionModalForm().new();
    // this.modal.css("display", "none").modal("hide");
  };

  editRecord = (event) => {
    const regionId = $(event.currentTarget).closest("tr").data("id");
    new RegionModalForm(regionId).open();
  };

  async deleteRecord(event) {
    const regionId = $(event.currentTarget).closest("tr").data("id");
    const deleteResult = await RegionServices.deleteRecord(regionId);
    if (deleteResult) this.refreshPage();
  }

  async refreshPage() {
    RegionServices.getRegions()
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
export default RegionListPage;
