import mongoose from 'mongoose';

const geminiUsageSchema = new mongoose.Schema({
    count: { type: Number, default: 0 },
    lastReset: { type: Date, default: new Date() },
});

const UserSchema = new mongoose.Schema({
    googleId: { type: String, unique: true, sparse: true },
    name: { type: String, required: true },
    email: { type: String, unique: true, sparse: true }, // Not required for Google logins
    password: { type: String }, // Not required for Google logins
    picture: { type: String, },

    geminiUsage: {
        type: geminiUsageSchema,
        default: () => ({ count: 0, lastReset: new Date() }),
    },


}, { timestamps: true });



export const User = mongoose.model('User', UserSchema);
