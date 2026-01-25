const User = require('../models/user.model');

//GET userTable Data http://localhost:5000/api/users?search=ravi&status=active&page=1&limit=10

exports.getUsers = async (req, res) => {
  try {
    const {
      search = '',
      role,
      isActive,
      page = 1,
      limit = 10
    } = req.query;

    const query = {};

    // 🔍 Search by name OR email
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }

    // 🎭 Role filter
    if (role) {
      query.role = role;
    }

    // ✅ Status filter
    if (isActive) {
      query.isActive = isActive;
    }

    const skip = (page - 1) * limit;
    const sortOrder = req.query.sort === 'asc' ? 1 : -1;

    const users = await User.find(query)
      .skip(skip)
      .limit(Number(limit))
      .sort({ createdAt: sortOrder });

    const total = await User.countDocuments(query);

    res.status(200).json({
      success: true,
      data: users,
      total,
      page: Number(page),
      limit: Number(limit)
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
