import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addEduInfo } from "../features/formSlice";
import Input from "./Input";
function Education({entries, saveEntry}) {
  const [educationData, setEducationData] = useState({
    degree: "",
    school: "",
    startDate: "",
    endDate: "",
    location: "",
    description: "",
  });

  console.log("education", entries);

  const dispatch = useDispatch();

  const handleEducationChange = (e) => {
    const { name, value } = e.target;

    console.log(name, value);
    setEducationData({
      ...educationData,
      [name]: value,
    });

    dispatch(addEduInfo(educationData));


  };
  const educationForm=()=>{
    <div>
        <div className="flex flex-col gap-4 mt-4">
          <Input
            label="degree"
            name={"degree"}
            value={educationData.degree}
            placeholder={"enter the degree"}
            onChange={handleEducationChange}
          />
          <Input
            label="school"
            name={"school"}
            value={educationData.school}
            placeholder={"enter school"}
            onChange={handleEducationChange}
          />
          {/* 
// dates and all */}
          <div className="grid lg:grid-cols-3 grid-cols-1 gap-4">
            <Input
              label="start date"
              name={"startDate"}
              value={educationData.startDate}
              type="date"
              onChange={handleEducationChange}
            />
            <Input
              label="End date"
               name={"EndDate"}
              value={educationData.endDate}
              type="date"
              onChange={handleEducationChange}
            />
            <Input
              label="Location"
               name={"location"}
              value={educationData.location}
              placeholder={"city, state, country"}
              onChange={handleEducationChange}
            />
          </div>

          <div className="flex flex-col gap-2 mt-4">
            <label className="text-md font-medium">Description</label>
            <textarea
              value={educationData.description}
              name={"description"}
              onChange={handleEducationChange}
              className="py-2 px-4   border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
              placeholder="Enter your description here"
            ></textarea>
          </div>
        </div>
      </div>
  }

  return (
    <div className=" bg-white rounded-md shadow-md p-4">
      <div>
        <h1 className="text-gray-900 font-bold text-2xl">Education</h1>
      </div>
      
      <div className="flex flex-col gap-4 mt-4">
      {
        entries.map((entry,index)=>(
          <div key={index} className="border border-gray-400 p-2 rounded-md flex justify-between items-center">
            <div>
              <h2 className="text-lg font-semibold">{entry.degree}</h2>
            <p className="text-gray-500">{entry.school}</p>
            </div>
            <div className="">
            <button className="bg-red-400 p-2 text-white">Edit</button>

            </div>
          </div>
        ))
      }
      </div>

      
    </div>
  );
}

export default Education;
