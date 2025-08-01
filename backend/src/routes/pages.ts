import express from 'express';
import {
  listPages,
  getPage,
  getPageBySlug,
  createPage,
  updatePage,
  deletePage,
  publishPage,
  unpublishPage
} from '../controllers/pageController';

const router = express.Router();

router.get('/', listPages);
router.post('/', createPage);
router.get('/slug', getPageBySlug); // Handle empty slug case
router.get('/slug/:slug', getPageBySlug); // Handle slug with value
router.get('/:id', getPage);
router.put('/:id', updatePage);
router.delete('/:id', deletePage);
router.post('/:id/publish', publishPage);
router.post('/:id/unpublish', unpublishPage);

export default router; 