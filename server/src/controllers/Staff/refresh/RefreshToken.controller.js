require('dotenv').config();
const Staff = require('../../../models/Staff/Staff/Staff.mongo');
//const Settings = require('../models/settings.model');
const jwt = require('jsonwebtoken');
const jwtRefreshToken = process.env.REFRESH_TOKEN;
const jwtAccessToken = process.env.ACCESS_TOKEN;

const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt)
    return res.status(401).json({ error: 'You are not authorized' });
  const refreshToken = cookies.jwt;
  // find the current election year id
  //const currentElectionYearId = await Settings.find({});

  const staff = await Staff.findOne({ refreshToken: refreshToken }).populate(
    'role'
  );
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
    // send token to the front end
    // for constituency managers
    // if (user.role === 'constituency') {
    //   return res.json({
    //     accessToken: accessToken,
    //     roles: [user.role],
    //     username: user.username,
    //     name: user.name,
    //     image: user.image,
    //     constituencyId: user.constituencyId,
    //     regionId: user.regionId,
    //     userId: user._id,
    //     currentElectionYearId: currentElectionYearId[0].currentElectionYear,
    //   });
    // }
    // if (user.role === 'region') {
    //   return res.json({
    //     accessToken: accessToken,
    //     roles: [user.role],
    //     name: user.name,
    //     username: user.username,
    //     image: user.image,
    //     regionId: user.regionId,
    //     userId: user._id,
    //     currentElectionYearId: currentElectionYearId[0].currentElectionYear,
    //   });
    // }
    // if (user.role === 'admin') {
    //   return res.json({
    //     accessToken: accessToken,
    //     roles: [user.role],
    //     name: user.name,
    //     username: user.username,
    //     image: user.image,
    //     userId: user._id,
    //     currentElectionYearId: currentElectionYearId[0]?.currentElectionYear,
    //   });
    // }
    return res.json({
      accessToken: accessToken,
      username: staff.username,
      image: staff?.image,
      email: staff.email,
      role: staff?.role,
      userId: staff?._id,
    });
  });
};

module.exports = handleRefreshToken;
