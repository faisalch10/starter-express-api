import express from 'express';

import {
  getCars,
  createCar,
  getCarById,
  updateCar,
  deleteCar,
} from '../controllers/carsController.js';
import protect from '../middlewares/protect.js';

const router = express.Router();

router.route('/').get(protect, getCars).post(protect, createCar);
router
  .route('/:id')
  .get(protect, getCarById)
  .put(protect, updateCar)
  .delete(protect, deleteCar);

export default router;
