import { Router } from "express";
import * as healthController from "../controllers/health.controller.js";


const healthRouter: any = Router();

healthRouter.get("/", healthController.getHealth)

export default healthRouter
