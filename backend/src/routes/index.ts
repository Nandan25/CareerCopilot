import { Router } from "express";
import healthRouter from "./health.routes.js";


const apiV1Router: any = Router()
apiV1Router.use("/health", healthRouter)

export default apiV1Router