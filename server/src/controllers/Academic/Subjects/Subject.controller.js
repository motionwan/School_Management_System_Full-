const Subject = require('../../../models/Academic/Subjects/Subject.mongo');

// create subjects
const httpCreateSubjects = async (req, res) => {
  try {
    const { label, code, type, classSchoolId, sectionId } = req.body;
    return res.json(
      await Subject.create({ label, code, type, classSchoolId, sectionId })
    );
  } catch (err) {
    if (err.code === 11000) {
      return res
        .status(409)
        .json({ error: 'A Subject with this label already exists' });
    } else {
      console.log(err);
      res.status(500).json({ error: err.message });
    }
  }
};

// find all subjects;
const httpFindAllSubjects = async (req, res) => {
  try {
    return res.json(
      await Subject.find({}).populate({
        path: 'classSchoolId',
        populate: { path: 'classId' },
      })
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

// update Subject
const httpUpdateSubject = async (req, res) => {
  try {
    const { id } = req.params; // subject id
    const { label, code, type, classSchoolId, teacherId } = req.body;
    return res.json(
      await Subject.findByIdAndUpdate(id, {
        label,
        code,
        type,
        classSchoolId,
        teacherId,
      })
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

// delete Subject
const httpDeleteSubject = async (req, res) => {
  try {
    const { id } = req.params; // subject id
    return res.json(await Subject.findByIdAndDelete(id));
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

//find section subject
const findSectionSubject = async (req, res) => {
  try {
    const { id } = req.params; // section id
    return res.json(await Subject.find({ sectionId: id }));
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// assign class in school to subject
// const httpAssignClassSchool = async (req, res) => {
//   try {
//     const subjectId = req.params.id;
//     const { classSchoolId } = req.body;
//     return res.json(await assignClassSchool(subjectId, classSchool));
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ error: err.message });
//   }
// };

const httpFindClassSubjects = async (req, res) => {
  try {
    const id = req.params.id;
    //const subject = req.body;
    return res.json(await Subject.find({ classSchoolId: id }));
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

// const httpSchoolSubject = async (req, res) => {
//   const id = req.params.id;
//   return res.json(await schoolSubject(id));
// };

module.exports = {
  httpCreateSubjects,
  httpFindAllSubjects,
  httpUpdateSubject,
  httpDeleteSubject,
  httpFindClassSubjects,
  findSectionSubject,
  //   httpAssignClassSchool,
  //   httpAssignSubjectToClass,
  //   httpSchoolSubject,
};
