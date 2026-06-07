import type { Request, Response } from "express";
import { calculateMatch, type QuizScores } from "../services/matchService";

export async function getRecommendations(req: Request, res: Response): Promise<void> {
  try {
    const { totalScore, quizScores } = req.body as {
      totalScore?: number;
      quizScores?: QuizScores;
    };

    if (totalScore === undefined || quizScores === undefined) {
      res.status(400).json({
        success: false,
        error: "Missing required fields: totalScore and quizScores",
      });
      return;
    }

    const matchResults = await calculateMatch(totalScore, quizScores);

    res.status(200).json({
      success: true,
      data: matchResults,
    });
  } catch (error) {
    console.error("Error in getRecommendations controller:", error);
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
}
