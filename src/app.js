require("./passport/localAuth");
require("./database/database");
const express = require("express");
const app = express();
const hbs = require("express-handlebars");
const morgan = require("morgan");
const passport = require("passport");
const path = require("path");
const router = require("./routes/index.routes");
const session = require("express-session");

app.engine(
	"hbs",
	hbs({
		extname: "hbs",
		defaultLayout: "layout",
		layoutsDir: path.join(__dirname, "/views", "/layouts"),
	})
);

app.set("port", process.env.PORT || 4500);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(morgan("tiny"));
app.use(express.json());
app.use(
	express.urlencoded({
		extended: false,
	})
);

app.use(express.static(path.join(__dirname, "public")));
app.use(
	session({
		secret: "secretcookie",
		resave: false,
		saveUninitialized: false,
	})
);
app.use(passport.initialize());
app.use(passport.session());

app.use(router);

app.listen(app.get("port"), () => {
	console.log(`listen on port ${app.get("port")}`);
});
