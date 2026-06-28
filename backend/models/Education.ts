import mongoose from "mongoose";

const EducationSchema = new mongoose.Schema(
    {
        institution: {
            type: String,
            required: true,
            trim: true,
        },

        degree: {
            type: String,
            required: true,
            trim: true,
        },

        fieldOfStudy: {
            type: String,
            trim: true,
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

        currentlyStudying: {
            type: Boolean,
            default: false,
        },

        grade: {
            type: String,
            trim: true,
        },

        description: [
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

export default EducationSchema;