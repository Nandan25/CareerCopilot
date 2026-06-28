import jwt from "jsonwebtoken";
import { User } from "../models/User";
import { AppLogger } from "../utils/logger";

// Middleware to protect routes

export const protect = async (req: any, res: any, next: any) => {
    try {
        AppLogger.info("Entering protect middleware");

        let token: string | undefined;

        // Check Authorization header first
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer ")
        ) {
            token = req.headers.authorization.split(" ")[1];
        }

        // If no header token, check cookies
        if (!token && req.cookies?.token) {
            token = req.cookies.token;
        }

        if (!token) {
            return res.status(401).json({
                message: "Not authorized, no token",
            });
        }

        const secret = process.env.JWT_SECRET ?? "test-secret";
        const decoded: any = jwt.verify(token, secret);

        req.user = await User.findById(decoded.id).select("-password");

        if (!req.user) {
            return res.status(401).json({
                message: "User not found",
            });
        }

        next();
    } catch (e: any) {
        AppLogger.error(`Error in protect middleware: ${e.message}`);
        return res.status(401).json({
            message: "Token failed",
            error: e.message,
        });
    }
};

export const limitGeminiUsage = async (req: any, res: any, next: any) => {
    try {
        const user = req.user; // Already populated by protect middleware
        const now = new Date();
        const twentyFourHours = 24 * 60 * 60 * 1000;

        if (!user.geminiUsage) {
            user.geminiUsage = { count: 0, lastReset: now };
        }

        const lastReset = user.geminiUsage.lastReset || new Date(0);
        const timeSinceReset = now.getTime() - new Date(lastReset).getTime();

        if (timeSinceReset > twentyFourHours) {
            user.geminiUsage.count = 1;
            user.geminiUsage.lastReset = now;
        } else {
            if (user.geminiUsage.count >= 10) {
                return res.status(429).json({
                    error: "Daily Gemini API limit (10) reached. Try again after 24 hours.",
                });
            }
            user.geminiUsage.count += 1;
        }

        await user.save(); // Save updated usage
        res.set("X-Gemini-Remaining", (10 - user.geminiUsage.count).toString());
        next();
    } catch (error) {
        console.error("Error in limitGeminiUsage middleware:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};