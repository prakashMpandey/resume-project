import React from "react";

function Template2({ resumeData }) {
  const { personalInfo,projects, summary, experience, education, skills, certificates, achievements } = resumeData;

  console.log(personalInfo)
  return (
    <div className="max-w-3xl mx-auto bg-white p-8 shadow-md font-sans text-gray-800">
      {/* Header */}
      <div className="flex items-center space-x-6 border-b-4 border-blue-600 pb-4 mb-6">
        {personalInfo?.resumeImage && (
          <img
            src={personalInfo.resumeImage}
            alt={personalInfo.fullName}
            className="w-24 h-24 rounded-full object-cover"
          />
        )}
        <div>
          <h1 className="text-2xl font-bold text-blue-800">{personalInfo?.fullName}</h1>
          <div className="mt-2 text-sm space-y-1">
            <p><strong>Address:</strong> {personalInfo?.location}</p>
            <p><strong>Phone:</strong> {personalInfo?.phoneNumber}</p>
            <p><strong>Email:</strong> {personalInfo?.email}</p>
            {personalInfo?.linkedIn && (
              <p><strong>LinkedIn:</strong> {personalInfo.linkedIn}</p>
            )}
            {personalInfo?.github && (
              <p><strong>GitHub:</strong> {personalInfo.github}</p>
            )}
          </div>
        </div>
      </div>

      {/* Summary */}
      {summary && (
        <section className="mb-6">
          <h2 className="text-lg font-bold text-blue-800 border-b border-gray-300 mb-2">SUMMARY</h2>
          <p className="text-sm leading-relaxed">{summary}</p>
        </section>
      )}

      {/* Experience */}
      {experience?.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold text-blue-800 border-b border-gray-300 mb-2">WORK EXPERIENCE</h2>
          <div className="space-y-4">
            {experience.map((exp, idx) => (
              <div key={idx}>
                <h3 className="font-semibold">{exp.title}, {exp.employer}</h3>
                <p className="text-xs text-gray-600">
                  {new Date(exp.startDate).toLocaleDateString("en-US", { year: "numeric", month: "short" })} –{" "}
                  {exp.endDate ? new Date(exp.endDate).toLocaleDateString("en-US", { year: "numeric", month: "short" }) : "Present"}
                </p>
                <p className="text-sm mt-1">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}
      {projects?.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold text-blue-800 border-b border-gray-300 mb-2">Projects</h2>
          <div className="space-y-4">
            {projects.map((project, idx) => (
              <div key={idx}>
                <h3 className="font-semibold">{project.title}, {project.subtitle}</h3>
                <p className="text-xs text-gray-600">
                  {new Date(project.startDate).toLocaleDateString("en-US", { year: "numeric", month: "short" })} –{" "}
                  {project.endDate  ? new Date(project.endDate).toLocaleDateString("en-US", { year: "numeric", month: "short" }) : "Present"}
                </p>
                <p className="text-sm mt-1">{project.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education?.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold text-blue-800 border-b border-gray-300 mb-2">EDUCATION</h2>
          <div className="space-y-4">
            {education.map((edu, idx) => (
              <div key={idx}>
                <h3 className="font-semibold">{edu.degree}</h3>
                <p className="text-sm">{edu.school} - {edu.location}</p>
              {(edu.startDate || edu.endDate)  && <p className="text-xs text-gray-600">
                  {new Date(edu.startDate).toLocaleDateString("en-US", { year: "numeric", month: "short" })} –{" "}
                  {edu.endDate ? new Date(edu.endDate).toLocaleDateString("en-US", { year: "numeric", month: "short" }) : "Present"}
                </p> }
                {edu.description && <p className="text-sm mt-1">{edu.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Additional Info */}
      {(skills?.length > 0 || certificates?.length > 0 || achievements?.length > 0) && (
        <section>
          <h2 className="text-lg font-bold text-blue-800 border-b border-gray-300 mb-2">Skills</h2>

          {/* Skills */}
          {skills?.length > 0 && (
            <div className="mb-4">
              {/* <p className="font-semibold">Technical Skills:</p> */}
              <ul className="list-disc list-inside text-sm">
                {skills.map((s, idx) => (
                  <li key={idx}>{s.skill} {s.level && `(${s.level})`}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Certificates */}
          {certificates?.length > 0 && (
            <div className="mb-4">
              <p className="font-semibold">Certifications:</p>
              <ul className="list-disc list-inside text-sm">
                {certificates.map((c, idx) => (
                  <li key={idx}>{c.certificate} - {c.issuer}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Achievements */}
          {achievements?.length > 0 && (
            <div className="mb-4">
              <p className="font-semibold">Awards/Activities:</p>
              <ul className="list-disc list-inside text-sm">
                {achievements.map((a, idx) => (
                  <li key={idx}>{a.title} ({a.issuer})</li>
                ))}
              </ul>
            </div>
          )}
        </section>
      )}
    </div>
  );
}

export default Template2;
