import express from "express";
import {
  getAllCategoriesController,
  createCategoryController,
   getCategoryByIdController,
    updateCategoryController,
    deleteCategoryController
} from "../controllers/categoryController.js";


const router = express.Router();
router.get('/', getAllCategoriesController);
router.post('/', createCategoryController);
router.get('/:id',  getCategoryByIdController);
router.put('/:id',  updateCategoryController);
router.delete("/:id", deleteCategoryController);







export default router;