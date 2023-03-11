require('dotenv').config();
const Staff = require('../../../models/Staff/Staff/Staff.mongo');
const Settings = require('../../../models/School/Settings/settings.mongo');
const jwt = require('jsonwebtoken');
const jwtRefreshToken = process.env.REFRESH_TOKEN;
const jwtAccessToken = process.env.ACCESS_TOKEN;

const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt)
    return res.status(401).json({ error: 'You are not authorized' });
  const refreshToken = cookies.jwt;
  // find the current term id
  const currentTermId = await Settings.find({}).populate('currentTermId');
  const staff = await Staff.findOne({ refreshToken: refreshToken })
    .populate('role')
    .populate('schoolId');
  if (!staff)
    return res.status(403).json({ error: 'Staff not found try again' });
  // evaluate jwt
  jwt.verify(refreshToken, jwtRefreshToken, (e, decoded) => {
    if (e || staff.username !== decoded.username)
      return res.status(403).json({ error: 'Forbidden' });
    const accessToken = jwt.sign(
      {
        username: decoded.username,
      },
      jwtAccessToken,
      { expiresIn: '10m' }
    );

    return res.json({
      accessToken: accessToken,
      username: staff.username,
      image: staff?.image,
      email: staff.email,
      role: staff?.role,
      userId: staff?._id,
      schoolId: staff?.schoolId,
      currentTermId: currentTermId[0]?.currentTermId,
    });
  });
};

module.exports = handleRefreshToken;
