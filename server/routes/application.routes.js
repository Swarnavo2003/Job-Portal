import express from "express";
import {
  applyJob,
  getApplicants,
  getAppliedJobs,
  updateStatus,
} from "../controllers/application.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const applicationRouter = express.Router();

applicationRouter.post("/apply/:id", isAuthenticated, applyJob);
applicationRouter.get("/get", isAuthenticated, getAppliedJobs);
applicationRouter.get("/:id/applicants", isAuthenticated, getApplicants);
applicationRouter.post("/status/:id/update", isAuthenticated, updateStatus);

export default applicationRouter;
