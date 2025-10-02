import React, { useState, useEffect } from 'react';
import { Pen, Plus, Save } from 'lucide-react';
import Input from "../Input";
import toast from "react-hot-toast";

function CourseForm({ changed,entries, addArrayItem, updateArrayItem, removeArrayItem }) {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editIndex, setEditIndex] = useState(-1);
  const [errors, setErrors] = useState({});

  const [courseData, setCourseData] = useState({
    course: "",
    institute: "",
    startDate: "",
    endDate: "",
    location: "",
    description: "",
  });

  const createEntry = () => {
    const newIndex = entries.length;
    addArrayItem("courses", courseData);
    setEditIndex(newIndex);
    setIsFormVisible(true);
  };

  const handleEdit = (entry, index) => {
    setCourseData(entry);  changed(true);
    setEditIndex(index);
    setIsFormVisible(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  useEffect(() => {
    if (editIndex >= 0) {
      updateArrayItem("courses", editIndex, courseData);
    }
  }, [courseData]);

  const handleSave = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!courseData.course.trim()) newErrors.course = "Course name is required";
    if (!courseData.institute.trim()) newErrors.institute = "Institute is required";
    if (!courseData.location.trim()) newErrors.location = "Location is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("Please fill all required fields", { position: "top-center", duration: 500 });
      return;
    }

    setErrors({});
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

  const handleDelete = () => {
    if (editIndex !== -1) removeArrayItem("courses", editIndex);
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
      <h1 className="text-blue-700 font-bold text-3xl mb-6 text-center">Courses</h1>

      {isFormVisible ? (
        <form>
          <div className="bg-blue-50 rounded-xl p-6 shadow-inner flex flex-col gap-4">
            <Input
              label="Course"
              name="course"
              value={courseData.course}
              placeholder="Enter your course"
              onChange={handleChange}
            />
            {errors.course && <p className="text-red-500 text-sm mt-1">{errors.course}</p>}

            <Input
              label="Institute / University"
              name="institute"
              value={courseData.institute}
              placeholder="Enter institute or university"
              onChange={handleChange}
            />
            {errors.institute && <p className="text-red-500 text-sm mt-1">{errors.institute}</p>}

            <div className="grid lg:grid-cols-3 grid-cols-1 gap-4">
              <Input
                label="Start Date"
                name="startDate"
                type="date"
                value={courseData.startDate}
                onChange={handleChange}
              />
              <Input
                label="End Date"
                name="endDate"
                type="date"
                value={courseData.endDate}
                onChange={handleChange}
              />
              <Input
                label="Location"
                name="location"
                value={courseData.location}
                placeholder="City, State, Country"
                onChange={handleChange}
              />
            </div>
            {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}

            <div className="flex flex-col gap-2 mt-2">
              <label className="text-md font-medium">Description</label>
              <textarea
                value={courseData.description}
                name="description"
                onChange={handleChange}
                className="py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="3"
                placeholder="Describe your course, achievements, etc."
              />
            </div>

            <div className="flex gap-2 justify-end mt-4">
              <button
                type="submit"
                onClick={handleSave}
                className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-700 transition"
              >
                <Save size={18} /> {editIndex !== -1 ? "Update" : "Save"}
              </button>
              <button
                onClick={handleDelete}
                className="flex items-center gap-2 bg-gray-200 text-gray-700 px-5 py-2 rounded-lg shadow hover:bg-gray-300 transition"
              >
                Delete
              </button>
            </div>
          </div>
        </form>
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
                  {entry.startDate ? new Date(entry.startDate).getFullYear() : ""} - {entry.endDate ? new Date(entry.endDate).getFullYear() : ""} | {entry.location}
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
            onClick={createEntry}
            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg mt-4 self-end hover:bg-green-700 transition"
          >
            <Plus size={18} /> Add Another Course
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-8">
          <p className="text-gray-500 mb-4">No course added yet.</p>
          <button
            onClick={createEntry}
            className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            <Plus size={18} /> Add Your Courses
          </button>
        </div>
      )}
    </div>
  );
}

export default CourseForm;
