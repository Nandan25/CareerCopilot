import mongoose from "mongoose";

const SkillSchema = new mongoose.Schema(
    {
        category: {
            type: String,
            required: true,
            trim: true,
        },

        skills: [
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

export default SkillSchema;