import { Express } from "express";
import  express  from "express";
import cors from "cors"
import { env } from "./config/env.js";
import dns from "dns";
import apiV1Router from "./routes/index.js";
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const app: Express = express()
app.use(
    cors({
        origin: env.CORS_ORIGIN,
        credentials: true
    })
)
app.use(express.json({limit: "16kb"}));
app.use(express.urlencoded({extended: true, limit:"16kb"}));
app.use(express.static("public"));

  app.get("/", (_req, res) => {
    res.json({
      message: "API is running",
      docs: "Use GET /api/v1/health for a health check",
    });
  });

app.use(env.API_PREFIX, apiV1Router)
export default app