const HomeworkSection = require('../../../models/Academic/HomeworkSection/HomeworkSection.mongo');
const Homework = require('../../../models/Academic/Homework/Homework.mongo');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const getAllHomeworkSection = async (req, res) => {
  try {
    return res.json(await HomeworkSection.find({}));
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const createHomeworkSection = async (req, res) => {
  try {
    let attachment = '';

    if (req.file) {
      attachment = req.file.path;
    }
    const {
      title,
      description,
      setBy,
      termId,
      subjectId,
      schoolId,
      submissionDate,
    } = req.body;
    const sectionId = req.body.sectionId;
    const newHomework = await Homework.create({
      title,
      description,
      setBy,
      termId,
      subjectId,
      schoolId,
      submissionDate,
      attachment,
    });
    const homeworkId = ObjectId(newHomework._id);

    const homeworkSection = await HomeworkSection.create({
      homeworkId,
      sectionId,
      subjectId,
      submissionDate,
      termId,
      setBy,
    });
    const homeworkSectionId = ObjectId(homeworkSection._id);
    await Homework.findByIdAndUpdate(homeworkId, {
      homeworkSectionId: homeworkSectionId,
    });
    return res.json(homeworkSection);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
};

const updateHomeworkSection = async (req, res) => {
  try {
    const id = req.params.id;
    const { sectionId, homeworkId } = req.body;
    return res.json(
      await updateHomeworkSection(id, {
        sectionId,
        homeworkId,
      })
    );
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const deleteHomeworkSection = async (req, res) => {
  try {
    const id = req.params.id;
    await Homework.deleteOne({ homeworkSectionId: id });
    return res.json(await HomeworkSection.findByIdAndDelete(id));
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const getAllHomeworkSectionByTermId = async (req, res) => {
  const { id } = req.params; // term id;
  try {
    const homeworkSection = await HomeworkSection.aggregate([
      {
        $match: {
          termId: ObjectId(id),
        },
      },
      {
        $lookup: {
          from: 'homeworks',
          localField: 'homeworkId',
          foreignField: '_id',
          as: 'homework',
        },
      },
      {
        $unwind: '$homework',
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
        $unwind: '$section',
      },

      {
        $lookup: {
          from: 'classschools',
          localField: 'section.classSchoolId',
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
        $lookup: {
          from: 'staffs',
          localField: 'setBy',
          foreignField: '_id',
          as: 'user',
        },
      },
      {
        $unwind: '$user',
      },

      {
        $project: {
          title: '$homework.title',
          class: '$class.label',
          description: '$homework.description',
          submissionDate: '$homework.submissionDate',
          createdAt: 1,
          section: '$section.label',
          addedBy: '$user.fullName',
          subject: '$subject.label',
        },
      },
    ]);
    return res.json(homeworkSection);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createHomeworkSection,
  getAllHomeworkSection,
  updateHomeworkSection,
  deleteHomeworkSection,
  getAllHomeworkSectionByTermId,
};
