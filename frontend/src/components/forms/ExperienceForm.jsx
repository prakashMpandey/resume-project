import React from 'react'
import { useState } from "react";
import { Pen, Plus, Save } from 'lucide-react';
import Input from "../Input";
import toast from 'react-hot-toast';
function ExperienceForm({changed,entries,addArrayItem,updateArrayItem,removeArrayItem}) {

    
const [isFormVisible, setIsFormVisible] = useState(false);
  const [editIndex, setEditIndex] = useState(-1);
  const [errors,setErrors]=useState({});
  const [ExperienceData, setExperienceData] = useState({
    title: "",
    employer: "",
    startDate: "",
    endDate: "",
    location: "",
    description: "",
  });

   
  const createNewEntry=()=>{
    const newIndex=entries.length;
   addArrayItem("experience",{
    title: "",
    employer: "",
    startDate: "",
    endDate:"",
    location: "",
    description: "",})
  setIsFormVisible(true);
  setEditIndex(newIndex)

  };
  const handleExperienceChange=(e)=>{
   const {name,value}=e.target;
  changed(true);
   console.log(name,value)
   setExperienceData((prev)=>{
    const updated={...prev,[name]:value}

      setErrors((prev) => ({ ...prev, [name]: "" }));
    updateArrayItem("experience",editIndex,updated)
    return updated;
  })

   
  }

  const handleSave=()=>{

    const newErrors={};

 if (!(ExperienceData.title || "").trim())  {newErrors.title = "Job title is required";}
if (!(ExperienceData.employer || "").trim()) newErrors.employer = "Employer is required";
if (!(ExperienceData.location || "").trim()) newErrors.location = "Location is required";

    if( Object.keys(newErrors).length > 0)
    {
      setErrors(newErrors);
      toast.error("fill all the required fields");
      return;
    }
    setIsFormVisible(false);
    setEditIndex(-1);
    setExperienceData({
    title: "",
    employer: "",
    startDate: "",
    endDate:"",
    location: "",
    description: "",})
  }

  const handleDelete=()=>{
    
    removeArrayItem("experience",editIndex);
    
    setExperienceData({
      school: "",
    startDate: "",
    endDate: "",
    degree:"",
    location: "",
    description: ""
    })
    setEditIndex(-1)
    setIsFormVisible(false)

  }

  const handleEdit=(entry,index)=>{
    setEditIndex(index)
    setIsFormVisible(true)
    setExperienceData(entry)
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 max-w-2xl mx-auto">
      <h1 className="text-blue-700 font-bold text-3xl mb-6 text-center">Experience</h1>
      {isFormVisible ? (
        <div className="bg-blue-50 rounded-xl p-6 shadow-inner">
          <div className="flex flex-col gap-4">
            <Input
              label="job Title"
              name="title"
              value={ExperienceData.title}
              placeholder="Enter your job title"
              onChange={handleExperienceChange}
            />
             {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
            <Input
              label="Employer"
              name="employer"
              value={ExperienceData.employer}
              placeholder="Enter your employer"
              onChange={handleExperienceChange}
            />
             {errors.employer && <p className="text-red-500 text-sm mt-1">{errors.employer}</p>}
            <div className="grid lg:grid-cols-3 grid-cols-1 gap-4">
              <Input
                label="Start Date"
                name="startDate"
                value={ExperienceData.startDate}
                type="date"
                onChange={handleExperienceChange}
              />
              <Input
                label="End Date"
                name="endDate"
                value={ExperienceData.endDate}
                type="date"
                onChange={handleExperienceChange}
              />
              <Input
                label="Location"
                name="location"
                value={ExperienceData.location}
                placeholder="City, State, Country"
                onChange={handleExperienceChange}
              />
                 {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
            </div>
            <div className="flex flex-col gap-2 mt-2">
              <label className="text-md font-medium">Description</label>
              <textarea
                value={ExperienceData.description}
                name="description"
                onChange={handleExperienceChange}
                className="py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="3"
                placeholder="Describe your Experience, achievements, etc."
              ></textarea>
            </div>
            <div className="flex gap-2 justify-end mt-4">
              <button
                onClick={handleSave}
                className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-700 transition"
              >
                <Save size={18} /> {editIndex === entries.length-1 ? "save" : "update"}
              </button>
              <button
                onClick= {handleDelete}
                className="flex items-center gap-2 bg-gray-200 text-gray-700 px-5 py-2 rounded-lg shadow hover:bg-gray-300 transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ) :
       entries.length > 0 ? (
        <div className="flex flex-col gap-4 mt-4">
          {entries.map((entry, index) => (
            <div
              key={index}
              className="border border-gray-200 bg-gray-50 rounded-xl p-4 flex flex-col md:flex-row justify-between items-start md:items-center shadow-sm"
            >
              <div>
                <h2 className="text-lg font-semibold text-blue-800">{entry.title}</h2>
                <p className="text-gray-700">{entry.employer}</p>
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
            onClick={createNewEntry}
            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg mt-4 self-end hover:bg-green-700 transition"
          >
            <Plus size={18} /> Add Another Experience
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-8">
          <p className="text-gray-500 mb-4">No Experience details added yet.</p>
          <button
            onClick={ createNewEntry
            }
            className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            <Plus size={18} /> Add Your Experience Details
          </button>
        </div>
      )}
    </div>
  
  )
}

export default ExperienceForm
