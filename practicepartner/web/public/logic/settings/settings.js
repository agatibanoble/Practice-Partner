import CaseCategoryListPage from "../caseCategoryModules/caseCategoryListPage.js";
import ClientCategoryListPage from "../clientCategoryModules/clientCategoryListPage.js";
import CountryListPage from "../countryModules/countryListPage.js";
import FirmPage from "../firmModules/firmListPage.js";
import RegionListPage from "../regionModules/regionListPage.js";
import CourtListPage from "../courtModules/courtListPage.js";
import DepartmentListPage from "../departmentModules/departmentListPage.js";
import DocumentTypeListPage from "../documentTypeModules/documentTypeListPage.js";
import EmployeeCategoryListPage from "../employeeCategoryModules/employeeCategoryListPage.js";
import EmployeePositionListPage from "../employeePositionModules/employeePositionListPage.js";
class Settings {
  constructor() {
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
    $("#btn-department-modal-page").click(() =>
      new DepartmentListPage().open()
    );
    $("#btn-employee-category-modal-page").click(() =>
      new EmployeeCategoryListPage().open()
    );
    $("#btn-employee-position-modal-page").click(() =>
      new EmployeePositionListPage().open()
    );
    $("#btn-document-type-modal-page").click(() =>
      new DocumentTypeListPage().open()
    );
  };

  initForm() {
    this.attachEventHandlers();
  }
}
new Settings();
