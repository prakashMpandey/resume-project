import React from 'react'
import { useState } from "react";
import Input from "../Input";
import { Save ,Plus,Pen,Delete} from 'lucide-react';
function SkillForm({entries,setEntries}) {

  const [skillData, setSkillData] = useState({
    skill: "",
    level: "",
    description:""

  });

  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editIndex, setEditIndex] = useState(-1);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSkillData({
      ...skillData,
      [name]: value,
    });
  };

  const handleSave = () => {
    if (editIndex !== -1) {
      const updatedEntries = entries.map((entry, index) =>
        index === editIndex ? skillData : entry
      );
      setEntries(updatedEntries);
    }
    else{
      setEntries(prev => [ ...prev,skillData]);
    }
    setSkillData({
      skill: "",
      level: "",  
      description:""
    });
    setEditIndex(-1);
    setIsFormVisible(false);
   };

   const handleDelete = (index) => {
    const updatedEntries = entries.filter((_, i) => i !== index);
    setEntries(updatedEntries);
   }

  return (
     <div className="bg-white rounded-2xl shadow-lg p-6 max-w-2xl mx-auto">
      <h1 className="text-blue-700 font-bold text-3xl mb-6 text-center">Skills</h1>

{isFormVisible ? (
      <div>
        <Input name="skill" placeholder={"enter the skill"} label="skill" type="text" value={skillData.skill} onChange={handleChange} />
        <div className='my-2'>
          <label htmlFor="level">Label</label>
          <select name="level" id="level" className='w-full border border-gray-300 rounded-md p-2 mt-1' value={skillData.level} onChange={handleChange}>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="expert">Expert</option>
          </select>
        </div>
       <div>
        <div>
          <label htmlFor="description">Description</label>
        <textarea className='w-full py-2 mt-1 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500' placeholder='enter the description' name="description" value={skillData.description} id="" onChange={handleChange}></textarea>
        </div>
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
    
      </div>) :(
        <div className="">
        {
          entries.length>0 ? (
            <div className='flex flex-col gap-2'>
          {
           entries.map((entry,index)=>(

           <div key={index}
                           className="border border-gray-200 bg-gray-50 rounded-lg p-4 flex  md:flex-row justify-between items-start md:items-center shadow-sm"
                        >
                        <div className='flex flex-col gap-1'>
                           <h1 className='capitalize text-lg font-[600]'>{entry.skill}</h1>
                         </div>
                          <div className='flex gap-2'>
                            <button onClick={()=>{
                            setEditIndex(index);
                            setSkillData(entry);
                            setIsFormVisible(true);
                          

                            handleEdit}}  className=''><Pen/></button>
                            <button className='text-red-600 bg-white p-2' onClick={()=>handleDelete(index)}
                     >
                            <Delete/>
                            </button>
                          </div>
                        </div>

           ))
          }
          <button
                                 onClick={() => setIsFormVisible(true)}
                                 className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg mt-4 self-end hover:bg-green-700 transition"
                               >
                                 <Plus size={18} /> Add Another project
                               </button>
        </div>  
          ) :(
                    <div className="flex flex-col items-center justify-center py-8">
                      <p className="text-gray-500 mb-4">No skills added yet.</p>
                      <button
                        onClick={() =>{ setIsFormVisible(true)
                        }
                        }
                        className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
                      >
                        <Plus size={18} /> Add Your skill Details
                      </button>
                    </div>
        )
        }
        </div>
      )}

      </div>
  )
}

export default SkillForm
