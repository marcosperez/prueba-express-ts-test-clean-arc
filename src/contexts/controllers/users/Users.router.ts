import express from "express";
import GetUsersController from "./GetUsers.controller";
import PostUsersController from "./PostUsers.controller";

var router = express.Router();

router.get("/", GetUsersController.handler);
router.post("/", PostUsersController.handler);

export default router;
