const mongoose = require('mongoose');

const FeeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    admissionNumber: {
      type: String,
      required: true,
    },
    sectionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ClassSection',
      required: true,
    },
    classSchoolId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ClassSchool',
      required: true,
    },

    fees: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'FeeType',
        required: true,
      },
    ],
    termFees: {
      type: Number,
      required: true,
    },
    totalFeePayable: {
      type: Number,
      required: true,
    },
    arrears: {
      type: Number,
      default: 0,
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    partiallyPaid: {
      type: Boolean,
      default: false,
    },
    termId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Term',
      required: true,
    },
    paymentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Payment',
    },
    academicYear: { type: mongoose.Schema.Types.ObjectId, ref: 'AcademicYear' },
    balance: {
      type: Number,
      default: 0,
    },
    dueDate: { type: Date, required: true },
  },
  { timestamps: true }
); // add this option

module.exports = mongoose.model('Fee', FeeSchema);
