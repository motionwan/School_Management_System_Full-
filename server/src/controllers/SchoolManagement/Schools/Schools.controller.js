const Schools = require('../../../models/SchoolManagment/Schools/schools.mongo');

const getAllSchool = async (req, res) => {
  try {
    res.json(await Schools.find({}));
  } catch (err) {
    return res.status(500).json(err.message);
  }
};

const createNewSchool = async (req, res) => {
  let schoolCrest = '';
  if (req.file) {
    schoolCrest = req.file.path;
  }
  try {
    const {
      label,
      phone,
      address,
      email,
      status,
      admins,
      enrollmentPrefix,
      description,
      enrollmentPadding,
      enrollmentBaseNumber,
      lastEnrollmentCount,
      lastInvoiceCount,
      hubtelClientSecret,
      hubtelClientId,
      currency,
    } = req.body;
    const createdSchool = await Schools.create({
      label,
      phone,
      address,
      email,
      status,
      admins,
      description,
      enrollmentPadding,
      enrollmentBaseNumber,
      enrollmentPrefix,
      lastEnrollmentCount,
      lastInvoiceCount,
      hubtelClientSecret,
      hubtelClientId,
      schoolCrest,
      currency,
    });
    return res.status(200).json(createdSchool);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(401).json({ error: 'School Already Exist' });
    } else return res.status(500).json(err);
  }
};

const deleteSchool = async (req, res) => {
  try {
    const { id } = req.params;
    return res.json(await Schools.findByIdAndDelete(id));
  } catch (err) {
    return res.status(500).json(err.message);
  }
  //}
};

const updateSchool = async (req, res) => {
  let schoolCrest = '';
  if (req.file) {
    schoolCrest = req.file.path;
  }
  try {
    const { id } = req.params; // school id;
    const {
      label,
      phone,
      address,
      email,
      status,
      hubtelClientSecret,
      hubtelClientId,
      currency,
    } = req.body;
    return res.json(
      await Schools.findByIdAndUpdate(id, {
        label,
        phone,
        address,
        email,
        status,
        hubtelClientSecret,
        hubtelClientId,
        schoolCrest,
        currency,
      })
    );
  } catch (err) {
    return res.status(500).json(err.message);
  }
};

module.exports = {
  getAllSchool,
  createNewSchool,
  deleteSchool,
  updateSchool,
  //   schoolExists,
  //   findSchoolById,
  //   defaultSchool,
};
