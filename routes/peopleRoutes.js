import express from "express";
import {
  createPeople,
  getAllPeople,
  getPeopleById,
  updatePeople,
  deletePeople,
} from "../controllers/peopleController.js";

const router = express.Router();

router.route("/").get(getAllPeople).post(createPeople);
router.route("/:id").get(getPeopleById).put(updatePeople).delete(deletePeople);

export default router;
