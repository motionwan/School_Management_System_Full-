const express = require('express');
const router = express.Router();
const {
  createPayment,
  getPayments,
  getPaymentById,
  getPaymentHistory,
  updatePayment,
  deletePayment,
} = require('../../../controllers/Accounting/Payments/Payments.controller');

// Route to create a new payment
router.post('/', createPayment);

// Route to get all payments
router.get('/', getPayments);

// Route to get a payment by ID
router.get('/:id', getPaymentById);

// Route to get a paymentHIstory by admission number
router.get('/history/:admissionNumber', getPaymentHistory);

// Route to update a payment
router.put('/:id', updatePayment);

// Route to delete a payment
router.delete('/:id', deletePayment);

module.exports = router;
