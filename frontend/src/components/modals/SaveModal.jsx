import React from "react";
import { Loader, LoaderCircle, X } from "lucide-react";

function SaveModal({ isOpen, onClose, onNameChange, resumeName, handleSave ,isLoading}) {

  console.log(isOpen)
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.5)]">
      <div
        className="relative w-[90%] max-w-md rounded-2xl bg-white shadow-2xl p-6"
        onClick={(e) => e.stopPropagation()}
      >
    
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 transition"
          onClick={onClose}
        >
          <X size={24} />
        </button>

    
        <h2 className="mb-4 text-xl font-bold text-gray-800">Save Resume</h2>

      
        <div className="mb-6 flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-600">
            Enter the Resume Name
          </label>
          <input
            type="text"
            value={resumeName}
            onChange={onNameChange}
            className="rounded-lg border border-gray-300 bg-white p-2 text-gray-800 shadow-sm focus:border-blue-400 focus:ring-2 focus:ring-blue-300 outline-none transition"
          />
        </div>

      
        <div className="flex justify-end gap-3">
          <button
            className="rounded-lg bg-gray-200 px-4 py-2 font-semibold text-gray-700 hover:bg-gray-300 transition"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700 transition"
            onClick={handleSave}
          >
          {isLoading ? <LoaderCircle className="animate-spin"/> : <p> Save Changes</p>}
            
          </button>
        </div>
      </div>
    </div>
  );
}

export default SaveModal;
