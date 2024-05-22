module.exports = {
  //auth variables
  secret: process.env.JWT_SECRET,

  //Database variables
  dbUrl: process.env.DATABASE_LOCAL,
  dbPwd: process.env.DATABASE_PASSWORD,

  //system variables
  sysPort: process.env.PORT,

  //email variables
  email_user: process.env.EMAIL_USERNAME,
  email_pwd: process.env.EMAIL_PASSWORD,
  email_host: process.env.EMAIL_HOST,
  email_port: process.env.EMAIL_PORT,
};
