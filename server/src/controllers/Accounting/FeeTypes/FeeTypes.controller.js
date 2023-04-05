const FeeType = require('../../../models/Accounting/FeeTypes/FeeType.mongo');

// Create a new fee type
const createFeeType = async (req, res) => {
  try {
    const { name, description, amount } = req.body;

    // Validate input fields
    if (!name || !description || !amount) {
      return res
        .status(400)
        .json({ error: 'Please provide all required fields' });
    }

    // Create a new fee type
    const feeType = new FeeType({ name, description, amount });

    // Save the fee type to the database
    await feeType.save();

    res.status(201).json(feeType);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// Get all fee types
const getFeeTypes = async (req, res) => {
  try {
    const feeTypes = await FeeType.find({});

    res.status(201).json(feeTypes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// Get a single fee type by ID
const getFeeTypeById = async (req, res) => {
  try {
    const { id } = req.params; // fee type id
    const feeType = await FeeType.findById(id);

    if (!feeType) {
      return res.status(404).json({ error: 'Fee type not found' });
    }

    res.json(feeType);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// Update a fee type by ID
const updateFeeType = async (req, res) => {
  try {
    const { id } = req.params; // fee type id
    const { name, description, amount } = req.body;

    const feeType = await FeeType.findByIdAndUpdate(
      id,
      { name, description, amount },
      { new: true }
    );

    if (!feeType) {
      return res.status(404).json({ error: error.message });
    }

    res.status(201).json(feeType);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// Delete a fee type by ID
const deleteFeeType = async (req, res) => {
  try {
    const { id } = req.params; // fee type id
    const feeType = await FeeType.findByIdAndDelete(id);

    if (!feeType) {
      return res.status(404).json({ error: 'Fee type not found' });
    }

    res.status(204).json({ message: 'Fee type deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createFeeType,
  getFeeTypes,
  getFeeTypeById,
  updateFeeType,
  deleteFeeType,
};
