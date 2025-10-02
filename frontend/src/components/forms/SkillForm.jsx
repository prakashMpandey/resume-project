import React from "react";
import { useState, useEffect } from "react";
import Input from "../Input";
import { Save, Plus, Pen, Delete } from "lucide-react";
function SkillForm({
  entries,
  addArrayItem,
  changed,
  updateArrayItem,
  removeArrayItem,
}) {
  const [skillData, setSkillData] = useState({
    skill: "",
    level: "",
    description: "",
  });

  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editIndex, setEditIndex] = useState(-1);

  const createNewEntry = () => {
    const newIndex = entries.length;
    addArrayItem("skills", skillData);
    setEditIndex(newIndex);
    setIsFormVisible(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

   changed(true);
    setSkillData((prev) => {
      const updated = { ...prev, [name]: value };
      return updated;
    });
  };

  const handleSave = () => {
    setEditIndex(-1);
    setIsFormVisible(false);
    setSkillData({
      skill: "",
      level: "",
      description: "",
    });
  };

  const handleDelete = () => {
    removeArrayItem("skills", editIndex);

    setSkillData({
      skill: "",
      level: "",
      description: "",
    });
    setEditIndex(-1);
    setIsFormVisible(false);
  };

  useEffect(() => {
    if (editIndex >= 0) {
      updateArrayItem("skills", editIndex, skillData);
    }
  }, [skillData]);

  const handleEdit = (entry, index) => {
    setEditIndex(index);
    setIsFormVisible(true);
    setSkillData(entry);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 max-w-2xl mx-auto">
      <h1 className="text-blue-700 font-bold text-3xl mb-6 text-center">
        Skills
      </h1>

      {isFormVisible ? (
        <div>
          <Input
            name="skill"
            placeholder={"enter the skill"}
            label="skill"
            type="text"
            value={skillData.skill}
            onChange={handleChange}
          />
          <div className="my-2">
            <label htmlFor="level">level</label>
            <select
              name="level"
              id="level"
              className="w-full border border-gray-300 rounded-md p-2 mt-1"
              value={skillData.level}
              onChange={handleChange}
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="expert">Expert</option>
            </select>
          </div>
          <div></div>

          <div className="flex gap-2 justify-end mt-4">
            <button
              onClick={handleSave}
              className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-700 transition"
            >
              <Save size={18} />{" "}
              {editIndex == entries.length - 1 ? "save" : "update"}
            </button>
            <button
              onClick={handleDelete}
              className="flex items-center gap-2 bg-gray-200 text-gray-700 px-5 py-2 rounded-lg shadow hover:bg-gray-300 transition"
            >
              Delete
            </button>
          </div>
        </div>
      ) : (
        <div className="">
          {entries.length > 0 ? (
            <div>
              <div className="grid grid-cols-2  md:grid-cols-3 gap-4">
                {entries.map((entry, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 bg-gray-50  text-gray-700 rounded-lg flex px-4 py-2 gap-2 items-center md:flex-row justify-between  md:items-center shadow-sm flex-1 "
                  >
                    <h1 className="capitalize text-lg font-[600]">
                      {entry.skill}
                    </h1>

                    <button
                      onClick={() => {
                        handleEdit(entry, index);
                      }}
                      className=""
                    >
                      <Pen />
                    </button>
                    {/* <button
                      className="text-red-600 bg-white p-2"
                      onClick={() => {
                      setEditIndex(index)
                      handleDelete()}}
                    >
                      <Delete />
                    </button> */}
                  </div>
                ))}
              </div>
             <div className="flex justify-end mt-2">
               <button
                onClick={createNewEntry}
                className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg mt-5 self-end hover:bg-green-700 transition"
              >
                <Plus size={18} /> Add Another skill
              </button>
             </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-8">
              <p className="text-gray-500 mb-4">No skills added yet.</p>
              <button
                onClick={createNewEntry}
                className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                <Plus size={18} /> Add Your skill Details
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default SkillForm;
