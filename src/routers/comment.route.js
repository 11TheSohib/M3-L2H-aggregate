import { Router } from "express";
import comment from "../controllers/comment.controller.js";

const router = Router();

router
  .post(`/`, comment.create)
  .get(`/`, comment.getAll)
  .get(`/:id`, comment.getById)
  .put(`/:id`, comment.update)
  .delete(`/:id`, comment.delete);

export default router;
