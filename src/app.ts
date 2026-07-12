import express from "express";
import { prisma } from "./lib/prisma";
import githubRoutes from "./routes/github.routes";
const app = express();

app.use(express.json());
app.use("/webhook", githubRoutes);

app.get("/health", async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;

    res.json({
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