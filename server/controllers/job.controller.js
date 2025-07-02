import { Job } from "../models/job.model.js";

export const postJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      salary,
      location,
      experience,
      jobType,
      position,
      companyId,
    } = req.body;
    const userId = req.id;

    if (
      !title ||
      !description ||
      !requirements ||
      !salary ||
      !location ||
      !experience ||
      !jobType ||
      !position ||
      !companyId
    ) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }

    const job = await Job.create({
      title,
      description,
      requirements: requirements.split(","),
      salary: Number(salary),
      location,
      experienceLevel: experience,
      jobType,
      position,
      company: companyId,
      created_by: userId,
    });

    return res
      .status(201)
      .json({ message: "New job created successfully", job, success: true });
  } catch (error) {
    console.log("Error in postJob controller", error);
    return res.status(500).json({ message: error.message, success: false });
  }
};

export const getAllJobs = async (req, res) => {
  try {
    const keywords = req.query.keyword || "";
    const query = {
      $or: [
        { title: { $regex: keywords, $options: "i" } },
        { description: { $regex: keywords, $options: "i" } },
      ],
    };
    const jobs = await Job.find(query)
      .populate("company")
      .sort({ createdAt: -1 });
    if (!jobs) {
      return res.status(404).json({ message: "No jobs found", success: false });
    }
    return res.status(200).json({ jobs, success: true });
  } catch (error) {
    console.log("Error in getAllJobs controller", error);
    return res.status(500).json({ message: error.message, success: false });
  }
};

export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate("company");

    if (!job) {
      return res.status(404).json({ message: "Job not found", success: false });
    }

    return res.status(200).json({ job, success: true });
  } catch (error) {
    console.log("Error in getJobById controller", error);
    return res.status(500).json({ message: error.message, success: false });
  }
};

export const getAdminJobs = async (req, res) => {
  try {
    const adminId = req.id;
    const jobs = await Job.find({ created_by: adminId }).populate("company");

    if (!jobs) {
      return res.status(404).json({ message: "No jobs found", success: false });
    }

    return res.status(200).json({ jobs, success: true });
  } catch (error) {
    console.log("Error in getAdminJobs controller", error);
    return res.status(500).json({ message: error.message, success: false });
  }
};
