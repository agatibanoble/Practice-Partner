import DeliveryTypeServices from "../services/deliveryTypeServices.js";

class DeliveryTypeModalForm {
  constructor() {
    if (DeliveryTypeModalForm.instance) {
      return DeliveryTypeModalForm.instance;
    }

    this.modal = $("#delivery-type-modal-form");
    this.modalTitle = $("#delivery-type-modal-form-modalTitle");
    this.form = $("#frm-delivery-type");
    this.initForm();

    DeliveryTypeModalForm.instance = this;
  }

  async new() {
    this.modalTitle.text("Add New DeliveryType");
    this.showModal();
  }

  async open(deliveryTypeId) {
    if (!deliveryTypeId) {
      alertify.notify("Please make a selection", "warning", 5);
      return;
    }
    try {
      const selectedRecord = await DeliveryTypeServices.getSelectedRecord(
        deliveryTypeId
      );
      this.populateFormFields(selectedRecord);
      this.modalTitle.text("Edit Selected Delivery Type");
      this.showModal();
    } catch (error) {
      console.error("Error:", error);
    }
  }

  async populateFormFields(selectedRecord) {
    if (selectedRecord) {
      $("#delivery-type-name", this.form).val(selectedRecord.deliveryTypeName);
      $("#_id", this.form).val(selectedRecord._id);
    }
  }

  showModal() {
    this.modal.css("display", "block").modal("show");
  }

  hideModal() {
    this.modal.css("display", "none").modal("hide");
  }

  attachEventHandlers() {
    this.form.on("submit", async (event) => {
      event.preventDefault();
      await this.handleFormSubmission($(event.currentTarget));
    });

    this.modal.on("hidden.bs.modal", () => {
      this.resetForm();
    });
  }

  async initForm() {
    this.attachEventHandlers();
  }

  async handleFormSubmission(form) {
    const formData = new FormData(form[0]);
    try {
      const responseData = await DeliveryTypeServices.saveRecord(formData);
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

const instance = new DeliveryTypeModalForm();
Object.freeze(instance);

export default instance;
