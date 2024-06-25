import { getEditorInstance } from "../../helperModules/CKEditor.js";
class EmailModule {
  constructor() {
    this.emails = [];
    this.editorInstance = null;
    this.email;

    $(".modal").on("hidden.bs.modal", () => {
      this.initForm();
    });
    this.editorInstance = getEditorInstance("#message");
    // this.initCKEditor();
  }

  composeEmail(email) {
    this.email = email;
    $("#to").val(this.email);
    $("#compose-email-modal").modal("show");
  }

  attachEventHandlers() {
    $(document).on("click", ".close", () => {
      $("#compose-email-modal").modal("hide");
    });

    $("#send").click(() => {
      const to = $("#to").val();
      const subject = $("#subject").val();
      const message = $("#message").val();
      this.sendEmail(to, subject, message);
    });

    $("#emailList").on("click", ".emailLink", (event) => {
      const index = $(event.currentTarget).data("index");
      this.displayEmailDetails(index);
      $("#emailDetails").show();
    });

    $("#compose-email-modal").on("hidden.bs.modal", () => {
      this.resetForm();
      this.refreshInbox();
    });
  }

  sendEmail(to, subject, message) {
    this.emails.push({ to, subject, message });
    this.refreshInbox();
  }

  refreshInbox() {
    $("#emailList").empty();
    this.emails.forEach((email, index) => {
      $("#emailList").append(
        `<li><a href="#" class="emailLink" data-index="${index}">${email.subject}</a></li>`
      );
    });
  }

  displayEmailDetails(index) {
    const email = this.emails[index];
    $("#from").text(email.to);
    $("#subject").text(email.subject);
    $("#message").text(email.message);
  }

  initForm() {
    this.attachEventHandlers();
    this.refreshInbox();
  }

  resetForm() {
    $("#frm-compose-email")[0].reset();
  }
}

export default EmailModule;
