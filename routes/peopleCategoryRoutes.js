import express from "express";
const router = express.Router();
import {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "../controllers/peopleCategoryController.js";

router.route("/").post(createCategory).get(getAllCategories);
router
  .route("/:id")
  .get(getCategoryById)
  .put(updateCategory)
  .delete(deleteCategory);

export default router;
