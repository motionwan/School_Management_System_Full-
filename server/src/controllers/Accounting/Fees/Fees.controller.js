const Fees = require('../../../models/Accounting/Fees/Fees.mongo');
const FeeType = require('../../../models/Accounting/FeeTypes/FeeType.mongo');
const Payment = require('../../../models/Accounting/Payments/Payments.mongo');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const StudentRecord = require('../../../models/Student/StudentRecord/StudentRecord.mongo');

const createFees = async (req, res) => {
  try {
    const {
      title,
      admissionNumber,
      classSchoolId,
      sectionId,
      fees,
      termId,
      dueDate,
    } = req.body;

    // Get the latest fee for the student
    const latestFee = await Fees.findOne({ admissionNumber }).sort({
      createdAt: -1,
    });

    // Calculate the total fee owed
    const feeTypeDocs = await FeeType.find({ _id: { $in: fees } }).select(
      'name amount'
    );
    const termFees = feeTypeDocs.reduce(
      (acc, feeType) => acc + feeType.amount,
      0
    );

    // Calculate the total fee payable
    let totalFeePayable = termFees;

    if (latestFee && latestFee.balance) {
      // If there is a balance, add it to the total fee payable
      totalFeePayable -= latestFee.balance;
    }

    let arrears = 0;
    // if there is an arrears to pay, add it to the total fee payable
    if (latestFee && latestFee.totalFeePayable) {
      arrears = latestFee.totalFeePayable;
      totalFeePayable += latestFee.totalFeePayable;
    }

    const fee = new Fees({
      title,
      admissionNumber,
      classSchoolId,
      sectionId,
      arrears,
      fees,
      termFees,
      totalFeePayable,
      termId,
      dueDate,
    });

    await fee.save();

    res.status(201).json({ success: true, data: fee });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
};

const getFees = async (req, res) => {
  try {
    const fees = await Fees.find({});

    res.status(200).json(fees);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Server Error' });
  }
};

const getFeesById = async (req, res) => {
  try {
    const { id } = req.params; // fees id
    const fees = await Fees.findById(id);
    res.json(fees);
  } catch (err) {
    res.status(404).json({ message: 'Fees not found' });
  }
};

const getDetailedFees = async (req, res) => {
  try {
    const { id } = req.params; // termId
    const detailedFees = await Fees.aggregate([
      { $match: { termId: ObjectId(id) } },
      {
        $lookup: {
          from: 'studentrecords',
          localField: 'admissionNumber',
          foreignField: 'admissionNumber',
          as: 'student',
        },
      },
      {
        $project: {
          title: 1,
          admissionNumber: 1,
          sectionId: 1,
          classSchoolId: 1,
          fees: 1,
          termFees: 1,
          totalFeePayable: 1,
          arrears: 1,
          isPaid: 1,
          partiallyPaid: 1,
          termId: 1,
          amountPaid: 1,
          balance: 1,
          dueDate: 1,
          createdAt: 1,
          updatedAt: 1,
          'student.fullName': 1,
          'student.gender': 1,
          'student.dateOfBirth': 1,
          'student.email': 1,
          'student.address': 1,
          'student.phone': 1,
          'student.guardianName': 1,
          'student.guardianEmail': 1,
          'student.guardianPhoneNumber': 1,
        },
      },
      {
        $unwind: '$student',
      },
    ]);
    res.status(200).json(detailedFees);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// get detailed fees with termId and sectionId
const getDetailedFeesWithSectionId = async (req, res) => {
  try {
    const { id } = req.params; // termId
    const { sectionId } = req.body;
    const detailedFees = await Fees.aggregate([
      { $match: { termId: ObjectId(id), sectionId: ObjectId(sectionId) } },
      {
        $lookup: {
          from: 'studentrecords',
          localField: 'admissionNumber',
          foreignField: 'admissionNumber',
          as: 'student',
        },
      },
      {
        $project: {
          title: 1,
          admissionNumber: 1,
          sectionId: 1,
          classSchoolId: 1,
          fees: 1,
          termFees: 1,
          totalFeePayable: 1,
          arrears: 1,
          isPaid: 1,
          partiallyPaid: 1,
          termId: 1,
          amountPaid: 1,
          balance: 1,
          dueDate: 1,
          createdAt: 1,
          updatedAt: 1,
          'student.fullName': 1,
          'student.gender': 1,
          'student.dateOfBirth': 1,
          'student.email': 1,
          'student.address': 1,
          'student.phone': 1,
          'student.guardianName': 1,
          'student.guardianEmail': 1,
          'student.guardianPhoneNumber': 1,
        },
      },
    ]);
    res.status(200).json(detailedFees);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

//get latest fees for each student
const getLatestFee = async (req, res) => {
  try {
    const latestFees = await Fees.aggregate([
      { $sort: { createdAt: -1 } }, // sort by createdAt in descending order
      {
        $group: {
          _id: '$admissionNumber',
          latestFee: { $first: '$$ROOT' }, // select the first document for each admissionNumber
        },
      },
      { $replaceRoot: { newRoot: '$latestFee' } }, // replace the root with the latestFee documents
    ]);
    const admissionNumbers = latestFees.map((fee) => fee.admissionNumber);

    const students = await StudentRecord.find({
      admissionNumber: { $in: admissionNumbers },
    });

    const latestFeesWithStudents = latestFees.map((fee) => {
      const student = students.find(
        (s) => s.admissionNumber === fee.admissionNumber
      );
      return { ...fee, student };
    });
    return res.json(latestFeesWithStudents);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// GET /detailed-fees/:searchBy/:searchValue

// GET /detailed-fees/:searchBy/:searchValue
const getDetailedFeesBySearch = async (req, res) => {
  const sectionId = req.params.sectionId;
  try {
    const latestFees = await Fees.aggregate([
      { $match: { sectionId: ObjectId(sectionId) } },
      { $sort: { createdAt: -1 } }, // sort by createdAt in descending order
      {
        $group: {
          _id: '$admissionNumber',
          latestFee: { $first: '$$ROOT' }, // select the first document for each admissionNumber
        },
      },
      { $replaceRoot: { newRoot: '$latestFee' } }, // replace the root with the latestFee documents
    ]);
    const admissionNumbers = latestFees.map((fee) => fee.admissionNumber);

    const students = await StudentRecord.find({
      admissionNumber: { $in: admissionNumbers },
    });

    const latestFeesWithStudents = latestFees.map((fee) => {
      const student = students.find(
        (s) => s.admissionNumber === fee.admissionNumber
      );
      return { ...fee, student };
    });
    return res.json(latestFeesWithStudents);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const updateFees = async (req, res) => {
  const {
    title,
    admissionNumber,
    classSchoolId,
    sectionId,
    termId,
    fees,
    dueDate,
  } = req.body;
  try {
    const { id } = req.params; // fees id
    const newFees = await Fees.findByIdAndUpdate(
      id,
      {
        title,
        admissionNumber,
        classSchoolId,
        sectionId,
        termId,
        fees,
        dueDate,
      },
      { new: true }
    );
    res.status(201).json(newFees);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteFees = async (req, res) => {
  try {
    const { id } = req.params; // fees id
    const deletedFees = await Fees.findByIdAndDelete(id);
    res.status(200).json({ message: 'Fee deleted successfully', deletedFees });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const payFees = async (req, res) => {
  const { admissionNumber, amount } = req.body;
  try {
    const fee = await Fees.findOne({ admissionNumber: admissionNumber })
      .sort({ createdAt: -1 }) // sort by createdAt in descending order
      .exec();

    if (!fee) {
      throw new Error(`No fee found for admission number ${admissionNumber}`);
    }

    const totalFeePayable = fee.totalFeePayable;
    // const amountPaid = fee.amountPaid.reduce(
    //   (acc, curr) => acc + curr.amount,
    //   0
    // );

    // If the payment amount is more than or equal to the total fee payable
    if (amount >= totalFeePayable) {
      fee.isPaid = true;
      fee.partiallyPaid = false;
      fee.totalFeePayable = 0;
      fee.arrears = 0;
      fee.totalFeePayable = 0;
    }
    if (amount > totalFeePayable) {
      fee.balance = amount - totalFeePayable;
    } else {
      fee.balance = 0;
    }

    if (amount < totalFeePayable) {
      fee.arrears = totalFeePayable - amount;
      fee.totalFeePayable -= amount;
      fee.partiallyPaid = true;
      fee.isPaid = false;
    }
    const newPaymentId = await Payment.create({
      admissionNumber,
      amount,
      date: Date.now(),
    });
    fee.paymentHistory.push(newPaymentId);
    fee.lastPayment = newPaymentId?._id;
    await fee.save();
    res
      .status(200)
      .json(
        `Fee payment of ${amount} for admission number ${admissionNumber} processed successfully`
      );
  } catch (error) {
    console.log(error);
    console.error(error.message);
  }
};

const printPaymentHistory = async (req, res) => {
  try {
    const { admissionNumber, termId } = req.params; // admissionNumber;

    console.log(termId);
    console.log(admissionNumber);
    const paymentHistory = await Fees.aggregate([
      {
        $match: { admissionNumber: admissionNumber, termId: ObjectId(termId) },
      },

      // Lookup the student details by admission number
      {
        $lookup: {
          from: 'studentrecords',
          localField: 'admissionNumber',
          foreignField: 'admissionNumber',
          as: 'student',
        },
      },

      // Lookup the section details
      {
        $lookup: {
          from: 'classsections',
          localField: 'sectionId',
          foreignField: '_id',
          as: 'section',
        },
      },

      // Lookup the class details
      {
        $lookup: {
          from: 'classschools',
          localField: 'classSchoolId',
          foreignField: '_id',
          as: 'classSchool',
        },
      },
      // look up term
      {
        $lookup: {
          from: 'terms',
          localField: 'termId',
          foreignField: '_id',
          as: 'term',
        },
      },

      // look up school
      {
        $lookup: {
          from: 'schools',
          localField: 'classSchool.schoolId',
          foreignField: '_id',
          as: 'school',
        },
      },

      // look up school
      {
        $lookup: {
          from: 'classes',
          localField: 'classSchool.classId',
          foreignField: '_id',
          as: 'class',
        },
      },

      // Lookup the fee details
      {
        $lookup: {
          from: 'feetypes',
          localField: 'fees',
          foreignField: '_id',
          as: 'fees',
        },
      },

      // Lookup the last payment
      {
        $lookup: {
          from: 'payments',
          localField: 'lastPayment',
          foreignField: '_id',
          as: 'lastPayment',
        },
      },

      // Lookup the payment history
      {
        $lookup: {
          from: 'payments',
          localField: 'paymentHistory',
          foreignField: '_id',
          as: 'paymentHistory',
        },
      },
      { $unwind: '$term' },
      { $unwind: '$school' },
      { $unwind: '$class' },

      // Project only the required fields
      {
        $project: {
          student: { $arrayElemAt: ['$student', 0] },
          section: { $arrayElemAt: ['$section', 0] },
          classSchool: { $arrayElemAt: ['$classSchool', 0] },
          fees: 1,
          term: 1,
          class: 1,
          school: 1,
          balance: 1,
          arrears: 1,
          lastPayment: { $arrayElemAt: ['$lastPayment', 0] },
          paymentHistory: 1,
        },
      },
    ]);
    res.json(paymentHistory);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = {
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
  printPaymentHistory,
};
