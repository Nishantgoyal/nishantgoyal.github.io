const methodOverride  = require("method-override"),
      localStrategy = require("passport-local"),
      flash       = require("connect-flash"),
      bodyParser  = require("body-parser"),
      mongoose    = require("mongoose"),
      passport    = require("passport"),
      express     = require("express"),
      app         = express(),
      seedDB      = require("./seeds.js");

seedDB();

const User        = require("./models/users");

var indexRoutes       = require("./routes/index"),
    todoRoutes        = require("./routes/todos");

mongoose.connect("mongodb://resume_db/resume");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.set("view engine","ejs");

app.use(require("express-session")({
  secret: "ih77mV1njErjOX2A0gOJpc4tY",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  next();
});

app.use(methodOverride("_method"));

app.use(indexRoutes);
app.use("/todos", todoRoutes);

app.use(flash);

app.listen(8080, function() {
    console.log("Resume app");
});
