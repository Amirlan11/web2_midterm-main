// const mongoose = require("mongoose");
// const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const findOrCreate = require('mongoose-findorcreate')
// let userSchema = new mongoose.Schema({
//     email: String,
//     password: String,
//     //level 6
//     googleId: String
// });
// userSchema.plugin(findOrCreate)
// let userModel = new mongoose.model("User", userSchema);
// //level 6
// passport.serializeUser(function (user, done) {
//     done(null, user.id)
// })
// passport.deserializeUser(function (id, done) {
//     userModel.findById(id, function (err, user) {
//         done(err,user)
//     })
// })
//
// //level 6
// passport.use(new GoogleStrategy({
//         clientID: process.env.CLIENT_ID,
//         clientSecret: process.env.CLIENT_SECRET,
//         callbackURL: "http://localhost:3000/auth/google/osekter"
//     },
//     function(accessToken, refreshToken, profile, cb) {
//         userModel.findOrCreate({ googleId: profile.id }, function (err, user) {
//             return cb(err, user);
//         });
//     }
// ));
// //
// module.exports = userModel;