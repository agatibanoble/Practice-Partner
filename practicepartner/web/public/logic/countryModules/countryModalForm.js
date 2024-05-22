import CountryServices from "../../logic/services/countryServices.js";
import RegionServices from "../../logic/services/regionServices.js";
import removeEmptyFields from "../helperModules/emptyFieldsUtil.js";
import { populateSelectWithOptions } from "../helperModules/populateSelectWithOptions.js";

class FirmModalForm {
  constructor(regionId = null) {
    this.regionId = regionId;
    this.modal = $("#region-modal-form");
    this.modalTitle = $("#region-modal-form-modalTitle");
    this.form = $("#frm-region");
    this.initForm();
  }

  async new() {
    this.modalTitle.text("Add New Region");
    this.showModal();
  }

  async open() {
    if (!this.regionId) {
      alertify.notify("Please make a selection", "warning", 5);
      return;
    }
    try {
      const selectedRecord = await RegionServices.getSelectedRecord(
        this.regionId
      );
      this.populateFormFields(selectedRecord);
      this.modalTitle.text("Edit Selected Region");
      this.showModal();
    } catch (error) {
      console.error("Error:", error);
    }
  }

  async populateFormFields(selectedRecord) {
    if (selectedRecord) {
      const countries = await CountryServices.getCountries();

      const selectElement = $("#country", this.form);
      await populateSelectWithOptions(
        selectElement,
        countries,
        "_id",
        "countryName"
      );
      $("#country", this.form).val(selectedRecord.country._id);
      $("#region", this.form).val(selectedRecord.regionName);
      $("#_id", this.form).val(selectedRecord._id);
    }
  }

  showModal() {
    this.modal.css("display", "block").modal("show");
  }

  attachEventHandlers() {
    const self = this; // Store reference to 'this' for proper context inside event handlers

    this.form.on("submit", async (event) => {
      event.preventDefault();
      await this.handleFormSubmission($(event.currentTarget));
    });

    this.modal.on("hidden.bs.modal", () => {
      this.resetForm();
    });
  }

  async initForm() {
    $(document).ready(async () => {
      this.attachEventHandlers();

      const countries = await CountryServices.getCountries();

      const selectElement = $("#country", this.form);
      await populateSelectWithOptions(
        selectElement,
        countries,
        "_id",
        "countryName"
      );
    });
  }

  async handleFormSubmission(form) {
    const formData = new FormData(form[0]);
    const data = removeEmptyFields(formData);
    const id = formData.get("id");
    const action = id ? `updateRegion/${id}` : "createRegion";

    RegionServices.saveRecord(data, action)
      .then((responseData) => {
        this.populateFormFields(responseData.data);
        // Additional logic for successful completion can be added here
      })
      .catch((error) => {
        console.error("Error saving record:", error);
        // Additional error handling logic can be added here
      });
  }

  resetForm() {
    this.form[0].reset();
    this.form.find("input[type=hidden]").val("");
  }
}

export default FirmModalForm;
