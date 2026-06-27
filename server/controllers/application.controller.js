const { validationResult } = require("express-validator");
const Application = require("../models/Application");

// GET /api/applications
exports.getApplications = async (req, res, next) => {
  try {
    const { status, source, workType, search, sort = "-createdAt", page = 1, limit = 20 } = req.query;

    const filter = { user: req.user._id };
    if (status) filter.status = status;
    if (source) filter.source = source;
    if (workType) filter.workType = workType;
    if (search) {
      filter.$or = [
        { company: { $regex: search, $options: "i" } },
        { role: { $regex: search, $options: "i" } },
      ];
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const [applications, total] = await Promise.all([
      Application.find(filter).sort(sort).skip(skip).limit(parseInt(limit)).populate("contacts", "name role email"),
      Application.countDocuments(filter),
    ]);

    res.json({
      success: true,
      data: applications,
      pagination: { total, page: parseInt(page), limit: parseInt(limit), pages: Math.ceil(total / limit) },
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/applications/stats
exports.getStats = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const [statusCounts, monthlyCounts, sourceCounts] = await Promise.all([
      Application.aggregate([
        { $match: { user: userId } },
        { $group: { _id: "$status", count: { $sum: 1 } } },
      ]),
      Application.aggregate([
        { $match: { user: userId, appliedDate: { $ne: null } } },
        {
          $group: {
            _id: { year: { $year: "$appliedDate" }, month: { $month: "$appliedDate" } },
            count: { $sum: 1 },
          },
        },
        { $sort: { "_id.year": 1, "_id.month": 1 } },
        { $limit: 12 },
      ]),
      Application.aggregate([
        { $match: { user: userId, source: { $ne: "" } } },
        { $group: { _id: "$source", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
      ]),
    ]);

    const total = await Application.countDocuments({ user: userId });
    const offers = statusCounts.find((s) => s._id === "Offer")?.count || 0;
    const interviews = await Application.countDocuments({
      user: userId,
      status: { $in: ["Phone Screen", "Technical Interview", "Final Interview"] },
    });

    res.json({
      success: true,
      data: {
        total,
        offers,
        interviews,
        responseRate: total > 0 ? Math.round((interviews / total) * 100) : 0,
        statusBreakdown: statusCounts,
        monthlyApplications: monthlyCounts,
        sourceBenchmark: sourceCounts,
      },
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/applications/:id
exports.getApplication = async (req, res, next) => {
  try {
    const application = await Application.findOne({ _id: req.params.id, user: req.user._id }).populate("contacts");
    if (!application) {
      return res.status(404).json({ success: false, message: "Application not found." });
    }
    res.json({ success: true, data: application });
  } catch (error) {
    next(error);
  }
};

// POST /api/applications
exports.createApplication = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    const application = await Application.create({ ...req.body, user: req.user._id });
    res.status(201).json({ success: true, data: application });
  } catch (error) {
    next(error);
  }
};

// PUT /api/applications/:id
exports.updateApplication = async (req, res, next) => {
  try {
    const application = await Application.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!application) {
      return res.status(404).json({ success: false, message: "Application not found." });
    }
    res.json({ success: true, data: application });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/applications/:id
exports.deleteApplication = async (req, res, next) => {
  try {
    const application = await Application.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!application) {
      return res.status(404).json({ success: false, message: "Application not found." });
    }
    res.json({ success: true, message: "Application deleted." });
  } catch (error) {
    next(error);
  }
};
