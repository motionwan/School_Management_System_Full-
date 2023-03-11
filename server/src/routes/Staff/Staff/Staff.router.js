const express = require('express');
const {
  // createStaff,
  //activateAccount,
  getAllStaff,
  updateStaff,
  deleteStaff,
  resetPassword,
  forgotPassword,
  signInStaff,
  logoutStaff,
  adminCreateStaff,
  signUpStaff,
} = require('../../../controllers/Staff/Staff/Staff.controller');
const router = express.Router();
const upload = require('../../../middleware/uploads.multer');

//router.post('/', createStaff);
//router.get('/:id/verify/:token', activateAccount);
// verify and sign up staff
router.get('/:id', getAllStaff);
router.get('/logout', logoutStaff);
router.put('/:id', updateStaff);
router.delete('/:id', deleteStaff);
router.post('/login', signInStaff);
router.post('/forgot_password', forgotPassword);
router.post('/reset_password/:token', resetPassword);
router.post('/admin_create', adminCreateStaff);
router.post('/signup/:token/:id', upload.single('photoId'), signUpStaff);

module.exports = router;
