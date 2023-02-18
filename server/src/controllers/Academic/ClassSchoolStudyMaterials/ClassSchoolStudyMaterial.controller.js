const ClassSchoolStudyMaterial = require('../../../models/Academic/ClassSchoolStudyMaterials/ClassSchoolStudyMaterials.mongo');
const StudyMaterial = require('../../../models/Academic/StudyMaterials/StudyMaterials.mongo');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

//create classSchoolStudyMaterial
const createClassSchoolStudyMaterial = async (req, res) => {
  try {
    let attachment = '';
    if (req.file) {
      attachment = req.file.path;
    }
    const { label, url, schoolId, description } = req.body;
    const { classSchoolId, subjectId, sectionId, addedBy, termId } = req.body;
    const newStudyMaterial = await StudyMaterial.create({
      label,
      url,
      schoolId,
      description,
      attachment,
    });
    const studyMaterialId = ObjectId(newStudyMaterial._id);
    const classSchoolStudyMaterial = await ClassSchoolStudyMaterial.create({
      classSchoolId,
      studyMaterialId,
      subjectId,
      sectionId,
      addedBy,
      termId,
    });
    const classSchoolStudyMaterialId = ObjectId(classSchoolStudyMaterial._id);
    await StudyMaterial.findByIdAndUpdate(studyMaterialId, {
      classSchoolStudyMaterialId: classSchoolStudyMaterialId,
    });
    return res.json(classSchoolStudyMaterial);
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

//update classSchoolStudyMaterial
const updateClassSchoolStudyMaterial = async (req, res) => {
  try {
    const { id } = req.params; // classSchoolStudyMaterial id;
    const { label, url, schoolId, description } = req.body;
    return res.json(
      await StudyMaterial.updateOne(
        { classSchoolStudyMaterialId: id },
        { label, url, schoolId, description }
      )
    );
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// find material with id
// const findClassSchoolStudyMaterialById = async (id) => {
//   return await ClassSchoolStudyMaterial.findById(id);
// };

// delete classSchoolStudyMaterial
const deleteClassSchoolStudyMaterial = async (req, res) => {
  try {
    const { id } = req.params; // class school study material id
    await StudyMaterial.deleteOne({ classSchoolStudyMaterialId: id });
    const deletedClassSchoolStudyMaterial =
      await ClassSchoolStudyMaterial.findByIdAndDelete(id);
    return res.json(deletedClassSchoolStudyMaterial);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err.message);
  }
};

const getAllStudyMaterialsByTermId = async (req, res) => {
  try {
    const { id } = req.params; // termId;
    const studyMaterial = await ClassSchoolStudyMaterial.aggregate([
      {
        $match: {
          termId: ObjectId(id),
        },
      },
      {
        $lookup: {
          from: 'classschools',
          localField: 'classSchoolId',
          foreignField: '_id',
          as: 'classSchool',
        },
      },
      {
        $unwind: '$classSchool',
      },
      {
        $lookup: {
          from: 'classes',
          localField: 'classSchool.classId',
          foreignField: '_id',
          as: 'class',
        },
      },
      {
        $unwind: '$class',
      },
      {
        $lookup: {
          from: 'studymaterials',
          localField: 'studyMaterialId',
          foreignField: '_id',
          as: 'material',
        },
      },
      {
        $unwind: '$material',
      },
      {
        $lookup: {
          from: 'staffs',
          localField: 'addedBy',
          foreignField: '_id',
          as: 'user',
        },
      },
      {
        $unwind: '$user',
      },
      {
        $lookup: {
          from: 'classsections',
          localField: 'sectionId',
          foreignField: '_id',
          as: 'section',
        },
      },
      {
        $unwind: '$user',
      },
      {
        $lookup: {
          from: 'subjects',
          localField: 'subjectId',
          foreignField: '_id',
          as: 'subject',
        },
      },
      {
        $unwind: '$subject',
      },
      {
        $unwind: '$section',
      },
      {
        $project: {
          title: '$material.label',
          class: '$class.label',
          description: '$material.description',
          createdAt: 1,
          section: '$section.label',
          addedBy: '$user.fullName',
          subject: '$subject.label',
        },
      },
    ]);
    return res.json(studyMaterial);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createClassSchoolStudyMaterial,
  getAllClassSchoolStudyMaterial,
  deleteClassSchoolStudyMaterial,
  getAllStudyMaterialsByTermId,
  updateClassSchoolStudyMaterial,
};
