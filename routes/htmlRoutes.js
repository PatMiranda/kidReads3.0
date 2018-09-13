module.exports = function(app, passport) {

  // Load start page
  app.get("/", function(req, res) {
      res.render("start");
  });

  app.get('/login', function(req,res){
      res.render('login'); 
  });

  app.post('/login', passport.authenticate('local-signin', {
      successRedirect: '/select',
      failureRedirect: '/login'
  }));

  app.get('/signup', function(req,res){
      res.render('signup'); 
  });
  
  app.post('/signup', passport.authenticate('local-signup', {
      successRedirect: '/select',
      failureRedirect: '/signup'
  }));

  app.get('/select',isLoggedIn, function(req,res){
      res.render('select'); 
  });

  // Load example page and pass in an example by id
  app.get("/books", function(req, res) {
      res.render("book");
  });

  app.get("/user", function(req, res) {
      res.render("user");
  });
  
  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
      res.render("404");
  });

  app.get('/logout', function(req,res){
      res.render('logout'); 
  });

  function isLoggedIn(req, res, next) {
      if (req.isAuthenticated())
          return next();  
      res.redirect('/login');
  };
   
};