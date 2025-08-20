import React from "react";
import { useSelector } from "react-redux";

export default function Preview() {

    const personalInfo=useSelector((state)=> state.formInfo.personalInfo);
   
  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-8">
      {/* Header */}
      <div className="text-center border-b pb-4 mb-6">
        <h1 className="text-3xl capitalize font-bold text-gray-800">{personalInfo.fullName}</h1>
        <p className="text-gray-600 capitalize">{personalInfo.headline}</p>
        <p className="text-sm text-gray-500 mt-2">📍 {personalInfo.location}| ✉️ {personalInfo.email}| 📞{personalInfo.phone} | 🔗{personalInfo.linkedIn} |🔗 {personalInfo.github}</p>
      </div>

      {/* Summary */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-700 border-b pb-1 mb-3">Summary</h2>
        <p className="text-gray-600">
          Passionate developer with hands-on experience in building web applications using React, Node.js, and Django.
          Skilled in problem-solving, DSA, and deploying projects with Docker and AWS.
        </p>
      </div>

      {/* Skills */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-700 border-b pb-1 mb-3">Skills</h2>
        <div className="flex flex-wrap gap-2">
          {[
            "React.js",
            "Node.js",
            "Python",
            "Django",
            "PostgreSQL",
            "Docker",
            "AWS",
            "DSA"
          ].map((skill, index) => (
            <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Projects */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-700 border-b pb-1 mb-3">Projects</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Madhyam - Your Writing Platform</h3>
            <p className="text-gray-600 text-sm">
              A blogging and writing platform with authentication, profile system, and content publishing features. Built
              with MERN stack.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">School Photo Contest Portal</h3>
            <p className="text-gray-600 text-sm">
              Web application for hosting photo contests, collecting data, and displaying winners. Features admin panel
              and OTP verification.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">LawTech Project</h3>
            <p className="text-gray-600 text-sm">
              A legal domain platform aimed at making law resources accessible using AI/ML models and user-friendly UI.
            </p>
          </div>
        </div>
      </div>

      {/* Education */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-700 border-b pb-1 mb-3">Education</h2>
        <p className="text-gray-700 font-medium">Bachelor of Computer Applications (BCA)</p>
        <p className="text-gray-600 text-sm">XYZ University, 2021 - 2025</p>
      </div>

      {/* Certifications */}
      <div>
        <h2 className="text-xl font-semibold text-gray-700 border-b pb-1 mb-3">Certifications</h2>
        <ul className="list-disc list-inside text-gray-600">
          <li>CS50’s Introduction to Computer Science (Harvard)</li>
          <li>AWS Cloud Practitioner</li>
          <li>Docker Essentials</li>
        </ul>
      </div>
    </div>
  );
}

