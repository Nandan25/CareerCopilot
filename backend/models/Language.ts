import mongoose from "mongoose";

const LanguageSchema = new mongoose.Schema(
    {
        language: {
            type: String,
            required: true,
            trim: true,
        },

        proficiency: {
            type: String,
            enum: [
                "Native",
                "Fluent",
                "Professional",
                "Intermediate",
                "Basic",
            ],
            default: "Professional",
        },
    },
    {
        _id: false,
    }
);

export default LanguageSchema;