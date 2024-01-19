import express from 'express';

import {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} from '../controllers/categoriesController.js';
import protect from '../middlewares/protect.js';

const router = express.Router();

router.route('/').get(protect, getCategories).post(protect, createCategory);
router
  .route('/:id')
  .get(protect, getCategoryById)
  .put(protect, updateCategory)
  .delete(protect, deleteCategory);

export default router;
