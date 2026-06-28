import mongoose from "mongoose";

const CertificationSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        issuer: {
            type: String,
            required: true,
            trim: true,
        },

        issueMonth: {
            type: Number,
            min: 1,
            max: 12,
        },

        issueYear: {
            type: Number,
            min: 1900,
            max: 2100,
        },

        expiryMonth: {
            type: Number,
            min: 1,
            max: 12,
        },

        expiryYear: {
            type: Number,
            min: 1900,
            max: 2100,
        },

        credentialId: {
            type: String,
            trim: true,
        },

        credentialUrl: {
            type: String,
            trim: true,
        },
    },
    {
        _id: false,
    }
);

export default CertificationSchema;