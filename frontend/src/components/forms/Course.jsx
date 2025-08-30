import React from 'react'
import { useState } from "react";
import { Pen, Plus, Save } from 'lucide-react';
import Input from "../Input";


function Course({entries,setEntries}) {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editIndex, setEditIndex] = useState(-1);
  
  const [courseData, setCourseData] = useState({
    course: "",
    institute: "",
    startDate: "",
    endDate: "",
    location: "",
    description: "",
  });

  const handleEdit = (entry, editIndex) => {
    setCourseData(entry);
    setIsFormVisible(true);
    setEditIndex(editIndex);
  };

  const handleEducationChange = (e) => {
    const { name, value } = e.target;
    setCourseData({
      ...courseData,
      [name]: value,
    });
  };

  const handleSave = () => {
    if (editIndex !== -1) {
      const updatedEntries = entries.map((entry, index) =>
        index === editIndex ? courseData : entry
      );
      setEntries(updatedEntries);
    } else {
      setEntries(prev => [courseData, ...prev]);
    }
    setCourseData({
      course: "",
      institute: "",
      startDate: "",
      endDate: "",
      location: "",
      description: "",
    });
    setEditIndex(-1);
    setIsFormVisible(false);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 max-w-2xl mx-auto">
      <h1 className="text-blue-700 font-bold text-3xl mb-6 text-center">Education</h1>
      {isFormVisible ? (
        <div className="bg-blue-50 rounded-xl p-6 shadow-inner">
          <div className="flex flex-col gap-4">
            <Input
              label="course"
              name="course"
              value={courseData.course}
              placeholder="Enter your course"
              onChange={handleEducationChange}
            />
            <Input
              label="institute / University"
              name="institute"
              value={courseData.institute}
              placeholder="Enter institute or university"
              onChange={handleEducationChange}
            />
            <div className="grid lg:grid-cols-3 grid-cols-1 gap-4">
              <Input
                label="Start Date"
                name="startDate"
                value={courseData.startDate}
                type="date"
                onChange={handleEducationChange}
              />
              <Input
                label="End Date"
                name="endDate"
                value={courseData.endDate}
                type="date"
                onChange={handleEducationChange}
              />
              <Input
                label="Location"
                name="location"
                value={courseData.location}
                placeholder="City, State, Country"
                onChange={handleEducationChange}
              />
            </div>
            <div className="flex flex-col gap-2 mt-2">
              <label className="text-md font-medium">Description</label>
              <textarea
                value={courseData.description}
                name="description"
                onChange={handleEducationChange}
                className="py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="3"
                placeholder="Describe your education, achievements, etc."
              ></textarea>
            </div>
            <div className="flex gap-2 justify-end mt-4">
              <button
                onClick={handleSave}
                className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-700 transition"
              >
                <Save size={18} /> {editIndex !== -1 ? "Update" : "Save"}
              </button>
              <button
                onClick={() => {
                  setIsFormVisible(false);
                  setEditIndex(-1);
                  setcourseData({
                    course: "",
                    institute: "",
                    startDate: "",
                    endDate: "",
                    location: "",
                    description: "",
                  });
                }}
                className="flex items-center gap-2 bg-gray-200 text-gray-700 px-5 py-2 rounded-lg shadow hover:bg-gray-300 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      ) : entries.length > 0 ? (
        <div className="flex flex-col gap-4 mt-4">
          {entries.map((entry, index) => (
            <div
              key={index}
              className="border border-gray-200 bg-gray-50 rounded-xl p-4 flex flex-col md:flex-row justify-between items-start md:items-center shadow-sm"
            >
              <div>
                <h2 className="text-lg font-semibold text-blue-800">{entry.course}</h2>
                <p className="text-gray-700">{entry.institute}</p>
                <p className="text-sm text-gray-500">
                  {new Date(entry.startDate).getFullYear()} -{new Date(entry.endDate).getFullYear()} | {entry.location}
                </p>
               
              </div>
              <button
                className="flex items-center gap-1 bg-blue-500 text-white px-3 py-1 rounded-lg mt-2 md:mt-0 hover:bg-blue-600 transition"
                onClick={() => handleEdit(entry, index)}
                title="Edit"
              >
                <Pen size={16} /> Edit
              </button>
            </div>
          ))}
          <button
            onClick={() => setIsFormVisible(true)}
            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg mt-4 self-end hover:bg-green-700 transition"
          >
            <Plus size={18} /> Add Another course
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-8">
          <p className="text-gray-500 mb-4">No course  added yet.</p>
          <button
            onClick={() =>{ setIsFormVisible(true)
            }
            }
            className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            <Plus size={18} /> Add Your courses
          </button>
        </div>
      )}
    </div>
  );
}

export default Course
