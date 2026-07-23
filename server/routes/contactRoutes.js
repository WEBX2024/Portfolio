import { Router } from 'express';
import { handleContactSubmission } from '../controllers/contactController.js';
import { validateContactInput } from '../middleware/validator.js';

const router = Router();

router.post('/', validateContactInput, handleContactSubmission);

export default router;
