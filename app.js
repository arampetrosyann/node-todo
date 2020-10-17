const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const favicon = require("serve-favicon");
const path = require("path");
const router = require("./routes/router");
const api = require("./routes/api.v1");
const env = require("./config/env");
const { sessionMiddle } = require("./middlewares/session.middleware");
const {
  notFoundMiddle,
  errorHandler,
} = require("./middlewares/error.middleware");

const viewsPath = path.join(__dirname, "views");
const staticFiles = path.join(__dirname, "public");
const faviconPath = path.join(__dirname, "public", "favicon_io", "favicon.ico");

const app = express();

app.set("view engine", "pug");
app.set("views", viewsPath);
app.use(favicon(faviconPath));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(staticFiles));
app.use(session({ secret: env.KEY, saveUninitialized: false, resave: true }));

app.use(sessionMiddle);
app.use(router);
app.use(api);
app.use(notFoundMiddle);
app.use(errorHandler);

app.listen(env.PORT);
