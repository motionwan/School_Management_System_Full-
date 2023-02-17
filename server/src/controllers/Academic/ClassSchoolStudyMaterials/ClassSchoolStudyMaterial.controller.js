const ClassSchoolStudyMaterial = require('../../../models/Academic/ClassSchoolStudyMaterials/ClassSchoolStudyMaterials.mongo');
const StudyMaterial = require('../../../models/Academic/StudyMaterials/StudyMaterials.mongo');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

//create classSchoolStudyMaterial
const createClassSchoolStudyMaterial = async (req, res) => {
  try {
    if (req.file) {
      const studyMaterial = {
        label: req.body.label,
        url: req.body.url,
        schoolId: req.body.schoolId,
        description: req.body.description,
        addedBy: req.body.addedBy,
        attachment: req.file.path,
        createdAt: req.body.createdAt,
        updatedAt: req.body.updatedAt,
      };
      const { classSchoolId, subjectId, sectionId, addedBy } = req.body;
      const newStudyMaterial = await StudyMaterial.create(studyMaterial);
      const learningMaterialId = ObjectId(newStudyMaterial._id);
      const classSchoolStudyMaterial = await ClassSchoolStudyMaterial.create({
        classSchoolId,
        learningMaterialId,
        subjectId,
        sectionId,
        addedBy,
      });
      const classSchoolLearningMaterialId = ObjectId(
        classSchoolStudyMaterial._id
      );
      await StudyMaterial.findByIdAndUpdate(learningMaterialId, {
        classSchoolLearningMaterialId: classSchoolLearningMaterialId,
      });
      return res.json(classSchoolStudyMaterial);
    } else {
      const studyMaterial = {
        label: req.body.label,
        url: req.body.url,
        addedBy: req.body.addedBy,
        schoolId: req.body.schoolId,
        description: req.body.description,
        createdAt: req.body.createdAt,
        updatedAt: req.body.updatedAt,
      };
      const { classSchoolId, subjectId, sectionId, addedBy } = req.body;
      const newStudyMaterial = await StudyMaterial.create(studyMaterial);
      const learningMaterialId = ObjectId(newStudyMaterial._id);
      const classSchoolStudyMaterial = await ClassSchoolStudyMaterial.create({
        classSchoolId,
        learningMaterialId,
        subjectId,
        sectionId,
        addedBy,
      });
      const classSchoolLearningMaterialId = ObjectId(
        classSchoolStudyMaterial._id
      );
      await StudyMaterial.findByIdAndUpdate(learningMaterialId, {
        classSchoolLearningMaterialId: classSchoolLearningMaterialId,
      });
      return res.json(classSchoolStudyMaterial);
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
};

// read classSchoolStudyMaterial
const getAllClassSchoolStudyMaterial = async (req, res) => {
  try {
    return res.json(
      await ClassSchoolStudyMaterial.find({}).populate({
        path: 'classSchoolId',
        populate: {
          path: 'classId',
        },
      })
    );
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
};

// update classSchoolStudyMaterial
// const updateClassSchoolStudyMaterial = async (id, data) => {
//   return await ClassSchoolStudyMaterial.findByIdAndUpdate(id, data);
// };

// find material with id
// const findClassSchoolStudyMaterialById = async (id) => {
//   return await ClassSchoolStudyMaterial.findById(id);
// };

// delete classSchoolStudyMaterial
const deleteClassSchoolStudyMaterial = async (req, res) => {
  try {
    const { id } = req.params; // class school study material id
    await StudyMaterial.deleteOne({ classSchoolLearningMaterialId: id });
    const deletedClassSchoolStudyMaterial =
      await ClassSchoolStudyMaterial.findByIdAndDelete(id);
    return res.json(deletedClassSchoolStudyMaterial);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err.message);
  }
};

module.exports = {
  createClassSchoolStudyMaterial,
  getAllClassSchoolStudyMaterial,
  deleteClassSchoolStudyMaterial,
};
