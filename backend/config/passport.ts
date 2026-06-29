import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { User } from '../models/User';
import bcrypt from 'bcrypt';

export const setupPassport = () => {
    passport.use(new LocalStrategy(
        { usernameField: 'email' },
        async (email, password, done) => {
            try {
                const user = await User.findOne({ email });
                if (!user || !user.password) {
                    return done(null, false, { message: 'Incorrect email or password.' });
                }
                const isMatch = await bcrypt.compare(password, user.password);
                if (!isMatch) {
                    return done(null, false, { message: 'Incorrect email or password.' });
                }
                return done(null, user);
            } catch (error) {
                return done(error);
            }
        }
    ));

    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        callbackURL: '/auth/google/callback'
    },
        async (accessToken, refreshToken, profile, done) => {
            try {
                let user = await User.findOne({ googleId: profile.id });
                if (user) {
                    return done(null, user);
                } else {
                    const email = profile.emails && profile.emails.length > 0 ? profile.emails[0].value : undefined;
                    if (!email) {
                        return done(new Error("No email found for Google profile"), undefined);
                    }
                    user = new User({
                        googleId: profile.id,
                        email: email,
                        name: profile.displayName
                    });
                    await user.save();
                    return done(null, user);
                }
            } catch (error) {
                return done(error);
            }
        }
    ));

    passport.serializeUser((user: any, done) => {
        done(null, user._id); // Use user._id instead of user.id
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findById(id);
            done(null, user);
        } catch (error) {
            done(error);
        }
    });
};
