import { Schema, model } from "mongoose";
import { title } from "process";

const resumeSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true,
  },
  personalInfo: {
    fullName: { type: String, trim: true },
    headline: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
    },
    mobileNo: {
      type: String,
    },
    location: {
      type: String,
      trim: true,
    },
    linkedIn: {
      type: String,
      trim: true,
    },
    github: {
      type: String,
      trim: true,
    },
    summary: {
      type: String,
    },
  },
  education: [
    {
      degree: { type: String, trim: true },
      institution: { type: String, trim: true },
      location: { type: String, trim: true },
      startYear: { type: Number },
      endYear: { type: Number },
      description: { type: String },
    },
  ],
  experience: [
    {
      title: { type: String, trim: true },
      employer: { type: String, trim: true },
      startDate: { type: Number },
      endDate: { type: Number },
      location: { type: String, trim: true },
      description: { type: String },
    },
  ],
  skills: [
    {
      skill: { type: String, trim: true },
      level: { type: String, trim: true },
      description: { type: String },
    },
  ],
  projects: [
    {
      title: { type: String },
      subtitle: { type: String, trim: true },
      startDate: { type: Number },
      endDate: { type: Number },
      description: { type: String },
      link: { type: String, trim: true },
    },
  ],
  certifications: [
    {
      certificate: { type: String, trim: true },
      issuer: { type: String, trim: true, trim: true },
      date: { type: Number, trim: true },
      description: { type: String, trim: true },
      link: { type: String, trim: true },
    },
  ],
  template:{
    type:Schema.Types.ObjectId,
    ref:'Template',
    required:true,

  }
});

export const Resume=model("Resume",resumeSchema);
