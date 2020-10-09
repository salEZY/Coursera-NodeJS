var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const mongoose = require("mongoose");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const dishRouter = require("./routes/dishRouter");
const promoRouter = require("./routes/promoRouter");
const leaderRouter = require("./routes/leaderRouter");

const url = "mongodb://localhost:27017/confusion";
const connect = mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

connect
  .then((db) => {
    console.log("Connect to MongoDB server!");
  })
  .catch((err) => console.log(err));

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const auth = (req, res, next) => {
  let authHeader = req.headers.authorization;

  if (!authHeader) {
    let err = new Error("You are not authenticated!");

    res.setHeader("WWW-Authenticate", "Basic");
    err.status = 401;
    next(err);
  }

  let auth = new Buffer.from(authHeader.split(" ")[1], "base64")
    .toString()
    .split(":");
  console.log(auth.authorization);

  let username = auth[0];
  let password = auth[1];

  if (username === "admin" && password === "password") {
    next();
  } else {
    let err = new Error("You are not authenticated!");

    res.setHeader("WWW-Authenticate", "Basic");
    err.status = 401;
    next(err);
  }
};

app.use(auth);

app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/dishes", dishRouter);
app.use("/promotions", promoRouter);
app.use("/leaders", leaderRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;