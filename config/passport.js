const passport = require('passport')
const User = require('../models/user')
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    // google callback is the page that needs to load after the user signs in, google will redirect the user to this page
    callbackURL: process.env.GOOGLE_CALLBACK
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOne({ 'googleId': profile.id }, function(err, user) {
      if (err) return cb(err)
      if (user) {
        console.log(profile)
        return cb(null, user)
      } else {
        var newUser = new User({
          // you can find all the profile properties by console logging it
          name: profile.displayName,
          email: profile.emails[0].value,
          googleId: profile.id
        })
        newUser.save(function(err) {
          if (err) {
            return cb(err);
          } 
          return cb(null, newUser);
        })
      }
    })
  }
))

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    })
})