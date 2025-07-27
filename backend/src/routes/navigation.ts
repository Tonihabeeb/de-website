import { Router } from 'express';
import { listNavigationMenus } from '../controllers/navigationMenuController';

const router = Router();

router.get('/', listNavigationMenus);

export default router; 