
module.exports = function(app, passport) {

  // LANDING PAGE
  app.get("/", function(req, res) {
    res.render("start");
  });

  // LOGIN
  app.get("/login", function(req, res) {
    res.render("login");
  });

  app.post(
    "/login",
    passport.authenticate("local-signin", {
      successRedirect: "/select",
      failureRedirect: "/login"
    }),
    function(req, res) {
      console.log("hello");

      if (req.body.remember) {
        req.session.cookie.maxAge = 1000 * 60 * 60 * 3;
      } else {
        req.session.cookie.expires = false;
      }
      res.redirect("/");
    }
  );

  // SIGN UP
  app.get("/signup", function(req, res) {
    res.render("signup");
  });

  app.post(
    "/signup",
    passport.authenticate("local-signup", {
      successRedirect: "/select",
      failureRedirect: "/signup"
    })
  );

  // HOME PAGE SELECT
  app.get("/select", isLoggedIn, function(req, res) {
    res.render("select");
  });

  // KIDS HOMEPAGE
  app.get("/home", isLoggedIn, function(req, res) {
    res.render("index");
  });

  // BOOKS
  app.get("/books", isLoggedIn, function(req, res) {
    res.render("book");
  });

  // KIDS USER PAGE
  app.get("/user", isLoggedIn, function(req, res) {
    res.render("user");
  });

  // PARENT HOME PAGE
  app.get("/parent", isLoggedIn, function(req, res) {
    res.render("store");
  });

  // LOGOUT
  app.get("/logout", function(req, res) {
    req.logout();
    req.session.destroy();
    res.redirect("/");
    // res.send("logged out");
  });

  // 404
  app.get("*", function(req, res) {
    res.render("404");
  });
};

// MIDDLEWARE (LOGIN CHECK)
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}
