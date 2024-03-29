const Staff = require('../../../models/Staff/Staff/Staff.mongo');
const Token = require('../../../models/Token/Token.mongo');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtRefreshToken = process.env.REFRESH_TOKEN;
const jwtAccessToken = process.env.ACCESS_TOKEN;
const sendEmail = require('../../../utils/email');
const Settings = require('../../../models/School/Settings/settings.mongo');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const adminCreateStaff = async (req, res) => {
  try {
    let sectionId = null;
    if (req.body.sectionId) {
      sectionId = req.body.sectionId;
    }
    const { email, role, schoolId } = req.body;
    const newStaff = await Staff.create({
      email,
      role: [...role],
      sectionId,
      schoolId,
    });
    if (newStaff) {
      const token = await Token.create({
        staffId: newStaff._id,
        token: crypto.randomBytes(32).toString('hex'),
      });
      const url = `${process.env.CLIENT_URL}/staff/signup/${token.token}/${newStaff._id}`;
      await sendEmail(newStaff.email, 'Sign Up with this link', url);
      //console.log(token);
      return res
        .status(201)
        .json({ message: `Email sent to ${newStaff.email} for sign up` });
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const signUpStaff = async (req, res) => {
  try {
    const { token, id } = req.params;
    let photoId = '';
    if (req.file) {
      photoId = req.file.path;
    }
    const {
      fullName,
      gender,
      dateOfBirth,
      phoneNumber,
      address,
      bloodGroup,
      city,
      healthInsurance,
      hometown,
      religion,
      username,
      repeatPassword,
      emergencyContactName,
      emergencyContactNumber,
      emergencyContactAddress,
    } = req.body;

    const password = await bcrypt.hash(req.body.password, 12);

    const staff = await Staff.findById(id);

    if (!staff) {
      return res.status(400).json({ error: 'Invalid Link' });
    }
    const oldToken = await Token.findOne({
      staffId: id,
      token: token,
    });
    if (!oldToken) {
      return res.status(400).json({ error: 'Link has expired' });
    }
    const update = await Staff.findByIdAndUpdate(staff._id, {
      verified: true,
      fullName,
      gender,
      dateOfBirth,
      phoneNumber,
      address,
      bloodGroup,
      photoId,
      city,
      healthInsurance,
      hometown,
      religion,
      username,
      password,
      repeatPassword,
      emergencyContactName,
      emergencyContactNumber,
      emergencyContactAddress,
    });
    await Token.findByIdAndDelete(oldToken._id);
    return res.json({ message: 'Sign up successful' });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const signInStaff = async (req, res) => {
  try {
    const login = req.body.login;
    const password = req.body.password;
    const currentTermId = await Settings.find({}).populate('currentTermId');
    const staff = await Staff.findOne({
      $or: [{ username: login }, { email: login }],
    })
      .populate('role')
      .populate('schoolId');
    console.log(staff);

    if (!staff) {
      return res
        .status(401)
        .json({ message: 'Invalid username, email or password' });
    }
    if (staff && !staff.verified) {
      const token = await Token.updateOne(
        { _id: staff._id },
        {
          userId: staff._id,
          token: crypto.randomBytes(32).toString('hex'),
        },
        { upsert: true }
      );
      const url = `${process.env.CLIENT_URL}/users/${staff._id}/verify/${token.token}`;

      await sendEmail(staff.email, 'Verify Email', url);
      return res.status(401).json({
        message: 'Account not verified. Check email and verify account',
      });
    } else if (!(await bcrypt.compare(password, staff.password))) {
      return res
        .status(401)
        .json({ message: 'Invalid username, email or password' });
    } else {
      const accessToken = jwt.sign(
        {
          username: staff.username,
        },
        jwtAccessToken,
        { expiresIn: '10m' }
      );
      const refreshToken = jwt.sign(
        { username: staff.username },
        jwtRefreshToken,
        { expiresIn: '1d' }
      );

      staff.refreshToken = refreshToken;

      await staff.save();
      // send data via cookie
      res.cookie('jwt', refreshToken, {
        httpOnly: true,
        sameSite: 'lax',
        secure: false,
        maxAge: 24 * 60 * 60 * 1000,
      });
      // console.log(currentTermId);
      //console.log(staff.role);
      // send data via json
      return res.status(200).json({
        accessToken: accessToken,
        username: staff.username,
        image: staff?.image,
        email: staff.email,
        role: staff?.role,
        userId: staff?._id,
        schoolId: staff?.schoolId,
        zoomApiKey: staff?.zoomApiKey,
        zoomApiSecret: staff?.zoomApiSecret,
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

// logout staff
const logoutStaff = async (req, res) => {
  // on client side delete access token
  const cookies = req.cookies;
  if (!cookies) return res.sendStatus(204); // no content
  const refreshToken = cookies.jwt;

  // is refresh token in the db
  const foundStaff = await Staff.findOne({ refreshToken });
  if (!foundStaff) {
    res.clearCookie('jwt', {
      httpOnly: true,
      sameSite: 'None',
      secure: true,
    });
    return res.sendStatus(204);
  }
  //delete refresh token from the db
  foundStaff.refreshToken = '';
  const result = await foundStaff.save();
  //console.log(result);
  return;
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (email) {
      const staff = await Staff.findOne({ email });
      if (staff) {
        const token = await Token.create({
          userId: staff._id,
          token: crypto.randomBytes(32).toString('hex'),
        });
        const url = `${process.env.CLIENT_URL}/users/${staff._id}/verify/${token.token}`;

        await sendEmail(email, 'Reset Email with the following link', url);
        await Staff.updateOne({ resetPasswordToken: token.token });
        return res
          .status(201)
          .json({ message: 'Password reset link has been sent to email' });
        //res.json({ token: token.token });
      }
      return res
        .status(404)
        .json({ error: 'Staff not found make sure your email is correct' });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: e.message });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { password } = req.body;
    const { token } = req.params;
    const staff = await Staff.findOne({ resetPasswordToken: token });
    if (staff) {
      await staff.updateOne({
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
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

const updateStaff = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      fullName,
      gender,
      dateOfBirth,
      phoneNumber,
      address,
      bloodGroup,
      photoId,
      city,
      healthInsurance,
      // subjectId,
      sectionId,
      //classSchoolId,
      zoomApiKey,
      zoomApiSecret,
      hometown,
      religion,
      username,
      password,
      repeatPassword,
      emergencyContactName,
      emergencyContactNumber,
      emergencyContactAddress,
    } = req.body;
    return res.status(200).json(
      await Staff.findByIdAndUpdate(id, {
        fullName,
        gender,
        dateOfBirth,
        phoneNumber,
        address,
        bloodGroup,
        photoId,
        // subjectId: [...subjectId],
        //classSchoolId: [...classSchoolId],
        sectionId,
        zoomApiKey,
        zoomApiSecret,
        city,
        healthInsurance,
        hometown,
        religion,
        username,
        password,
        repeatPassword,
        emergencyContactName,
        emergencyContactNumber,
        emergencyContactAddress,
      })
    );
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
};

const getAllStaff = async (req, res) => {
  try {
    const { id } = req.params; // school id
    const staff = await Staff.aggregate([
      {
        $match: { verified: true, schoolId: ObjectId(id) },
      },
      {
        $project: {
          _id: 1,
          fullName: {
            $toUpper: '$fullName',
          },
          username: 1,
          verify: {
            $cond: {
              if: { $eq: ['$verified', true] },
              then: 'yes',
              else: 'no',
            },
          },
          active: {
            $cond: {
              if: { $eq: ['$status', true] },
              then: 'active',
              else: 'inactive',
            },
          },
          email: 1,
          role: `$role.name`,
          emergencyContactNumber: 1,
          emergencyContactName: {
            $toUpper: '$emergencyContactName',
          },
        },
      },
    ]);
    return res.json(staff);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
};

const deleteStaff = async (req, res) => {
  try {
    const { id } = req.params;
    return res.json(await Staff.findByIdAndDelete(id));
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
};

module.exports = {
  //createStaff,
  // activateAccount,
  updateStaff,
  deleteStaff,
  getAllStaff,
  resetPassword,
  forgotPassword,
  signInStaff,
  logoutStaff,
  adminCreateStaff,
  signUpStaff,
};
