import express from "express";
import {
	//getSimilarTvs,
	getTrendingTv,
	getTvDetails,
	// getTvsByCategory,
	// getTvTrailers,
} from "../controllers/tv.controller.js";

const router = express.Router();

router.get("/trending", getTrendingTv);

router.get("/:id/details", getTvDetails);
// router.get("/:id/similar", getSimilarTvs);
// router.get("/:category", getTvsByCategory);
//router.get("/:id/trailers", getTvTrailers);

export default router;
