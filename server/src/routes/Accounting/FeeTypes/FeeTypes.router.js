const express = require('express');
const router = express.Router();
const {
  createFeeType,
  getFeeTypes,
  getFeeTypeById,
  updateFeeType,
  deleteFeeType,
} = require('../../../controllers/Accounting/FeeTypes/FeeTypes.controller');

// Create a new fee type
router.post('/', createFeeType);

// Get all fee types
router.get('/', getFeeTypes);

// Get a single fee type by ID
router.get('/:id', getFeeTypeById);

// Update a fee type by ID
router.put('/:id', updateFeeType);

// Delete a fee type by ID
router.delete('/:id', deleteFeeType);

module.exports = router;
