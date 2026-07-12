import crypto from "crypto";
import { Request, Response, NextFunction } from "express";

export function verifyGithubSignature(
  req: Request,
  res: Response,
  next: NextFunction
) {

  const signature = req.header("X-Hub-Signature-256");

  if (!signature) {
    return res.status(401).json({
      message: "Missing signature"
    });
  }

  const secret = process.env.WEBHOOK_SECRET!;

  const expectedSignature =
    "sha256=" +
    crypto
      .createHmac("sha256", secret)
      .update(JSON.stringify(req.body))
      .digest("hex");

  const valid = crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  );

  if (!valid) {
    return res.status(401).json({
      message: "Invalid signature"
    });
  }

  next();
}