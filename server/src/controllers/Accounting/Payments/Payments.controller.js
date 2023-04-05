const Payment = require('../../../models/Accounting/Payments/Payments.mongo');
const StudentRecord = require('../../../models/Student/StudentRecord/StudentRecord.mongo');
const Fee = require('../../../models/Accounting/Fees/Fees.mongo');

// Function to create a new payment
const createPayment = async (req, res) => {
  try {
    const { admissionNumber, amount } = req.body;
    const payment = new Payment({ admissionNumber, amount });
    await payment.save();

    res.status(201).json(payment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

// Function to get all payments
const getPayments = async (req, res) => {
  try {
    const payments = await Payment.find();
    res.status(200).json(payments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

// Function to get a payment by admission number
const getPaymentById = async (req, res) => {
  try {
    const { id } = req.params; // admission number
    const payment = await Payment.find({ admissionNumber: id });
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }
    res.status(200).json(payment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

// get student record, payment history and fee with admission number
const getPaymentHistory = async (req, res) => {
  try {
    const { admissionNumber } = req.params;
    // Find all payments with the given admission number
    const payments = await Payment.find({ admissionNumber }).sort('-createdAt');

    // res.json(payments);

    //Find the student's information
    const studentRecord = await StudentRecord.findOne({ admissionNumber });

    // Find the latest invoice for the student
    const latestFee = await Fee.findOne({ admissionNumber }).sort('-createdAt');
    //.populate('fees termId classSchoolId sectionId');

    res.json({
      admissionNumber,
      studentInfo: {
        firstName: studentRecord?.fullName,
        email: studentRecord?.email,
        phone: studentRecord?.phone,
        address: studentRecord?.address,
      },
      paymentHistory: payments,
      latestInvoice: latestFee,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// Function to update a payment
const updatePayment = async (req, res) => {
  try {
    const { admissionNumber, amount } = req.body;
    const payment = await Payment.findByIdAndUpdate(
      req.params.id,
      { admissionNumber, amount },
      { new: true }
    );
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }
    res.status(200).json({ message: 'Payment updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

// Function to delete a payment
const deletePayment = async (req, res) => {
  try {
    const payment = await Payment.findByIdAndDelete(req.params.id);
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }
    res.status(200).json({ message: 'Payment deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

module.exports = {
  createPayment,
  getPayments,
  getPaymentById,
  getPaymentHistory,
  updatePayment,
  deletePayment,
};
