import express from 'express';
import {
  listProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject
} from '../controllers/projectController';

const router = express.Router();

router.get('/', listProjects);
router.post('/', createProject);
router.get('/:id', getProject);
router.put('/:id', updateProject);
router.delete('/:id', deleteProject);

export default router; 