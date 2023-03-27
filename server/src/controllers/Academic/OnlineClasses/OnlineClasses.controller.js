const OnlineClass = require('../../../models/Academic/OnlineClasses/OnlineClasses.mongo');
const axios = require('axios');
const jwt = require('jsonwebtoken');

const createZoomClass = async (req, res) => {
  try {
    const { topic, startTime, duration, password, apiKey, apiSecret } =
      req.body;

    const payload = {
      iss: apiKey,
      exp: Date.now() + 60 * 60 * 1000, // Token expires after 1 hour
    };

    const token = jwt.sign(payload, apiSecret);

    // Set up the Zoom API request headers
    const config = {
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
    };

    const response = await axios.post(
      'https://api.zoom.us/v2/users/me/meetings',
      {
        topic,
        type: 2,
        start_time: startTime,
        duration,
        password,
      },
      config
    );

    res.json({
      success: true,
      message: 'Zoom class created successfully',
      data: {
        joinUrl: response.data.join_url,
        startUrl: response.data.start_url,
      },
    });

    // Save the meeting details to your database
    const meeting = await OnlineClass.create({
      topic,
      startTime,
      duration,
      password,
      zoomMeetingId: response.data.id,
      teacherId: req.user._id,
    });

    return res.json(meeting);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
};

module.exports = { createZoomClass };
