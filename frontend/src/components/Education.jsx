import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addEduInfo } from "../features/formSlice";
import Input from "./Input";
function Education({ entries, saveEntry }) {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [educationData, setEducationData] = useState({
    degree: "",
    school: "",
    startDate: "",
    endDate: "",
    location: "",
    description: "",
  });

  const handleEducationChange = (e) => {
    const { name, value } = e.target;
    setEducationData({
      ...educationData,
      [name]: value,
    });
  };

  const handleSave = () => {
    saveEntry(educationData);
    setEducationData({
      degree: "",
      school: "",
      startDate: "",
      endDate: "",
      location: "",
      description: "",
    });
    setIsFormVisible(false);
  };

  return (
    <div className="bg-white rounded-md shadow-md p-4">
      <div>
        <h1 className="text-gray-900 font-bold text-2xl">Education</h1>
      </div>
      {isFormVisible ? (
        <div>
          <div className="flex flex-col gap-4 mt-4">
            <Input
              label="degree"
              name="degree"
              value={educationData.degree}
              placeholder="enter the degree"
              onChange={handleEducationChange}
            />
            <Input
              label="school"
              name="school"
              value={educationData.school}
              placeholder="enter school"
              onChange={handleEducationChange}
            />
            <div className="grid lg:grid-cols-3 grid-cols-1 gap-4">
              <Input
                label="start date"
                name="startDate"
                value={educationData.startDate}
                type="date"
                onChange={handleEducationChange}
              />
              <Input
                label="End date"
                name="endDate"
                value={educationData.endDate}
                type="date"
                onChange={handleEducationChange}
              />
              <Input
                label="Location"
                name="location"
                value={educationData.location}
                placeholder="city, state, country"
                onChange={handleEducationChange}
              />
            </div>
            <div className="flex flex-col gap-2 mt-4">
              <label className="text-md font-medium">Description</label>
              <textarea
                value={educationData.description}
                name="description"
                onChange={handleEducationChange}
                className="py-2 px-4 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="4"
                placeholder="Enter your description here"
              ></textarea>
            </div>
            <button
              onClick={handleSave}
              className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-blue-600 transition-colors duration-300"
            >
              Save
            </button>
          </div>
        </div>
      ) : entries.length > 0 ? (
        <div className="flex flex-col gap-4 mt-4">
          {entries.map((entry, index) => (
            <div key={index} className="border border-gray-400 p-2 rounded-md flex justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold">{entry.degree}</h2>
                <p className="text-gray-500">{entry.school}</p>
              </div>
              <button className="bg-red-400 p-2 text-white">Edit</button>
            </div>
          ))}
          <button
            onClick={() => setIsFormVisible(true)}
            className="bg-red-500 p-2 text-center text-white mt-4"
          >
            Add Another Education
          </button>
        </div>
      ) : (
        <div className="text-gray-500 mx-auto">
          <button
            onClick={() => setIsFormVisible(true)}
            className="bg-red-500 p-2 text-center text-white"
          >
            Add Your Educational Details
          </button>
        </div>
      )}
    </div>
  );
}

export default Education;
