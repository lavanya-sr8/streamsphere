import express from 'express';
import {
  getMovieDetails,
  getTrendingMovie,
  getTrendingTamil,
  getMovieTrailer
} from '../controllers/movie.controller.js';

const router = express.Router();

router.get('/movie/trending', getTrendingMovie);
router.get('/:id/details', getMovieDetails);
router.get('/:id/trailer', getMovieTrailer);
router.get('/movie/trendings', getTrendingTamil);

export default router;
