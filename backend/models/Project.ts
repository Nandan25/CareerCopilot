import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        role: {
            type: String,
            trim: true,
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

        githubUrl: {
            type: String,
            trim: true,
        },

        liveUrl: {
            type: String,
            trim: true,
        },

        startMonth: {
            type: Number,
            min: 1,
            max: 12,
        },

        startYear: {
            type: Number,
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

        ongoing: {
            type: Boolean,
            default: false,
        },
    },
    {
        _id: false,
    }
);

export default ProjectSchema;