import React, { useEffect, useState, useRef } from 'react'
import { User, GraduationCap, Brain, BriefcaseBusiness, FolderOpen, FileBadge, LibraryBig } from "lucide-react"

function SideMenu() {
  const [isHidden, setIsHidden] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0); 


  const options = [
    { icon: <User />, name: "Personal Details" },
    { icon: <GraduationCap />, name: "Skills" },
    { icon: <Brain />, name: "Education" },
    { icon: <BriefcaseBusiness />, name: "Professional Experience" },
    { icon: <FolderOpen />, name: "Projects" },
    { icon: <FileBadge />, name: "Certificates" },
    { icon: <LibraryBig />, name: "Courses" },
  ];

  return (
    <div className='bg-white/10 transition-all duration-300 backdrop-blur-md shadow-md border-white/20 rounded-lg transparent p-4 text-black'>
      <div
        className='flex flex-col gap-4 items-center ease-in-out transition-all duration-500'
        onMouseEnter={() => setIsHidden(false)}
        onMouseLeave={() => setIsHidden(true)}
      >
        {options.map((option, idx) => (
          <div
            key={option.name}
            onClick={() => setActiveIndex(idx)}
            className={`flex w-full p-4 rounded-2xl items-center justify-start gap-2 cursor-pointer transition-all duration-300
              ${activeIndex === idx ? 'bg-blue-500' : 'bg-white'}
              hover:bg-blue-100`}
          >
            <div className={`text-2xl transition-colors duration-200 ${activeIndex === idx ? 'text-white' : 'text-blue-500'}`}>
              {option.icon}
            </div>
            {!isHidden && (
              <div className="text-gray-900 font-semibold text-lg transition-all duration-300">
                {option.name}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default SideMenu
