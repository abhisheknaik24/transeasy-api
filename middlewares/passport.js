import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../models/users.js';

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.OAUTH_CLIENT_ID,
      clientSecret: process.env.OAUTH_CLIENT_SECRET,
      callbackURL: `${process.env.SERVER_URL}/auth/google/callback`,
      scope: ['profile', 'email'],
    },
    async (accessToken, refreshToken, profile, callback) => {
      let user = await User.exists({
        email: profile._json.email,
        isActive: true,
      });

      if (user) {
        let u = await User.findOne({
          email: profile._json.email,
          isActive: true,
        });

        callback(null, u);
      } else {
        let u = new User({
          firstName: profile._json.given_name,
          lastName: profile._json.family_name,
          email: profile._json.email,
          picture: profile._json.picture,
        });

        await u.save();

        callback(null, u);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

export default passport;
