import FirmServices from "../../logic/services/firmServices.js";
import CountryServices from "../services/countryServices.js";
import { populateSelectWithOptions } from "../helperModules/populateSelectWithOptions.js";
import RegionServices from "../services/regionServices.js";

class FirmModalForm {
  static instance;

  constructor(firmId = null) {
    if (FirmModalForm.instance) {
      return FirmModalForm.instance;
    }
    this.firmId = firmId;
    this.modal = $("#firm-modal-form");
    this.modalTitle = $("#firm-modal-form-modalTitle");
    this.form = $("#frm-firm");
    this.initForm();
    FirmModalForm.instance = this;
  }

  static getInstance(firmId = null) {
    if (!FirmModalForm.instance) {
      FirmModalForm.instance = new FirmModalForm(firmId);
    } else if (firmId) {
      FirmModalForm.instance.firmId = firmId;
    }
    return FirmModalForm.instance;
  }

  async open(firmId = null) {
    try {
      const selectedFirm = await FirmServices.getSelectedRecord(firmId);
      if (selectedFirm) this.populateFormFields(selectedFirm);
      this.modalTitle.text("Edit Law Firm Details");
      this.showModal();
    } catch (error) {
      console.error("Error:", error);
    }
  }

  async populateFormFields(selectedFirm) {
    console.log(selectedFirm);
    if (selectedFirm) {
      // Wait for countries to be populated before setting the values
      const countries = await CountryServices.getCountries();
      const selectElement = $("#country", this.form);
      await populateSelectWithOptions(
        selectElement,
        countries,
        "_id",
        "countryName"
      );

      $("#registration-number", this.form).val(selectedFirm.registrationNumber);
      $("#firm-name", this.form).val(selectedFirm.firmName);
      $("#date-established", this.form).val(selectedFirm.dateEstablished);
      $("#address", this.form).val(selectedFirm.address);
      $("#city", this.form).val(selectedFirm.city);
      $("#country", this.form).val(selectedFirm.region.country._id);
      await $("#country", this.form).trigger("change");
      // Wait for regions to be populated before setting the region value
      await RegionServices.populateRegions(
        selectedFirm.region.country._id,
        $("#region", this.form)
      );
      $("#region", this.form).val(selectedFirm.region._id);
      $("#postal-code", this.form).val(selectedFirm.postalCode);
      $("#phone-number", this.form).val(selectedFirm.phoneNumber);
      $("#email", this.form).val(selectedFirm.email);
      $("#website", this.form).val(selectedFirm.website);
      $("#description", this.form).val(selectedFirm.description);
      $("#_id", this.form).val(selectedFirm._id); // Assuming _id is the ID field
    }
  }

  showModal() {
    this.modal.css("display", "block").modal("show");
  }

  attachEventHandlers() {
    const self = this; // Store reference to 'this'

    this.form.on("submit", async function (event) {
      event.preventDefault();
      await self.handleFormSubmission($(this));
    });

    this.modal.on("hidden.bs.modal", function () {
      self.resetForm();
    });

    $("#country", this.form).on("change", async function () {
      const countryId = $(this).val();
      console.log(countryId);
      const regionSelectElement = $("#region", this.form);
      await RegionServices.populateRegions(countryId, regionSelectElement);
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

      // Trigger the change event programmatically
      $("#country", this.form).trigger("change");
    });
  }

  async handleFormSubmission(form) {
    const formData = new FormData(form[0]);
    try {
      const responseData = await FirmServices.saveRecord(formData);
      if (responseData && responseData.success)
        this.populateFormFields(responseData.data);
    } catch (error) {
      console.error("Error saving record:", error);
    }
  }

  resetForm() {
    this.form[0].reset();
    this.form.find("input[type=hidden]").val("");
  }
}

export default FirmModalForm;
