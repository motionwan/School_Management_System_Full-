const StudentRecord = require('../../../models/Student/StudentRecord/StudentRecord.mongo');
const Token = require('../../../models/Token/Token.mongo');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtRefreshToken = process.env.REFRESH_TOKEN;
const jwtAccessToken = process.env.ACCESS_TOKEN;
const sendEmail = require('../../../utils/email');
const Settings = require('../../../models/School/Settings/settings.mongo');
const Section = require('../../../models/Academic/ClassSection/ClassSection.mongo');
const ClassSchool = require('../../../models/Academic/ClassSchool/ClassSchool.mongo');
const Schools = require('../../../models/SchoolManagment/Schools/schools.mongo');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const Hostel = require('../../../models/Hostel/Hostel.mongo');

// Function to get an array of all hostel ids
const getAllHostelIds = async () => {
  try {
    const hostels = await Hostel.find().lean();
    return hostels.map((hostel) => hostel._id.toString());
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
};

// Function to assign a hostel to a student
const assignHostelToStudent = async (student) => {
  try {
    const allHostelIds = await getAllHostelIds();
    const index = (await StudentRecord.countDocuments()) % allHostelIds.length;
    student.assignedHostel = allHostelIds[index];
    await student.save();
    console.log('Student assigned to hostel');
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
};

// Function to register or admit student to a school
const admitStudent = async (req, res) => {
  try {
    let photoId = '';
    if (req.file) {
      photoId = req.file.path;
    }
    const {
      admissionNumber,
      fullName,
      gender,
      dateOfBirth,
      phoneNumber,
      email,
      address,
      admissionDate,
      bloodGroup,
      guardianName,
      guardianPhoneNumber,
      classSchoolId,
      guardianOccupation,
      status,
      sectionId,
      termId,
      username,
      city,
      healthInsurance,
      hometown,
      religion,
      allergies,
      fatherOccupation,
      fatherPhoneNumber,
      fatherName,
      motherOccupation,
      motherPhoneNumber,
      motherName,
    } = req.body;

    const newStudent = await StudentRecord.create({
      admissionNumber,
      fullName,
      gender,
      dateOfBirth,
      phoneNumber,
      email,
      address,
      admissionDate,
      bloodGroup,
      status,
      photoId,
      sectionId,
      termId,
      username,
      guardianName,
      classSchoolId,
      guardianPhoneNumber,
      guardianOccupation,
      city,
      healthInsurance,
      hometown,
      religion,
      allergies,
      fatherName,
      motherName,
      fatherPhoneNumber,
      motherPhoneNumber,
      fatherOccupation,
      motherOccupation,
    });

    await assignHostelToStudent(newStudent);

    if (newStudent) {
      const token = await Token.create({
        userId: newStudent._id,
        token: crypto.randomBytes(32).toString('hex'),
      });
      const url = `${process.env.CLIENT_URL}/users/${newStudent._id}/verify/${token.token}`;
      await sendEmail(newStudent.email, 'Verify Email', url);
      //console.log(token);
      res.status(201).json({ message: 'Email sent to account please verify' });
      const sectionId = await Section.findById(newStudent.sectionId);
      const classSchoolId = await ClassSchool.findById(sectionId.classSchoolId);
      const school = await Schools.findById(classSchoolId.schoolId);
      if (school) {
        school.lastEnrollmentCount += 1;
        await school.save();
        const admissionNumber = `${
          school.enrollmentPrefix
        }${school.lastEnrollmentCount
          .toString()
          .padStart(school.enrollmentPadding, '0')}`;

        newStudent.admissionNumber = admissionNumber;
        await newStudent.save();
      }
    }
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ error: 'Student Already exists' });
    } else {
      console.log(err);
      return res.status(500).json({ error: err.message });
    }
  }
};

// activate account
const activateAccount = async (req, res) => {
  const { id, token } = req.params;
  try {
    const student = await StudentRecord.findById(id);
    if (!student) {
      return res.status(400).json({ error: 'Invalid Link' });
    }
    const oldToken = await Token.findOne({
      userId: id,
      token: token,
    });
    if (!oldToken) {
      return res.status(400).json({ error: 'Link has expired' });
    }
    await StudentRecord.updateOne({ _id: student._id, verified: true });
    await Token.deleteOne({ userId: student._id });
    return res.json({ message: 'email verified Successfully' });
  } catch (err) {
    res.status(400).json(err.message);
  }
};

const signInStudent = async (req, res) => {
  try {
    const login = req.body.login;
    const password = req.body.password;
    const currentTermId = await Settings.find({}).populate('currentTermId');
    const student = await StudentRecord.findOne({
      $or: [{ username: login }, { email: login }],
    }).populate('schoolId');

    if (!student) {
      return res
        .status(401)
        .json({ message: 'Invalid username, email or password' });
    }
    if (student && !student.verified) {
      const token = await Token.updateOne(
        { _id: student._id },
        {
          userId: student._id,
          token: crypto.randomBytes(32).toString('hex'),
        },
        { upsert: true }
      );
      const url = `${process.env.CLIENT_URL}/users/${student._id}/verify/${token.token}`;

      await sendEmail(student.email, 'Verify Email', url);
      return res.status(401).json({
        message: 'Account not verified. Check email and verify account',
      });
    } else if (!(await bcrypt.compare(password, student.password))) {
      return res
        .status(401)
        .json({ message: 'Invalid username, email or password' });
    } else {
      const accessToken = jwt.sign(
        {
          username: student.username,
        },
        jwtAccessToken,
        { expiresIn: '10m' }
      );
      const refreshToken = jwt.sign(
        { username: student.username },
        jwtRefreshToken,
        { expiresIn: '1d' }
      );

      student.refreshToken = refreshToken;

      await student.save();
      // send data via cookie
      res.cookie('jwt', refreshToken, {
        httpOnly: true,
        sameSite: 'lax',
        secure: false,
        maxAge: 24 * 60 * 60 * 1000,
      });
      //console.log(student.role);
      // send data via json
      return res.status(200).json({
        accessToken: accessToken,
        username: student.username,
        image: student?.image,
        email: student.email,
        role: student?.role,
        userId: student?._id,
        sectionId: student?.sectionId,
        //schoolId: student?.schoolId,
        // we want the current term id
        currentTermId: currentTermId[0]?.currentTermId,
      });
    }
  } catch (err) {
    if (err.code === 11000) {
      return res.status(401).json({
        message:
          'Account not verified please check your email to verify account',
      });
    }
    console.log(err);
    return res.json({ error: err.message });
  }
};

// logout student
const logoutStudent = async (req, res) => {
  // on client side delete access token
  const cookies = req.cookies;
  if (!cookies) return res.sendStatus(204); // no content
  const refreshToken = cookies.jwt;

  // is refresh token in the db
  const foundStudent = await StudentRecord.findOne({ refreshToken });
  if (!foundStudent) {
    res.clearCookie('jwt', {
      httpOnly: true,
      sameSite: 'None',
      secure: true,
    });
    return res.sendStatus(204);
  }
  //delete refresh token from the db
  foundStudent.refreshToken = '';
  const result = await foundStudent.save();
  //console.log(result);
  return;
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (email) {
      const student = await StudentRecord.findOne({ email });
      if (student) {
        const token = await Token.create({
          userId: student._id,
          token: crypto.randomBytes(32).toString('hex'),
        });
        const url = `${process.env.CLIENT_URL}/users/${student._id}/verify/${token.token}`;

        await sendEmail(email, 'Reset Email with the following link', url);
        await StudentRecord.updateOne({ resetPasswordToken: token.token });
        return res
          .status(201)
          .json({ message: 'Password reset link has been sent to email' });
        //res.json({ token: token.token });
      }
      return res
        .status(404)
        .json({ error: 'Student not found make sure your email is correct' });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { password } = req.body;
    const { token } = req.params;
    const student = await StudentRecord.findOne({ resetPasswordToken: token });
    if (student) {
      await student.updateOne({
        password: await bcrypt.hash(password, 12),
        resetPasswordToken: null,
      });
      await Token.deleteOne({ token: token });
      res.json({ message: 'Password reset successful' });
    } else {
      console.log('user not found');
      res.status(400).json({
        error: 'Password reset link expired. Please reset password again',
      });
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const deActivateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const deActivatedStudent = await StudentRecord.findByIdAndUpdate(id, {
      status: false,
    });
    return res.json(deActivatedStudent);
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

const getAllStudents = async (req, res) => {
  try {
    const { id } = req.params; // term id
    return res.json(
      await StudentRecord.find({ termId: id }).populate({
        path: 'sectionId',
        populate: { path: 'classSchoolId', populate: { path: 'classId' } },
      })
    );
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const updateStudent = async (req, res) => {
  try {
    const { id } = req.params; // student id
    const {
      admissionNumber,
      fullName,
      gender,
      dateOfBirth,
      phoneNumber,
      email,
      address,
      admissionDate,
      bloodGroup,
      status,
      photoId,
      sectionId,
      sessionId,
      userId,
      guardianName,
      guardianPhoneNumber,
      guardianOccupation,
      city,
      healthInsurance,
      hometown,
      religion,
      allergies,
      // fatherName,
      // motherName,
      // fatherPhoneNumber,
      // motherPhoneNumber,
      // fatherOccupation,
      // motherOccupation,
    } = req.body;
    return res.json(
      await StudentRecord.findByIdAndUpdate(id, {
        admissionNumber,
        rollNumber,
        fullName,
        gender,
        dateOfBirth,
        phoneNumber,
        email,
        address,
        admissionDate,
        bloodGroup,
        status,
        photoId,
        sectionId,
        sessionId,
        userId,
        guardianName,
        guardianPhoneNumber,
        guardianOccupation,
        city,
        healthInsurance,
        hometown,
        religion,
        allergies,
        // fatherName,
        // motherName,
        // fatherPhoneNumber,
        // motherPhoneNumber,
        // fatherOccupation,
        // motherOccupation,
      })
    );
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

const bulkAdmitStudents = async (req, res) => {
  try {
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;
    return res.json(await StudentRecord.findByIdAndDelete(id));
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

const searchStudents = async (req, res) => {
  try {
    const { searchBy, searchValue } = req.body;
    const query = {};
    query[searchBy] = searchValue;
    return res.json(
      await StudentRecord.find(query).populate({
        path: 'sectionId',
        populate: { path: 'classSchoolId', populate: { path: 'classId' } },
      })
    );
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const getStudentBySectionAndTermId = async (req, res) => {
  try {
    const { id } = req.params; // termId ;
    const { sectionId } = req.body;
    const students = await StudentRecord.find({
      sectionId: sectionId,
      termId: id,
    }).populate({
      path: 'sectionId',
      populate: { path: 'classSchoolId', populate: { path: 'classId' } },
    });
    return res.json(students);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const getStudentByClassSchoolIdAndTermId = async (req, res) => {
  try {
    const { id } = req.params; // termId ;
    const { classSchoolId } = req.body;
    const students = await StudentRecord.find({
      termId: id,
      classSchoolId: classSchoolId,
    }).populate({
      path: 'sectionId',
      populate: { path: 'classSchoolId', populate: { path: 'classId' } },
    });
    return res.json(students);
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

// try {
// } catch (err) {
//   return res.status(500).json({ error: err });
// }

module.exports = {
  admitStudent,
  deActivateStudent,
  updateStudent,
  getAllStudents,
  deleteStudent,
  activateAccount,
  signInStudent,
  resetPassword,
  forgotPassword,
  logoutStudent,
  searchStudents,
  getStudentBySectionAndTermId,
  getStudentByClassSchoolIdAndTermId,
};
