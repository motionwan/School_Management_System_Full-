const express = require('express');
const router = express.Router();
const {
  createFees,
  getFees,
  getFeesById,
  getDetailedFees,
  getDetailedFeesWithSectionId,
  getDetailedFeesBySearch,
  getLatestFee,
  updateFees,
  deleteFees,
  payFees,
} = require('../../../controllers/Accounting/Fees/Fees.controller');

// Route to create a new fee record
router.post('/', createFees);

// Route to pay fees
router.post('/pay', payFees);

// Route to get a list of all fee records
router.get('/', getFees);

// Route to get a list of detailed fees
router.get('/detailed/:id', getDetailedFees);

// Route to get a list of detailed fees with section
router.get('/detailed-section/:id', getDetailedFeesWithSectionId);

// Route to get a list of detailed fees by searching
router.get('/detailed-fees/:id', getDetailedFeesBySearch);

// Route to get a list of latest fee for each student
router.get('/latest-fees', getLatestFee);

// Route to get a single fee record by ID
router.get('/:id', getFeesById);

// Route to update a fee record by ID
router.put('/:id', updateFees);

// Route to delete a fee record by ID
router.delete('/:id', deleteFees);

module.exports = router;
