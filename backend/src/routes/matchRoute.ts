import { Router } from "express";
import { getRecommendations } from "../controllers/matchController";

const router = Router();

router.post("/recommendations", getRecommendations);

export default router;
