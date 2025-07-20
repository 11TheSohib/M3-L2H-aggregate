import { Router } from "express";
import subscription from "../controllers/subscription.controller.js";

const router = Router();

router
  .post(`/`, subscription.create)
  .get(`/`, subscription.getAll)
  .get(`/:id`, subscription.getById)
  .put(`/:id`, subscription.update)
  .delete(`/:id`, subscription.delete);

export default router;
