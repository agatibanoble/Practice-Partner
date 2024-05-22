import CaseCategoryListPage from "../caseCategoryModules/caseCategoryListPage.js";
import ClientCategoryListPage from "../clientCategoryModules/clientCategoryListPage.js";
import CountryListPage from "../countryModules/countryListPage.js";
import FirmPage from "../firmModules/firmListPage.js";
import RegionListPage from "../regionModules/regionListPage.js";
import CourtListPage from "../courtModules/courtListPage.js";
class Settings {
  constructor() {
    // this.countryModalPage = $("#country-modal-page");
    // this.modalTitle = $("#country-modal-page-modalTitle");
    this.initForm();
  }

  attachEventHandlers = async () => {
    $("#btn-country-modal-page").click(() => new CountryListPage().open());
    $("#btn-firm-modal-page").click(() => new FirmPage().open());
    $("#btn-region-modal-page").click(() => new RegionListPage().open());
    $("#btn-client-category-modal-page").click(() =>
      new ClientCategoryListPage().open()
    );
    $("#btn-case-category-modal-page").click(() =>
      new CaseCategoryListPage().open()
    );
    $("#btn-court-modal-page").click(() => new CourtListPage().open());
  };

  initForm() {
    this.attachEventHandlers();
  }
}
new Settings();
