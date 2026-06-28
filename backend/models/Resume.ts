import mongoose from "mongoose";
import PersonalInfoSchema from "./PersonalInfo";
import ExperienceSchema from "./Experience";
import EducationSchema from "./Education";
import ProjectSchema from "./Project";
import CertificationSchema from "./Certification";
import SkillSchema from "./Skill";
import LanguageSchema from "./Language";

const ResumeSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },

        title: {
            type: String,
            required: true,
            trim: true,
            default: "Untitled Resume",
        },

        personalInfo: {
            type: PersonalInfoSchema,
            required: true,
        },

        experience: {
            type: [ExperienceSchema],
            default: [],
        },

        education: {
            type: [EducationSchema],
            default: [],
        },

        projects: {
            type: [ProjectSchema],
            default: [],
        },

        certifications: {
            type: [CertificationSchema],
            default: [],
        },

        skills: {
            type: [SkillSchema],
            default: [],
        },

        languages: {
            type: [LanguageSchema],
            default: [],
        },

        sectionOrder: {
            type: [String],
            default: [
                "summary",
                "experience",
                "education",
                "projects",
                "skills",
                "certifications",
                "languages",
            ],
        },

        template: {
            type: String,
            default: "classic",
        },

        theme: {
            primaryColor: {
                type: String,
                default: "#2563eb",
            },
            fontFamily: {
                type: String,
                default: "Inter",
            },
        },

        visibility: {
            type: String,
            enum: ["private", "public", "unlisted"],
            default: "private",
        },

        isDefault: {
            type: Boolean,
            default: false,
        },

        lastEditedAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Resume", ResumeSchema);