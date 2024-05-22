const express = require("express");
const route = express.Router();

const authcontroller = require("../controllers/authController");

route.use("/", authcontroller.islogin);

route.get("/", (req, res, next) => {
  res.render("index", {
    title: "Dashboard",
    page_title: "Welcome !",
    folder: "Dashboard",
  });
});

route.get("/index", (req, res, next) => {
  res.render("index", {
    title: "Dashboard",
    page_title: "Welcome !",
    folder: "Dashboard",
  });
});

route.get("/test", (req, res, next) => {
  res.render("test", { title: "Test" });
});

route.get("/ecommerce-products", (req, res, next) => {
  res.render("ecommerce-products", { title: "Products" });
});
route.get("/ecommerce-product-detail", (req, res, next) => {
  res.render("ecommerce-product-detail", { title: "Product Detail" });
});
route.get("/ecommerce-orders", (req, res, next) => {
  res.render("ecommerce-orders", { title: "Orders" });
});
route.get("/ecommerce-customers", (req, res, next) => {
  res.render("ecommerce-customers", { title: "Customers" });
});
route.get("/ecommerce-cart", (req, res, next) => {
  res.render("ecommerce-cart", { title: "Cart" });
});
route.get("/ecommerce-checkout", (req, res, next) => {
  res.render("ecommerce-checkout", { title: "Checkout" });
});
route.get("/ecommerce-shops", (req, res, next) => {
  res.render("ecommerce-shops", { title: "Shops" });
});
route.get("/ecommerce-add-product", (req, res, next) => {
  res.render("ecommerce-add-product", { title: "Add Product" });
});
route.get("/apps-email-inbox", (req, res, next) => {
  res.render("apps-email-inbox", { title: "Inbox" });
});
route.get("/apps-email-read", (req, res, next) => {
  res.render("apps-email-read", { title: "Read Email" });
});
route.get("/apps-chat", (req, res, next) => {
  res.render("apps-chat", { title: "Chat" });
});
route.get("/apps-calendar", (req, res, next) => {
  res.render("apps-calendar", { title: " Calendar" });
});
route.get("/apps-contacts-grid", (req, res, next) => {
  res.render("apps-contacts-grid", { title: "User Grid" });
});
route.get("/apps-contacts-list", (req, res, next) => {
  res.render("apps-contacts-list", { title: "User List" });
});
route.get("/apps-contacts-profile", (req, res, next) => {
  res.render("apps-contacts-profile", { title: "Profile" });
});
route.get("/tasks-list", (req, res, next) => {
  res.render("tasks-list", { title: "Task List" });
});
route.get("/tasks-kanban", (req, res, next) => {
  res.render("tasks-kanban", { title: "Kanban Board" });
});
route.get("/tasks-create", (req, res, next) => {
  res.render("tasks-create", { title: "Create Task" });
});
route.get("/auth-login", (req, res, next) => {
  res.render("auth-login", {
    title: "Login",
    layout: "layout/layout-without-navbar",
  });
});
route.get("/auth-register", (req, res, next) => {
  res.render("auth-register", {
    title: "Register",
    layout: "layout/layout-without-navbar",
  });
});
route.get("/auth-recoverpw", (req, res, next) => {
  res.render("auth-recoverpw", {
    title: "Recover Password",
    layout: "layout/layout-without-navbar",
  });
});
route.get("/auth-lock-screen", (req, res, next) => {
  res.render("auth-lock-screen", {
    title: "Lock Screen",
    layout: "layout/layout-without-navbar",
  });
});
route.get("/auth-logout", (req, res, next) => {
  res.render("auth-logout", {
    title: "Log Out",
    layout: "layout/layout-without-navbar",
  });
});
route.get("/auth-confirm-mail", (req, res, next) => {
  res.render("auth-confirm-mail", {
    title: "Confirm Mail",
    layout: "layout/layout-without-navbar",
  });
});
route.get("/auth-email-verification", (req, res, next) => {
  res.render("auth-email-verification", {
    title: "Email Varification",
    layout: "layout/layout-without-navbar",
  });
});
route.get("/auth-two-step-verification", (req, res, next) => {
  res.render("auth-two-step-verification", {
    title: "Two Step Varification",
    layout: "layout/layout-without-navbar",
  });
});
route.get("/pages-starter", (req, res, next) => {
  res.render("pages-starter", { title: "Starter Page" });
});
route.get("/pages-maintenance", (req, res, next) => {
  res.render("pages-maintenance", {
    title: "Maintenance",
    layout: "layout/layout-without-navbar",
  });
});
route.get("/pages-comingsoon", (req, res, next) => {
  res.render("pages-comingsoon", {
    title: "Coming Soon",
    layout: "layout/layout-without-navbar",
  });
});
route.get("/pages-timeline", (req, res, next) => {
  res.render("pages-timeline", { title: "Timeline" });
});
route.get("/pages-faqs", (req, res, next) => {
  res.render("pages-faqs", { title: "FAQs" });
});
route.get("/pages-pricing", (req, res, next) => {
  res.render("pages-pricing", { title: "Pricing" });
});
route.get("/pages-404", (req, res, next) => {
  res.render("pages-404", {
    title: "404 Error",
    layout: "layout/layout-without-navbar",
  });
});
route.get("/pages-500", (req, res, next) => {
  res.render("pages-500", {
    title: "500 Error",
    layout: "layout/layout-without-navbar",
  });
});
route.get("/ui-alerts", (req, res, next) => {
  res.render("ui-alerts", { title: "Alerts" });
});
route.get("/ui-buttons", (req, res, next) => {
  res.render("ui-buttons", { title: "Buttons" });
});
route.get("/ui-cards", (req, res, next) => {
  res.render("ui-cards", { title: "Cards" });
});
route.get("/ui-carousel", (req, res, next) => {
  res.render("ui-carousel", { title: "Carousel" });
});
route.get("/ui-dropdowns", (req, res, next) => {
  res.render("ui-dropdowns", { title: "Dropdowns" });
});
route.get("/ui-grid", (req, res, next) => {
  res.render("ui-grid", { title: "Grid" });
});
route.get("/ui-images", (req, res, next) => {
  res.render("ui-images", { title: "Images" });
});
route.get("/ui-modals", (req, res, next) => {
  res.render("ui-modals", { title: "Modals" });
});
route.get("/ui-offcanvas", (req, res, next) => {
  res.render("ui-offcanvas", { title: "Offcanvas" });
});
route.get("/ui-progressbars", (req, res, next) => {
  res.render("ui-progressbars", { title: "Progress Bars" });
});
route.get("/ui-placeholders", (req, res, next) => {
  res.render("ui-placeholders", { title: "Placeholders" });
});
route.get("/ui-tabs-accordions", (req, res, next) => {
  res.render("ui-tabs-accordions", { title: "Tabs & Accordions" });
});
route.get("/ui-typography", (req, res, next) => {
  res.render("ui-typography", { title: "Typography" });
});
route.get("/ui-video", (req, res, next) => {
  res.render("ui-video", { title: "Video" });
});
route.get("/ui-general", (req, res, next) => {
  res.render("ui-general", { title: "General" });
});
route.get("/ui-colors", (req, res, next) => {
  res.render("ui-colors", { title: "Colors" });
});
route.get("/extended-lightbox", (req, res, next) => {
  res.render("extended-lightbox", { title: "Lightbox" });
});
route.get("/extended-rangeslider", (req, res, next) => {
  res.render("extended-rangeslider", { title: "Range Slider" });
});
route.get("/extended-sweet-alert", (req, res, next) => {
  res.render("extended-sweet-alert", { title: "SweetAlerts 2" });
});
route.get("/extended-session-timeout", (req, res, next) => {
  res.render("extended-session-timeout", { title: "Session Timeout" });
});
route.get("/extended-rating", (req, res, next) => {
  res.render("extended-rating", { title: "Rating" });
});
route.get("/extended-notifications", (req, res, next) => {
  res.render("extended-notifications", { title: "Notifications" });
});
route.get("/form-elements", (req, res, next) => {
  res.render("form-elements", { title: "Basic Elements" });
});
route.get("/form-validation", (req, res, next) => {
  res.render("form-validation", { title: "Form Validation" });
});
route.get("/form-advanced", (req, res, next) => {
  res.render("form-advanced", { title: "Form Advanced Plugins" });
});
route.get("/form-editors", (req, res, next) => {
  res.render("form-editors", { title: "Form Editors" });
});
route.get("/form-uploads", (req, res, next) => {
  res.render("form-uploads", { title: "File Upload" });
});
route.get("/form-wizard", (req, res, next) => {
  res.render("form-wizard", { title: "Form Wizard" });
});
route.get("/form-mask", (req, res, next) => {
  res.render("form-mask", { title: "Form Mask" });
});
route.get("/tables-basic", (req, res, next) => {
  res.render("tables-basic", { title: "Bootstrap Basic" });
});
route.get("/tables-datatable", (req, res, next) => {
  res.render("tables-datatable", { title: "DataTables" });
});
route.get("/tables-responsive", (req, res, next) => {
  res.render("tables-responsive", { title: "Responsive Tables" });
});
route.get("/tables-editable", (req, res, next) => {
  res.render("tables-editable", { title: "Editable Tables" });
});
route.get("/charts-apex", (req, res, next) => {
  res.render("charts-apex", { title: "Apexchats" });
});
route.get("/charts-echart", (req, res, next) => {
  res.render("charts-echart", { title: "Echats" });
});
route.get("/charts-chartjs", (req, res, next) => {
  res.render("charts-chartjs", { title: "Chratjs" });
});
route.get("/charts-knob", (req, res, next) => {
  res.render("charts-knob", { title: "Jquery Knob" });
});
route.get("/charts-sparkline", (req, res, next) => {
  res.render("charts-sparkline", { title: "Sparkline Chart" });
});
route.get("/icons-feather", (req, res, next) => {
  res.render("icons-feather", { title: "Feather" });
});
route.get("/icons-boxicons", (req, res, next) => {
  res.render("icons-boxicons", { title: "Boxicons" });
});
route.get("/icons-materialdesign", (req, res, next) => {
  res.render("icons-materialdesign", { title: "Meterial Design" });
});
route.get("/icons-dripicons", (req, res, next) => {
  res.render("icons-dripicons", { title: "Dripicons" });
});
route.get("/icons-fontawesome", (req, res, next) => {
  res.render("icons-fontawesome", { title: "Font Awesome 5" });
});
route.get("/maps-google", (req, res, next) => {
  res.render("maps-google", { title: "Google Maps" });
});
route.get("/maps-vector", (req, res, next) => {
  res.render("maps-vector", { title: "Vactor Maps" });
});
route.get("/maps-leaflet", (req, res, next) => {
  res.render("maps-leaflet", { title: "Leaflet Maps" });
});
route.get("/layouts-horizontal", (req, res, next) => {
  res.render("index", {
    title: "Horizontal Layout",
    page_title: "Horizontal",
    folder: "Layouts",
    layout: "layout/layout-horizontal",
  });
});

module.exports = route;
