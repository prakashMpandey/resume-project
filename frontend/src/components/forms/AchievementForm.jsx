import React, { useState } from "react";
import { Pen, Plus, Save } from "lucide-react";
import Input from "../Input";
import toast from "react-hot-toast";

function AchievementForm({changed, entries, addArrayItem, updateArrayItem, removeArrayItem }) {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editIndex, setEditIndex] = useState(-1);
  const [errors, setErrors] = useState({});

  const [achievementData, setAchievementData] = useState({
    title: "",
    issuer: "",
    date: "",
    link: "",
  });

  
  const createNewEntry = () => {
    const newIndex = entries.length;
    addArrayItem("achievements", achievementData);
    setIsFormVisible(true);
    setEditIndex(newIndex);
  };

 
  const handleAchievementChange = (e) => {
      changed(true);
    const { name, value } = e.target;
    setAchievementData((prev) => {
      const updated = { ...prev, [name]: value };
      if (editIndex !== -1) updateArrayItem("achievements", editIndex, updated);
      return updated;
    });

    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // Save or update
  const handleSave = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!achievementData.title.trim()) newErrors.title = "Title is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("Please fill all required fields", { position: "top-center", duration: 500 });
      return;
    }

    setErrors({});
    setIsFormVisible(false);
    setEditIndex(-1);
    setAchievementData({
      title: "",
      organization: "",
      date: "",
      description: "",
      link: "",
    });
  };

  // Delete
  const handleDelete = () => {
    if (editIndex !== -1) removeArrayItem("achievements", editIndex);

    setAchievementData({
      title: "",
      organization: "",
      date: "",
      description: "",
      link: "",
    });
    setEditIndex(-1);
    setIsFormVisible(false);
  };

  // Edit
  const handleEdit = (entry, index) => {
    setEditIndex(index);
    setIsFormVisible(true);
    setAchievementData(entry);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 max-w-2xl mx-auto">
      <h1 className="text-blue-700 font-bold text-3xl mb-6 text-center">Achievements</h1>

      {isFormVisible ? (
        <form>
          <div className="bg-blue-50 rounded-xl p-6 shadow-inner flex flex-col gap-4">
            <Input
              label="Achievement Title"
              name="title"
              value={achievementData.title}
              placeholder="e.g. Winner - Hackathon 2024"
              onChange={handleAchievementChange}
            />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}

            <Input
              label="Organization / Issuer"
              name="issuer"
              value={achievementData.issuer}
              placeholder="e.g. Google, College Fest"
              onChange={handleAchievementChange}
            />

            <Input
              label="Date"
              name="year"
              type="date"
              value={achievementData.year}
              onChange={handleAchievementChange}
            />

            <Input
              label="Link (Optional)"
              name="link"
              type="url"
              value={achievementData.link}
              placeholder="https://..."
              onChange={handleAchievementChange}
            />

            <div className="flex gap-2 justify-end mt-4">
              <button
                type="submit"
                onClick={handleSave}
                className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-700 transition"
              >
                <Save size={18} /> Save
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
                <h2 className="text-lg font-semibold text-blue-800">{entry.title || "New Achievement"}</h2>
                {entry.issuer && <p className="text-gray-700">{entry.issuer}</p>}
                <p className="text-sm text-gray-500">
                  {entry.year ? new Date(entry.year).toLocaleDateString("en-US", { month: "short", year: "numeric" }) : ""}
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
            <Plus size={18} /> Add Another Achievement
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-8">
          <p className="text-gray-500 mb-4">No achievements added yet.</p>
          <button
            onClick={createNewEntry}
            className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            <Plus size={18} /> Add Your Achievements
          </button>
        </div>
      )}
    </div>
  );
}

export default AchievementForm;
