const passport = require('passport');
var GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
const GOOGLE_CLIENT_ID = "318740633733-q5fibst1q4ftv0bagglsni6uru9te87a.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";

passport.use(new GoogleStrategy({
        clientID:     GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:3000/auth/google/callback",
        passReqToCallback: true,
    },
    function(request, accessToken, refreshToken, profile, done) {
        return done(null, profile);
    }));

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});
