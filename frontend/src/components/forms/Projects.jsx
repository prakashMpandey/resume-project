import React from 'react'
import { useState } from "react";
import { Pen, Plus, Save } from 'lucide-react';
import Input from "../Input";

function Projects({entries,setEntries}) {

    const [isFormVisible, setIsFormVisible] = useState(false);
      const [editIndex, setEditIndex] = useState(-1);
      
      const [projectData, setProjectData] = useState({
        title: "",
        subtitle: "",
        startDate: "",
        endDate: "",
        description: "",
        link:""
      });

   
      const handleChange = (e) => {
    const { name, value } = e.target;
    setProjectData({
      ...projectData,
      [name]: value,
    });
  };
      const handleEdit = (entry, editIndex) => {
        setProjectData({
          title: entry.title || "",
          subtitle: entry.employer || "",
          startDate: entry.startDate || "",
          endDate: entry.endDate || "",
          description: entry.description || "",
            link: entry.link || ""
        });
        setIsFormVisible(true);
        setEditIndex(editIndex);
      };

      const handleSave = () => {
        if (editIndex !== -1) {
            const updatedEntries = entries.map((entry, index) =>
                index === editIndex ? projectData : entry
            );
            setEntries(updatedEntries);
            }
            else {
                setEntries(prev => [ ...prev,projectData]);
            }

        setProjectData({
            title: "",
            subtitle: "",
            startDate: "",
            endDate: "",
            description: "",    
            link:""
        });
        setEditIndex(-1);
        setIsFormVisible(false);
        }
    
  return (

     <div className="bg-white rounded-2xl shadow-lg p-6 max-w-2xl mx-auto">
      <h1 className="text-blue-700 font-bold text-3xl mb-6 text-center">Projects</h1>
      {isFormVisible ? (
        <div className="bg-blue-50 rounded-xl p-6 shadow-inner">
          <div className="flex flex-col gap-4">
            <Input
              label="job Title"
              name="title"
              value={projectData.title}
              placeholder="Enter your project title"
              onChange={handleChange}
            />
            <Input
              label="sub title"
              name="subtitle"
              value={projectData.subtitle}
              placeholder="Enter your project subtitle"
              onChange={handleChange}
            />
            <div className="grid lg:grid-cols-3 grid-cols-1 gap-4">
              <Input
                label="Start Date"
                name="startDate"
                value={projectData.startDate}
                type="date"
                onChange={handleChange}
              />
              <Input
                label="End Date"
                name="endDate"
                value={projectData.endDate}
                type="date"
                onChange={handleChange}
              />
            </div>
            <div>
                <Input
                    label="Project Link"
                    name="link"
                    value={projectData.link}
                    type="text"
                    placeholder="Enter project link"
                    onChange={handleChange}
                />
            </div>
            <div className="flex flex-col gap-2 mt-2">
              <label className="text-md font-medium">Description</label>
              <textarea
                value={projectData.description}
                name="description"
                onChange={handleChange}
                className="py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="3"
                placeholder="Describe your project"
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
                  setEducationData({
                    title: "",
                    subtitle: "",
                    startDate: "",
                    endDate: "",
                    description: "",
                    link:""
                  });
                }}
                className="flex items-center gap-2 bg-gray-200 text-gray-700 px-5 py-2 rounded-lg shadow hover:bg-gray-300 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      ) : (

        <div className="flex flex-col gap-4">

        {entries.length!==0 ? (
             <div className="flex flex-col gap-4 mt-4">
                      {entries.map((entry, index) => (
                        <div
                          key={index}
                          className="border border-gray-200 bg-gray-50 rounded-xl p-4 flex flex-col md:flex-row justify-between items-start md:items-center shadow-sm"
                        >
                          <div>
                            <h2 className="text-lg font-semibold text-blue-800">{entry.title}</h2>
                            <p className="text-gray-700">{entry.subtitle}</p>
                            <p className="text-sm text-gray-500">
                              {new Date(entry.startDate).getFullYear()} -{new Date(entry.endDate).getFullYear()} 
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
                        <Plus size={18} /> Add Another project
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-8">
                      <p className="text-gray-500 mb-4">No project details added yet.</p>
                      <button
                        onClick={() =>{ setIsFormVisible(true)
                        }
                        }
                        className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
                      >
                        <Plus size={18} /> Add Your project Details
                      </button>
                    </div>
        )}
        </div>
      )}    
</div>
  )
}

export default Projects
