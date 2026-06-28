import mongoose from 'mongoose';


const PersonalInfoSchema = new mongoose.Schema(
    {
        firstName: { type: String, required: true, trim: true },
        lastName: { type: String, required: true, trim: true },

        headline: { type: String, trim: true },

        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
        },

        phone: { type: String, trim: true },

        location: {
            city: { type: String, trim: true },
            state: { type: String, trim: true },
            country: { type: String, trim: true },
        },

        website: { type: String, trim: true },
        portfolio: { type: String, trim: true },
        linkedin: { type: String, trim: true },
        github: { type: String, trim: true },
        leetcode: { type: String, trim: true },
        hackerrank: { type: String, trim: true },

        summary: {
            type: String,
            trim: true,
            maxlength: 1000,
        },

        profileImage: {
            type: String,
            default: "",
        },

        links: [
            {
                label: { type: String, trim: true }, // e.g. Medium, Kaggle, Dribbble
                url: { type: String, trim: true },
            },
        ],
    },
    {
        _id: false,
    }
);

export default PersonalInfoSchema;


