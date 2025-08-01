import { Company } from "../models/company.model.js";
import cloudinary from "../utils/cloudinary.js";
import getDataUri from "../utils/datauri.js";

export const registerCompany = async (req, res) => {
  try {
    const { companyName } = req.body;
    if (!companyName) {
      return res
        .status(400)
        .json({ message: "Company name is required", success: false });
    }

    let company = await Company.findOne({ name: companyName });
    if (company) {
      return res
        .status(400)
        .json({ message: "Company already exists", success: false });
    }

    company = await Company.create({ name: companyName, userId: req.id });

    return res.status(201).json({
      message: "Company registered successfully",
      company,
      success: true,
    });
  } catch (error) {
    console.log("Error in registerCompany controller", error);
    return res.status(500).json({ message: error.message, success: false });
  }
};

export const getCompany = async (req, res) => {
  try {
    const userId = req.id;
    const companies = await Company.find({ userId });

    if (!companies) {
      return res
        .status(404)
        .json({ message: "No companies found", success: false });
    }

    return res.status(200).json({ companies, success: true });
  } catch (error) {
    console.log("Error in getCompany controller", error);
    return res.status(500).json({ message: error.message, success: false });
  }
};

export const getCompanyById = async (req, res) => {
  try {
    const companyId = req.params.id;
    const company = await Company.findById(companyId);

    if (!company) {
      return res
        .status(404)
        .json({ message: "Company not found", success: false });
    }

    return res.status(200).json({ company, success: true });
  } catch (error) {
    console.log("Error in getCompanyById controller", error);
    return res.status(500).json({ message: error.message, success: false });
  }
};

export const updateCompany = async (req, res) => {
  try {
    const { name, description, website, location } = req.body;
    const file = req.file;

    const updateData = { name, description, website, location };

    const companyId = req.params.id;
    const company = await Company.findByIdAndUpdate(companyId, updateData, {
      new: true,
    });

    if (!company) {
      return res
        .status(404)
        .json({ message: "Company not found", success: false });
    }

    if (file) {
      const fileUri = getDataUri(file);

      if (company.logo) {
        const publicId = company.logo.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(publicId);
      }

      const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

      if (cloudResponse) {
        company.logo = cloudResponse.secure_url;
        await company.save();
      }
    }

    return res.status(200).json({
      message: "Company information updated successfully",
      success: true,
    });
  } catch (error) {
    console.log("Error in updateCompany controller", error);
    return res.status(500).json({ message: error.message, success: false });
  }
};
