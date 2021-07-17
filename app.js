require("dotenv").config();
require('events').EventEmitter.prototype._maxListeners = 70;
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const expressLayout = require("express-layouts");
const mongoose = require("mongoose");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const methodOverride = require("method-override");
const MongoStore = require("connect-mongo"); 

require("./config/passport")(passport);

const app = express();


//db
let db 
if (process.env.NODE_ENV == "development") {
  db = require("./config/config").mongoURI;
} else {
  db = process.env.mongoURI;
}
let connection = mongoose.connect(db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


const AppError = require("./utilities/appError");
const { CallTracker } = require("assert");
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(process.env.NODE_ENV == "development" ? () => console.log("server connected") : "");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(methodOverride("_method"));
app.use(expressLayout);
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "Abdul",
    saveUninitialized: false,
    resave: false,
    store: MongoStore.create({
      mongoUrl: db,
    }),
  })
);
app.use(flash());

// Passport MiddleWare
app.use(passport.initialize());
app.use(passport.session());

// Message handler
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  res.locals.User = req.user;
  res.locals.path = req.path;
  next();
});

app.use(require("./routes/index"));
app.use(require("./routes/dashboard"));
app.use(require("./routes/users"));
app.use("/news", require("./routes/news"));

// HANDLING UNHANDLED ROUTES
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

// catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404));
// });

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development

  const { status = 500, message = "Something went wrong!" } = err;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  if (status == 404) {
    res.render("error", { message, status });
  } else {
    res.status(status).send(message);
  }
  // render the error page
  // res.status(err.status || 500);
  // res.render('error');
});
module.exports = app;
