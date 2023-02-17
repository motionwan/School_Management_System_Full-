const { format } = require('date-fns');
const mongoose = require('mongoose');
const toId = mongoose.Types.ObjectId;
const Schema = mongoose.Schema;

const classSchoolStudyMaterialsSchema = new Schema({
  classSchoolId: { type: toId, ref: 'ClassSchool' },
  learningMaterialId: { type: toId, ref: 'StudyMaterial' },
  subjectId: { type: toId, ref: 'Subject' },
  sectionId: { type: toId, ref: 'ClassSection' },
  addedBy: { type: toId, ref: 'User' },
  createdAt: {
    type: String,
    default: format(Date.now(), 'do-MMM-yyyy'),
  },
  updatedAt: {
    type: String,
    default: null,
  },
});

module.exports = mongoose.model(
  'ClassSchoolStudyMaterial',
  classSchoolStudyMaterialsSchema
);
