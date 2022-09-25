const Job = require("../models/Job");
const { StatusCodes } = require("http-status-codes");
const { NotFoundError, BadRequestError } = require("../errors");

const getAllJobs = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.user.userId }).sort("createdAt");
  res.status(StatusCodes.OK).json({ nbHits: jobs.length, jobs });
};

const getJob = async (req, res) => {
  // fetching userId from req.user and attaching it to userId
  // fetching id from req.params and attaching it to jobId
  const {
    user: { userId },
    params: { id: jobId },
  } = req;

  const job = await Job.findOne({ _id: jobId, createdBy: userId });

  if (!job) {
    throw new NotFoundError(`Not job with Id ${jobId}`);
  }
  res.status(StatusCodes.OK).json(job);
};

const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const job = await Job.create({ ...req.body });
  res.status(StatusCodes.CREATED).json(job);
};

const updateJob = async (req, res) => {
  // fetching userId from req.user and attaching it to userId
  // fetching id from req.params and attaching it to jobId
  const {
    body: { company, position },
    user: { userId },
    params: { id: jobId },
  } = req;

  if (!company || !position) {
    throw new BadRequestError("position and company cannot be empty");
  }

  // new: true => Getting back updated job as response
  const job = await Job.findOneAndUpdate(
    { _id: jobId, createdBy: userId },
    req.body,
    { new: true, runValidators: true }
  );

  if (!job) {
    throw new NotFoundError(`Not job with Id ${jobId}`);
  }
  res.status(StatusCodes.OK).json(job);
};

const deleteJob = async (req, res) => {
  // req.user is coming from auth middleware
  // fetching userId from req.user and attaching it to userId
  // fetching id from req.params and attaching it to jobId
  const {
    user: { userId },
    params: { id: jobId },
  } = req;

  const job = await Job.findOneAndRemove({ _id: jobId, createdBy: userId });

  if (!job) {
    throw new NotFoundError(`Not job with Id ${jobId}`);
  }
  res.status(StatusCodes.OK).send();
};

module.exports = {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
};
