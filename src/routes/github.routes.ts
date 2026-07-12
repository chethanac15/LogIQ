import { Router } from "express";
import { verifyGithubSignature } from "../middleware/verifyGithub";
import { githubQueue } from "../queues/github.queue";
const router = Router();

router.post("/github", verifyGithubSignature, async (req, res) => {

    await githubQueue.add(
        "workflow-run",
        req.body
    );

    res.sendStatus(200);

});

export default router;