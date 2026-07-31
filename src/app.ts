import express from "express";
import { prisma } from "./lib/prisma";

import githubRoutes from "./routes/github.routes";
import analysisRoutes from "./routes/analysis.routes";

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/webhook", githubRoutes);
app.use("/analysis", analysisRoutes);

// Health Check
app.get("/health", async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;

    res.status(200).json({
      status: "ok",
      database: "connected",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      database: "disconnected",
    });
  }
});

export default app;