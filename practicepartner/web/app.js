const express = require("express");
const app = express();
const path = require("path");
const route = require("./routes/route");
const authroute = require("./routes/authroute");
const expressLayouts = require("express-ejs-layouts");
const i18n = require("i18n-express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const upload = require("express-fileupload");

const ClientRoutes = require("./routes/clientRoute");
const CaseRoutes = require("./routes/caseRoute");
const VisitRoutes = require("./routes/visitRoute");
const SettingRoutes = require("./routes/settingRoute");
const EmployeeRoutes = require("./routes/employeeRoute");
const ComplaintRoutes = require("./routes/complaintRoute");
const DispatchRoutes = require("./routes/dispatchRoute");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "Views"));
app.use(upload());

app.use(express.json());
app.use(
  session({ resave: false, saveUninitialized: true, secret: "nodedemo" })
);
app.use(
  i18n({
    translationsPath: path.join(__dirname, "i18n"), // <--- use here. Specify translations files path.
    siteLangs: ["es", "en", "de", "ru", "it", "fr"],
    textsVarName: "translation",
  })
);
app.use(cookieParser());

app.set("layout", "layout/layout");
app.use(expressLayouts);
app.use(express.static(__dirname + "/public"));

app.use("/", authroute);
app.use("/", route);
app.use("/", ClientRoutes);
app.use("/", CaseRoutes);
app.use("/", VisitRoutes);
app.use("/", SettingRoutes);
app.use("/employees", EmployeeRoutes);
app.use("/complaints", ComplaintRoutes);
app.use("/dispatch", DispatchRoutes);
app.use((err, req, res, next) => {
  let error = { ...err };
  if (error.name === "JsonWebTokenError") {
    err.message = "please login again";
    err.statusCode = 401;
    return res.status(401).redirect("view/login");
  }
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "errors";

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});
module.exports = app;
