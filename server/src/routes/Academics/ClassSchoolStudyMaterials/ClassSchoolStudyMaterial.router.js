const express = require('express');
const router = express.Router();
const upload = require('../../../middleware/myUpload.multer');
const {
  createClassSchoolStudyMaterial,
  getAllClassSchoolStudyMaterial,
  deleteClassSchoolStudyMaterial,
  getAllStudyMaterialsByTermId,
  updateClassSchoolStudyMaterial,
} = require('../../../controllers/Academic/ClassSchoolStudyMaterials/ClassSchoolStudyMaterial.controller');

router.post('/', upload.single('attachment'), createClassSchoolStudyMaterial);
router.get('/', getAllClassSchoolStudyMaterial);
router.delete('/:id', deleteClassSchoolStudyMaterial);
router.get('/:id', getAllStudyMaterialsByTermId);
router.put('/:id', updateClassSchoolStudyMaterial);

module.exports = router;
