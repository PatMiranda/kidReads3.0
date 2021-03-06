// ==============================================================================
// DEPENDENCIES
// ==============================================================================

var bcrypt = require('bcrypt-nodejs');

// ==============================================================================
// PASSPORT-LOCAL SET-UP (CUSTOM LOGIN)
// ==============================================================================

module.exports = function(passport, user) {
 
    var User = user;
    var LocalStrategy = require('passport-local').Strategy;

    //serialize
    passport.serializeUser(function(user, done) {
        done(null, user.ParentId);
    });

    // deserialize user 
    passport.deserializeUser(function(id, done) {
        User.findById(id).then(function(user) {
            if (user) {
                done(null, user.get());
            } else {
                done(user.errors, null);
            }
        });
    });

    // ==============================================================================
    // SIGN-UP
    // ==============================================================================
    passport.use('local-signup',
    
        new LocalStrategy (
            {
                usernameField : 'email',
                passwordField : 'password',
                passReqToCallback : true
            }, 
            function(req, email, password, done) {

                var generateHash = function(password) {
                    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
                };

                // creates new User
                User.findOne({
                    where: { 
                        Email: email 
                    }
                }).then(function(user) {
                    if (user) {
                        return done(null, false, console.log("That email is already taken"));
                    } 
                        else {
                            var userPassword = generateHash(password);

                            var data = {
                                    Email: email,
                                    Password: userPassword,
                                    FirstName: req.body.firstname,
                                    LastName: req.body.lastname,
                            };

                            User.create(data).then(function(newUser, created) {
                                if (!newUser) {
                                    return done(null, false, console.log("error, error, error"));
                                }
                                if (newUser) {
                                    return done(null, newUser, console.log("created" + newUser));
                                }
                            });
                        }
                });
            }
    ));

    // =============================================================================
    // LOGIN
    // ==============================================================================
    passport.use('local-signin', 
    
        new LocalStrategy ({
            // by default, local strategy uses username and password, we will override with email
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },
        function(req, email, password, done) {

            var User = user;
            var isValidPassword = function(userpass, password) {
                return bcrypt.compareSync(password, userpass);
            }
            
            User.findOne({
                where: {
                    Email: email
                }
            }).then(function(user) {
                if (!user) {
                    return done(null, false, console.log("Email does not exist"));
                }
                if (!isValidPassword(user.Password, password)) {
                    return done(null, false, console.log("Incorrect Password."));
                }
                var userinfo = user.get();
                
                return done(null, userinfo);
            
            }).catch(function(err) {
                console.log("Error:", err);
                return done(null, false, console.log(err));
            });
        }
    ));
};
