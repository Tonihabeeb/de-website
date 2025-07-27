import express from 'express';
import {
  listPages,
  getPage,
  createPage,
  updatePage,
  deletePage,
  publishPage,
  unpublishPage
} from '../controllers/pageController';

const router = express.Router();

router.get('/', listPages);
router.post('/', createPage);
router.get('/:id', getPage);
router.put('/:id', updatePage);
router.delete('/:id', deletePage);
router.post('/:id/publish', publishPage);
router.post('/:id/unpublish', unpublishPage);

export default router; 