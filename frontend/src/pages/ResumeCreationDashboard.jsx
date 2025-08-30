import React from 'react'
import SideMenu from '../components/SideMenu'
import PersonalInfoForm from '../components/forms/PersonalInfoForm'
import Preview from '../components/preview/Preview'
import Education from '../components/forms/Education'
import { useState } from 'react'
import { useEffect } from 'react'
import Experience from '../components/forms/Experience'
import Projects from '../components/forms/Projects'
import SkillForm from '../components/forms/SkillForm'
import Certificates from '../components/forms/Certificates'
import Course from '../components/forms/Course'
function ResumeCreationDashboard() {

    const [step,setStep] = useState(1);
    const [personalInfo,setPersonalInfo] = useState({
        fullName: '',
        headline: '',
        email: '',
        phoneNumber: '',
        location: '',
        linkedIn: '',
        github: ''
    });
    const [education, setEducation] = useState([]);
    const [experience, setExperience] = useState([]);
    const [projects, setProjects] = useState([]);
    const [skills, setSkills] = useState([]);
    const [certificates, setCertificates] = useState([]);
    const [courses, setCourses] = useState([]);

    const handlePersonalInfoChange = (e) => {
        const { name, value } = e.target;
        setPersonalInfo(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

  return (
     <div className="flex items-center flex-row gap-4 h-[calc(100vh-30px)] my-1   lg:my-5 xl:my-8">
     <SideMenu />
  <div className='  lg:min-w-xl max-w-lg relative '>


{step === 1 && <PersonalInfoForm data={personalInfo} onChange={handlePersonalInfoChange} />}
{step === 2 && <Education  entries={education} setEntries={setEducation}  />}
{step === 3 && <Experience  entries={experience} setEntries={setExperience}  />}
{step === 4 && <Projects  entries={projects} setEntries={setProjects}  />}
{step === 5 && <SkillForm  entries={skills} setEntries={setSkills}  />}
{step === 6 && <Certificates  entries={certificates} setEntries={setCertificates}  />}
{step === 7 && <Course  entries={courses} setEntries={setCourses}  />}
    
   <div className='flex justify-end mt-1  p-2'>
        <button onClick={()=>setStep((prev)=>prev+1)}  className='bg-red-500 text-white px-4 py-2   rounded-md mt-4 hover:bg-blue-600 transition-colors duration-300'>
          Save & Continue
        </button>
      </div>
  </div>
  <div className='p-2 hidden md:block  overflow-auto h-[calc(100vh-30px)]'>
    <Preview personalInfo={personalInfo} education={education}/>
    
  </div>

    </div>
  
  )
}

export default ResumeCreationDashboard
