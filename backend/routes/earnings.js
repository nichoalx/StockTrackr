const express = require('express');
const router = express.Router();
const earningsController = require('../controllers/earningsController');

// GET all earnings
router.get('/', earningsController.getAllEarnings);

// GET single earning by ID
router.get('/:id', earningsController.getEarningsById);

// GET earnings by type
router.get('/type/:type', earningsController.getEarningsByType);

// GET earnings by date
router.get('/date/:date', earningsController.getEarningsByDate);

// POST new earning
router.post('/', earningsController.createEarnings);

// PATCH update earning
router.patch('/:id', earningsController.updateEarnings);

// DELETE earning
router.delete('/:id', earningsController.deleteEarnings);

// Export earnings to CSV
router.get('/export', earningsController.exportEarnings);

module.exports = router;