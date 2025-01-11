import express from 'express';
import { addReview } from '../controllers/reviewController.js';

const  reviewRouter = express.Router();

reviewRouter.post('/add_review/:productId', addReview);

export default reviewRouter;
