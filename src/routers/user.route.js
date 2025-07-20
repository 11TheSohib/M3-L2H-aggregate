import { Router } from "express";
import user from "../controllers/user.controller.js";

const router = Router();

router
  .post(`/`, user.create)
  .get(`/`, user.getAll)
  .get(`/top-bloggers`, user.getTopBloggers)
  .get(`/:id`, user.getById)
  .put(`/:id`, user.update)
  .delete(`/:id`, user.delete);

export default router;
