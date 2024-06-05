require("dotenv").config();
const express = require("express");
const load = require("express-load");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const multer = require("multer");
const helmet = require("helmet");
const compression = require("compression");
const cors = require("cors");
const morgan = require("morgan");
const config = require("./config/config");

const User = require("./models/userModel");

const authRouter = require("./routes/authRoute");
const calendarRouter = require("./routes/calendarRoute");
const caseCategoryRouter = require("./routes/caseCategoryRoute");
const caseEventRouter = require("./routes/caseEventRoute");
const caseFeeRouter = require("./routes/caseFeeRoute");
const casePartyRouter = require("./routes/casePartyRoute");
const caseRouter = require("./routes/caseRoute");
const clientCategoryRouter = require("./routes/clientCategoryRoute");
const contactPersonRouter = require("./routes/contactPersonRoute");
const clientRouter = require("./routes/clientRoute");
const conferenceRouter = require("./routes/conferenceRoute");
const contactAddressRouter = require("./routes/contactAddressRoute");
const countryRouter = require("./routes/countryRoute");
const courtRouter = require("./routes/courtRoute");
const complaintRouter = require("./routes/complaintRoute");
const departmentRouter = require("./routes/departmentRoute");
const employeeRouter = require("./routes/employeeRoute");
const employeeCategoryRouter = require("./routes/employeeCategoryRoute");
const employeePositionRouter = require("./routes/employeePositionRoute");
const eventTypeRouter = require("./routes/eventTypeRoute");
const feeTypeRouter = require("./routes/feeTypeRoute");
const judgeRouter = require("./routes/judgeRoute");
const firmRouter = require("./routes/firmRoute");
const lawyerRouter = require("./routes/lawyerRoute");
const partyTypeRouter = require("./routes/partyTypeRoute");
const paymentRouter = require("./routes/paymentRoute");
const regionRouter = require("./routes/regionRoute");
const userRouter = require("./routes/userRoute");
const visitorRouter = require("./routes/visitorRoute");
const visitRouter = require("./routes/visitRoute");

const app = express();
const PORT = config.sysPort || 3000;
const DB = config.dbUrl;

// Middleware
// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Multer configuration for handling FormData
const upload = multer();

// Middleware to parse FormData or multipart form data
app.use(upload.none()); // Handle FormData without files; use upload.single('fieldname') for single-file uploads

// Parse URL-encoded bodies (as sent by HTML forms)
//app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(compression());
app.use(cors());
app.use(morgan("dev"));

app.use("/", authRouter);
app.use("/", calendarRouter);
app.use("/casecategories", caseCategoryRouter);
app.use("/", caseEventRouter);
app.use("/", caseFeeRouter);
app.use("/", casePartyRouter);
app.use("/", caseRouter);
app.use("/clientcategories", clientCategoryRouter);
app.use("/complaints", complaintRouter);
app.use("/", contactPersonRouter);
app.use("/clients", clientRouter);
app.use("/", conferenceRouter);
app.use("/", contactAddressRouter);
app.use("/", countryRouter);
app.use("/courts", courtRouter);
app.use("/departments", departmentRouter);
app.use("/employees", employeeRouter);
app.use("/employeepositions", employeePositionRouter);
app.use("/employeecategories", employeeCategoryRouter);
app.use("/", eventTypeRouter);
app.use("/", feeTypeRouter);
app.use("/", judgeRouter);
app.use("/firms", firmRouter);
app.use("/", lawyerRouter);
app.use("/", partyTypeRouter);
app.use("/", paymentRouter);
app.use("/", regionRouter);
app.use("/", userRouter);
app.use("/", visitorRouter);
app.use("/", visitRouter);

// Automatically load routes from the 'routes' directory
// load("routes").into(app);
// app.use("/", routes);
// Connect to the database
mongoose
  .connect(DB, {})
  .then(async () => {
    console.log("Connected to database");
    // Start the server
    const http = require("http").createServer(app);
    http.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    //app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error("Database connection error:", err));
/* --------- seeder ------------ */
const migration = async () => {
  const user = User.find({ email: "dason@themesbrand.com" });

  if (user.length == 0) {
    await User.create({
      email: "dason@themesbrand.com",
      first_name: "admin",
      last_name: "last name",
      location: "surat",
      password: "12345678",
    });
    console.log("default user created success");
  }
};
migration();
