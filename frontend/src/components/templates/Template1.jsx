import React ,{forwardRef}from "react";
import { useSelector } from "react-redux";

 const Template1 = ({ resume,isPrint }, ref) => {
  return (

    
    
    <div ref={ref}  className={`aspect-[3/4] bg-white rounded-sm p-8`}>
      {/* Header */}
      <div className="text-center p-1  pb-4 mb-6">
        <h1 className="text-3xl capitalize font-bold text-gray-900">
          {resume?.personalInfo.fullName}
        </h1>
        <p className="text-gray-600 capitalize">
          {resume?.personalInfo.headline}
        </p>
        <p className="text-sm text-gray-500 mt-2">
          📍 {resume?.personalInfo.location}| ✉️ {resume?.personalInfo.email}|
          📞{resume?.personalInfo.phoneNumber} | 🔗
          {resume?.personalInfo.linkedIn} |🔗 {resume?.personalInfo.github}
        </p>
      </div>

      {/* Summary */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-700 border-b pb-1 mb-3">
          Summary
        </h2>
        <p className="text-gray-600">
          Passionate developer with hands-on experience in building web
          applications using React, Node.js, and Django. Skilled in
          problem-solving, DSA, and deploying projects with Docker and AWS.
        </p>
      </div>

      {/* Skills */}
     {resume.skills.length >0 &&  <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-700 border-b pb-1 mb-3">
          Skills
        </h2>
        <div className="flex flex-wrap gap-2">
          {resume.skills.map((skill, index) => (
            <span
              key={index}
              className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
            >
              {skill.skill}
            </span>
          ))}
        </div>
      </div>
     }
      {/* Projects */}
     { resume.projects.length > 0  && <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-700 border-b pb-1 mb-3">
          Projects
        </h2>
        <div className="space-y-4">
          {resume.projects.map((project) => (
            <div className="flex-col flex justify-center">
              <h3 className="text-lg font-semibold text-gray-800">
                {project.title}
              </h3>
              <p className="text-gray-600 text-sm">{project.subtitle}</p>
              <p>{project.description}</p>
            </div>
          ))}
        </div>
      </div>
     }

      {/* Education */}
      <h2 className="text-xl font-semibold text-gray-700 border-b pb-1 mb-3">
        Education
      </h2>
      {resume.education.map((edu, index) => (
        <div key={index} className="mb-6">
          <div className="mb-6">
            <p className="text-gray-700 font-medium">{edu.degree}</p>
            {
              <div className="flex items-center justify-between text-gray-600 text-sm">
                <p>{edu.school}</p> 
                <p>{ (new Date(edu.startDate).getFullYear()) || ""}- {new Date(edu.endDate).getFullYear() || ""}</p>
              </div>
            }
            <p></p>
          </div>
        </div>
      ))}

      {/* Certifications */}
      <div>
        <h2 className="text-xl font-semibold text-gray-700 border-b pb-1 mb-3">
          Certifications
        </h2>
      {
        resume.certificates.map((cert)=>(
          <div className="flex flex-col gap-2">
            <h2 className="font-semibold ">{cert.certificate}</h2>
        <div className="flex gap-1">
          <p>{cert.issuer}</p>
          <p>{cert.link}</p>
        </div>
          </div>
        ))
      }
      </div>
    </div>
  
  );
}

export default Template1;
