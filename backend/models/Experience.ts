import mongoose from "mongoose";

const ExperienceSchema = new mongoose.Schema(
    {
        company: {
            type: String,
            required: true,
            trim: true,
        },

        position: {
            type: String,
            required: true,
            trim: true,
        },

        employmentType: {
            type: String,
            enum: [
                "Full-time",
                "Part-time",
                "Internship",
                "Contract",
                "Freelance",
                "Temporary",
                "Volunteer",
                "Apprenticeship",
            ],
            default: "Full-time",
        },

        location: {
            type: String,
            trim: true,
        },

        workMode: {
            type: String,
            enum: ["On-site", "Remote", "Hybrid"],
        },

        startMonth: {
            type: Number,
            required: true,
            min: 1,
            max: 12,
        },

        startYear: {
            type: Number,
            required: true,
            min: 1900,
            max: 2100,
        },

        endMonth: {
            type: Number,
            min: 1,
            max: 12,
        },

        endYear: {
            type: Number,
            min: 1900,
            max: 2100,
        },

        currentlyWorking: {
            type: Boolean,
            default: false,
        },

        description: [
            {
                type: String,
                trim: true,
            },
        ],

        technologies: [
            {
                type: String,
                trim: true,
            },
        ],
    },
    {
        _id: false,
    }
);

export default ExperienceSchema;