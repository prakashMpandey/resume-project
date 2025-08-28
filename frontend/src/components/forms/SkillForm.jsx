import React from 'react'
import { useState } from "react";
function SkillForm({entries,setEntries}) {

  const [data, setData] = useState({
    skill: "",
    level: "",
    description:""

  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  return (
     <div className="bg-white rounded-2xl shadow-lg p-6 max-w-2xl mx-auto">
      <h1 className="text-blue-700 font-bold text-3xl mb-6 text-center">Skills</h1>

      <div>
        <Input></Input>
        <Input></Input>
        <textarea></textarea>

          
      </div>

      </div>
  )
}

export default SkillForm
