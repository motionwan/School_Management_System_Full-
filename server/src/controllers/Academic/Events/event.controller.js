const Events = require('../../../models/Academic/Events/event.model');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const { format, parseISO } = require('date-fns');

const createEvent = async (req, res) => {
  try {
    let attachment = '';
    if (req.file) {
      attachment = req.file.path;
    }
    const { title, description, eventDate, status, schoolId, addedBy, termId } =
      req.body;

    return res.json(
      await Events.create({
        attachment,
        title,
        description,
        eventDate,
        status,
        schoolId,
        addedBy,
        termId,
      })
    );
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const getAllEventsByTermId = async (req, res) => {
  try {
    const { id } = req.params; // term id;

    const events = await Events.aggregate([
      {
        $match: {
          termId: ObjectId(id),
        },
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
        $project: {
          status: {
            $cond: {
              if: { $eq: ['$status', true] },
              then: 'active',
              else: 'inactive',
            },
          },
          addedBy: '$user.fullName',
          createdAt: 1,
          title: 1,
          eventDate: 1,
        },
      },
    ]);

    return res.json(events);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
const updateEvent = async (req, res) => {
  try {
    let attachment = '';
    if (req.file) {
      attachment = req.file.path;
    }
    const { title, description, eventDate, status, schoolId, addedBy, termId } =
      req.body;
    const { id } = req.params; // event id;
    return res.json(
      await Event.findByIdAndUpdate(id, {
        title,
        description,
        eventDate,
        status,
        schoolId,
        addedBy,
        termId,
        attachment,
      })
    );
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params; // event id;
    return res.json(await Events.findByIdAndDelete(id));
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createEvent,
  getAllEventsByTermId,
  updateEvent,
  deleteEvent,
};
