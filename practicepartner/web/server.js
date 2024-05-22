const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./app");
const User = require("./models/userModel");
const path = require("path");
dotenv.config({ path: "./config.env" });

const bodyParser = require("body-parser");
// Parse URL-encoded bodies (as sent by HTML forms)
app.use(bodyParser.urlencoded({ extended: true }));
/* ---------for Local database connection---------- */
const DB = process.env.DATABASE_LOCAL;
// app.set("views", __dirname + "/views");
/* --------for Atlas database connection---------- */
// const DB = process.env.DATABASE.replace(
//   "<password>",
//   process.env.DATABASE_PASSWORD
// );

mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then((con) => {
    console.log("DB connection successful!");

    const http = require("http").createServer(app);
    http.listen(process.env.PORT, () =>
      console.log(`Server running on port ${process.env.PORT}`)
    );
  })
  .catch((err) => {
    console.error("Error connecting to the database:", err);
  });

/* --------- seeder ------------ */
const migration = async () => {
  const user = await User.find({ email: "dason@themesbrand.com" });

  if (user.length == 0) {
    await User.create({
      email: "dason@themesbrand.com",
      name: "admin",
      location: "surat",
      password: "12345678",
    });
  }
};
migration();
//client routing

app.post("/profileUpdate", async (req, res) => {
  if (req.files) {
    const targetFile = req.files.file;
    const im = await User.findByIdAndUpdate(req.body.user_id, {
      image: targetFile.name,
    });
    let uploadDir = path.join(
      __dirname,
      "/public/assets/images/profile_pictures",
      targetFile.name
    );
    targetFile.mv(uploadDir, (err) => {
      if (err) return res.status(500).send(err);
      res.send("File uploaded!");
    });
  }
});
app.post("/changename", async (req, res) => {
  if (req.body.user_id) {
    await User.findByIdAndUpdate(req.body.user_id, { name: req.body.name });
    res.send("name updated!");
  }
});
app.get("/:universalURL", (req, res) => {
  res.render("system-pages/pages-404", { title: "Page Not Found" });
});
