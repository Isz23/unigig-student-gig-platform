import express from 'express';
import { protect, adminOnly } from '../middleware/authMiddleware.js';
import {
  getAdminStudents,
  getAdminClients,
  verifyStudentStatus,
  updateUserByAdmin,
  deleteUserByAdmin,
  deleteGigByAdmin,
  deleteJobByAdmin
} from '../controllers/adminController.js';

const router = express.Router();

router.use(protect, adminOnly);

router.get('/students', getAdminStudents);
router.get('/clients', getAdminClients);
router.put('/users/:userId/verify', verifyStudentStatus);
router.put('/users/:userId', updateUserByAdmin);
router.delete('/users/:userId', deleteUserByAdmin);
router.delete('/gigs/:gigId', deleteGigByAdmin);
router.delete('/jobs/:jobId', deleteJobByAdmin);

export default router;