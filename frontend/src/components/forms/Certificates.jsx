import React from 'react'
import { useState } from "react";
import Input from "../Input";
import { Pen, Plus, Save } from 'lucide-react';
import { Delete } from 'lucide-react';
import TextBox from '../TextBox'
import { Link as LinkIcon } from 'lucide-react' ;
import {Link } from "react-router-dom";
function Certificates({entries,setEntries}) {


    const [isFormVisible, setIsFormVisible] = useState(false);
      const [editIndex, setEditIndex] = useState(-1);
      
      const [certData, setCertData] = useState({
        certificate: "",
        issuer: "",
        date: "",
        description: "",
        link:""
      });

   
      const handleChange = (e) => {
    const { name, value } = e.target;
    setCertData({
      ...certData,
      [name]: value,
    });
  };
      const handleEdit = (entry, editIndex) => {
        setCertData(entry);
        setIsFormVisible(true);
        setEditIndex(editIndex);
      };

      const handleSave = () => {
        if (editIndex !== -1) {
            const updatedEntries = entries.map((entry, index) =>
                index === editIndex ? certData : entry
            );
            setEntries(updatedEntries);
            }
            else {
                setEntries(prev => [ ...prev,certData]);
            }

        setCertData({
            certificate: "",
            issuer: "",
            date: "",
            description: "",    
            link:""
        });
        setEditIndex(-1);
        setIsFormVisible(false);
        }
    
  return (

     <div className="bg-white rounded-2xl shadow-lg p-6 max-w-2xl mx-auto">
      <h1 className="text-blue-700 font-bold text-3xl mb-6 text-center">Certificates</h1>
      {isFormVisible ? (
        <div className="bg-blue-50 rounded-xl p-6 shadow-inner">
          <div className="flex flex-col gap-4">
            <Input
              label="certificate"
              name="certificate"
              value={certData.certificate}
              placeholder="Enter your certificate name"
              onChange={handleChange}
            />
            <Input
              label="issuer"
              name="issuer"
              value={certData.issuer}
              placeholder="issuer name"
              onChange={handleChange}
            />
            
            </div>
            <div>
                <Input
                    label="Certificate Link"
                    name="link"
                    value={certData.link}
                    type="text"
                    placeholder="Enter Certificate link"
                    onChange={handleChange}
                />
            </div>
            <div>
            <Input label={"date"}  />
              </div>
            <TextBox name="description" value={certData.description} label-={"Additional Information"} onChange={handleChange} placeholder={"add Additional Information"}/>
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
                  setCertData({
                    name: "",
                    issuer: "",
                    date: "",
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
       
      ) : (

        <div className="flex flex-col gap-4">

        {entries.length!==0 ? (
             <div className="flex flex-col gap-4 mt-4 w-full">
                      {entries.map((entry, index) => (
                        <div
                          key={index}
                          className="border border-gray-200 bg-gray-50 rounded-xl p-4 flex flex-col md:flex-row justify-between items-start md:items-center shadow-sm"
                        >
                          <div>
                            <div className='flex gap-4 items-center justify-between'>
                              <h2 className="text-lg font-semibold text-blue-800 hover:text-blue-900">{entry.certificate}</h2>
                             <a className='hover:text-blue-900' href={entry.link}>{entry.link}</a>
                              
                            </div>
                            <div className='flex justify-between gap-4 p-2'>
                              <p className="text-gray-700">{entry.issuer}</p>
                              <p className="text-gray-500 text-sm">{entry.date}</p>
                            </div>
                            
                           
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
                        <Plus size={18} /> Add Another certificate
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-8">
                      <p className="text-gray-500 mb-4">No certificate  added yet.</p>
                      <button
                        onClick={() =>{ setIsFormVisible(true)
                        }
                        }
                        className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
                      >
                        <Plus size={18} /> Add Your certificates
                      </button>
                    </div>
        )}
        </div>
      )}    
</div>
  )


    
  
  
}

export default Certificates
