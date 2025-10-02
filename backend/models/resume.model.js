import { Schema, model } from "mongoose";
import { title } from "process";

const resumeSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true,
  },
  resumeName:{
    type:String,
    
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
    phoneNumber: {
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
    resumeImage:{
      type:String
    }
  },
  education: [
    {
      degree: { type: String, trim: true },
      school: { type: String, trim: true },
      location: { type: String, trim: true },
      startDate: { type: Date },
      endDate: { type: Date },
      description: { type: String },
    },
  ],
  experience: [
    {
      title: { type: String, trim: true },
      employer: { type: String, trim: true },
      startDate: { type: Date },
      endDate: { type: Date },
      location: { type: String, trim: true },
      description: { type: String },
    },
  ],
  skills: [
    {
      skill: { type: String, trim: true },
      level: { type: String, trim: true },
    },
  ],
  projects: [
    {
      title: { type: String },
      subtitle: { type: String, trim: true },
      startDate: { type: Date },
      endDate: { type: Date },
      description: { type: String },
      link: { type: String, trim: true },
    },
  ],
  certificates: [
    {
      certificate: { type: String, trim: true },
      issuer: { type: String, trim: true},
      date: { type: Date,  },
      link: { type: String, trim: true },
    },
  ],
  achievements:[
{
  title:{
    type:String
  },
  year:{
    type:Date
  },
  issuer:{
    type:String
  },
  link:{
    type:String
  }
}
  ],
  template:{
    type:Schema.Types.ObjectId,
    ref:'Template',
    required:true,

  },
  currentThumbNail:{
    type:String
  }
},{timestamps:true});

export const Resume=model("Resume",resumeSchema);
