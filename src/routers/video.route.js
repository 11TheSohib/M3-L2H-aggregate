import { Router } from "express";
import video from "../controllers/videos.controller.js";

const router = Router();

router
  .post(`/`, video.create)
  .get(`/`, video.getAll)
  .get(`/videosStats`, video.getUserVideoStats)
  .get(`/popular-categories`, video.getPopularCategories)
  .get(`/:id`, video.getById)
  .put(`/:id`, video.update)
  .delete(`/:id`, video.delete);

export default router;
