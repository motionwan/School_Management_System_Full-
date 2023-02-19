const express = require('express');
const router = express.Router();
const {
  createNotice,
  getAllNoticesByTermId,
  updateNotice,
  deleteNotice,
} = require('../../../controllers/Academic/Notice/Notice.controller');
const uploads = require('../../../middleware/notice');

router.post('/', uploads.single('attachment'), createNotice);
router.get('/:id', getAllNoticesByTermId);
router.put('/:id', updateNotice);
router.delete('/:id', deleteNotice);

module.exports = router;
