import React from "react";
import SaveModal from "../components/modals/SaveModal.jsx";
import { useState } from "react";
import { useParams } from "react-router";
import Template1 from "../components/templates/Template1";
import Container from "../components/Container";
import {
  Trash2Icon,
  Download,
  CloudHail,
  LoaderCircle,
  Save,
  ArrowRight,
  ArrowBigRight,
  ArrowBigRightDash,
  ArrowLeft,
} from "lucide-react";
import { api, deleteResume, updateResume } from "../utils/ApiList";
import { useNavigate } from "react-router";
import { toast } from "react-hot-toast";
import { useReactToPrint } from "react-to-print";
import { useRef } from "react";
import RenderResume from "../components/RenderResume";
import Preview from "../components/preview/Preview";
import { getResume } from "../utils/ApiList";
import { useEffect } from "react";
import {
  EducationForm,
  CertificateForm,
  PersonalInfoForm,
  ProjectForm,
  CourseForm,
  SkillForm,
  ExperienceForm,
  AchievementForm
} from "../components/forms/index.js";

import { saveResume } from "../utils/ApiList.js";
import {
  captureElementImage,
  dataUrlToFile,
  fixTailwindColors,
} from "../utils/helper.js";
import DeleteModal from "../components/modals/DeleteModal.jsx";

function ResumeCreationDashboard() {
  const [isLoading, setIsLoading] = useState(false);
  const [isPreviewModalOpen, setIsPrevModalOpen] = useState(false);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [isCurrentFormSubmitted, setCurrentFormSubmitted] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isContentChanged,setIsContentChanged]=useState(false);
  const navigate = useNavigate();
  const contentRef = useRef(null);
  const resumeRef = useRef(null);
  const [sections, setSections] = useState([]);
  const params = new useParams();
  const resumeId = params.id;
  const [isPersonalFormFilled, setPersonalFormFilled] = useState(false);

  const [resume, setResume] = useState({
    resumeName: "",
    personalInfo: {
      fullName: "",
      headline: "",
      email: "",
      phoneNumber: "",
      location: "",
      linkedIn: "",
      github: "",
      resumeImage:""
    },
    education: [],
    skills: [],
    courses: [],
    achievements: [],
    experience: [],
    certificates: [],
    projects: [],
    template:""
  });

  const [step, setStep] = useState(0);

  const openPreviewModal = () => {
    setIsPrevModalOpen(true);
  };

  const closePreviewModal = () => {
    setIsPrevModalOpen(false);
  };

  const fetchResumeData = async () => {
    const response = await getResume(resumeId);

    if (!response) {
      return;
    }

  
    setSections(response.template.sections);
    setResume({
      resumeName: response.resumeName || "newResume",
      personalInfo: {
        fullName: response.personalInfo.fullName || "",
        email: response.personalInfo.email || "",
        github: response.personalInfo.github || "",
        headline: response.personalInfo.headline || "",
        phoneNumber: response.personalInfo.phoneNumber || "",
        location: response.personalInfo.location || "",
        linkedIn: response.personalInfo.linkedIn || "",
        resumeImage:response.personalInfo.resumeImage || ""
      },
      education: response.education || [],
      experience: response.experience || [],
      certificates: response.certificates || [],
      courses: response.courses || [],
      achievements: response.achievements || [],
      projects: response.projects || [],
      skills: response.skills || [],
      achievements:response.achievements || [],
      templateComponent:response.template.componentName || ""
    });
  };

  useEffect(() => {
    fetchResumeData();
  }, []);

  const currentForm = sections[step];

  const handleBack = (e) => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const handleResumeNameChange = (e) => {
    setResume((prev) => ({ ...prev, resumeName: e.target.value }));
  };

  const takeScreenshot = async () => {
    try {
      console.log("taking screenshot");

      fixTailwindColors(resumeRef.current);
      const imageDataUrl = await captureElementImage(resumeRef.current);

      const thumbNailFile = dataUrlToFile(
        imageDataUrl,
        `resume-${resumeId}.png`
      );
      console.log(thumbNailFile);
      return thumbNailFile;
    } catch (error) {
      console.log(error);
    }
  };

  const updateResumeThumbnail = async () => {
    try {
      setIsLoading(true);
      const thumbnail = await takeScreenshot();
      console.log(thumbnail);
      const response = await saveResume(resumeId, thumbnail);

      console.log(response);
      if (response.status == 200) {
        toast.success(`resume saved successfully`, {
          position: "top-center",
          duration: 500,
        });
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message || " something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResumeUpdate = async () => {
    try {

      if(!isContentChanged)
      {
        if(step<sections.length-1)
        {
          setStep(step+1);
         
        }
        return;
      }
      setIsLoading(true);
   const response = await updateResume(resumeId, currentForm, resume);

      if (response.status == 200) {
        toast.success(`${currentForm} form saved successfully`, {
          position: "top-center",
          duration: 500,
        });


        if (step < sections.length - 1) {
          setStep(step + 1);
        }
       
        setIsContentChanged(false);
      }
    } catch (error) {
      toast.error(error.message || " something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResumeSave = async () => {
    try {
      setIsLoading(true);
      await updateResumeThumbnail();
      const formData = new FormData();
      formData.append("content", JSON.stringify(resume));

      console.log(formData);
      const response = await api.post(`/resumes/check/${resumeId}`, formData);

      if (response.status == 200) {
        toast.success("resume saved successfully", {
          position: "top-center",
          duration: 500,
        });
        setIsLoading(false);
        setIsSaveModalOpen(false);
        navigate("/home");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message || " something went wrong", {
        position: "top-center",
        duration: 500,
      });
      setIsLoading(false);
    }
  };

  const updateArrayItem = (array, index, newItem) => {
    setResume((prev) => {
      const updatedEntries = prev[array].map((item, i) =>
        index === i ? newItem : item
      );
      return { ...prev, [array]: updatedEntries };
    });
  };

  const addArrayItem = (array, newItem) => {
    setResume((prev) => ({ ...prev, [array]: [...prev[array], newItem] }));
  };

  const removeArrayItem = (array, index) => {
    const updatedEntries = resume[array].filter((_, i) => i !== index);
    setResume((prev) => ({ ...prev, [array]: updatedEntries }));
  };

  const handlePersonalInfoChange = (e) => {
    const { name, value } = e.target;
    setResume((prevState) => ({
      ...prevState,
      personalInfo: {
        ...prevState.personalInfo,
        [name]: value,
      },
    }));
  };

  const handleDeleteResume = async () => {
    try {
      setIsLoading(true);
      console.log("hello", resumeId);
      const response = await deleteResume(resumeId);

      if (response.status == 200) {
        navigate("/home");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  const handleDownload = useReactToPrint({
    contentRef: resumeRef,
    documentTitle: `${resume.resumeName || "resume" + new Date().getTime()}`,
    pageStyle: `@page { size: A4 portrait; `,
  });

  return (
    <Container className="mt-2">
      <Preview
        isOpen={isPreviewModalOpen}
        onClose={closePreviewModal}
        resumeData={resume}
        templateComp={resume.templateComponent}
        handleDownload={handleDownload}
      />
      <DeleteModal
        isLoading={isLoading}
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
        }}
        handleDelete={handleDeleteResume}
      />
      <SaveModal
        isLoading={isLoading}
        onNameChange={handleResumeNameChange}
        resumeName={resume.resumeName}
        handleSave={handleResumeSave}
        isOpen={isSaveModalOpen}
        onClose={() => {
          setIsSaveModalOpen(false);
        }}
      />

      <nav className=" flex justify-end items-center gap-4 pr-4   bg-green-50 p-2 ">
        
         <button onClick={()=>setIsSaveModalOpen(true)} className="flex text-lg items-center gap-1 bg-blue-500 text-white px-2 py-1.5   rounded-md  hover:bg-blue-600 transition-colors duration-300">
                <Save /> <p>Save </p>
               </button>
          <button
            className="bg-white items-center text-black font-semibold rounded-lg hover:bg-gray-100 text-xl py-1.5 px-2 flex gap-1"
            onClick={() => setIsDeleteModalOpen(true)}
          >
            <Trash2Icon />
            Delete
          </button>
          <button
            className="bg-white text-black font-semibold  rounded-lg hover:bg-gray-100 text-xl py-1.5 px-2"
            onClick={openPreviewModal}
          >
            Preview
          </button>
     
      </nav>

      <div className="grid h-full items-center md:grid-cols-2 grid-cols-1 gap-2 transition-all linear duration-200 justify-center  md:gap-4  my-2 ">
        {/* <SideMenu /> */}
        <div className="   h-full relative ">
          {}
          {/* {CurrentForm && (
            <CurrentForm
              data={resume.personalInfo}
              entries={resume[sections[step-1]]}
               removeArrayItem={removeArrayItem}
              updateArrayItem={updateArrayItem}
              addArrayItem={addArrayItem}
              onChange={handlePersonalInfoChange}
            />
          )} */}
          {currentForm == "personalInfo" && (
            <PersonalInfoForm
            resumeId={resumeId}
            changed={setIsContentChanged}
              data={resume.personalInfo}
              onSave={handleResumeUpdate}
              formFilled={setPersonalFormFilled}
              onChange={handlePersonalInfoChange}
            
            />
          )}

          {currentForm == "education" && (
            <EducationForm
              entries={resume.education}
                  changed={setIsContentChanged}
              removeArrayItem={removeArrayItem}
              updateArrayItem={updateArrayItem}
              addArrayItem={addArrayItem}
            />
          )}
          {currentForm == "experience" && (
            <ExperienceForm
              entries={resume.experience}
                  changed={setIsContentChanged}
              removeArrayItem={removeArrayItem}
              updateArrayItem={updateArrayItem}
              addArrayItem={addArrayItem}
            />
          )}

          {currentForm == "projects" && (
            <ProjectForm
              entries={resume.projects}
                  changed={setIsContentChanged}
              removeArrayItem={removeArrayItem}
              updateArrayItem={updateArrayItem}
              addArrayItem={addArrayItem}
            />
          )}
          {currentForm == "skills" && (
            <SkillForm
              entries={resume.skills}
                  changed={setIsContentChanged}
              removeArrayItem={removeArrayItem}
              updateArrayItem={updateArrayItem}
              addArrayItem={addArrayItem}
            />
          )}
          {currentForm == "certificates" && (
            <CertificateForm
              entries={resume.certificates}
                  changed={setIsContentChanged}
              removeArrayItem={removeArrayItem}
              updateArrayItem={updateArrayItem}
              addArrayItem={addArrayItem}
            />
          )}
          {currentForm == "courses" && (
            <CourseForm
              entries={resume.courses}
                  changed={setIsContentChanged}
              removeArrayItem={removeArrayItem}
              updateArrayItem={updateArrayItem}
              addArrayItem={addArrayItem}
            />
          )}
         
          {currentForm == "achievements" && (
            <AchievementForm
              entries={resume.achievements}
                  changed={setIsContentChanged}
              removeArrayItem={removeArrayItem}
              updateArrayItem={updateArrayItem}
              addArrayItem={addArrayItem}
            />
          )}
         

         
          {currentForm === "personalInfo" ? (
            <div></div>
          ) : (
            <Container className="w-full bg-white sticky row-start-2 col-start-1 ">
              <div className="flex justify-end mt-1 gap-3  p-2">
                <button
                  name="back"
                  hidden={step == 0 ? true : false}
                  onClick={handleBack}
                  className="bg-red-500 text-white px-4 py-2  flex items-center rounded-md mt-4 hover:bg-blue-600 transition-colors duration-300"
                >
               <ArrowLeft/>   Back
                </button>

              
                  <button
                    name="next"
                    // hidden={step != sections.length - 1 ? false : true}
                    onClick={step!=sections.length-1 ?handleResumeUpdate : ()=>setIsSaveModalOpen(true)}
                    className="bg-blue-500  flex items-center text-white px-4 py-2 gap-1  rounded-md mt-4 hover:bg-blue-600 transition-colors duration-300"
                  >
                   {step==sections.length-1 ? <><Save/> Save</> :<> {sections[step+1]}<ArrowRight/> </>}
                  </button>
             
                {/* {step != sections.length - 1 && (
                  <button
                    name="save and next"
                    onClick={
                      step != step.length - 1
                        ? handleResumeUpdate
                        : () => setIsSaveModalOpen(true)
                    }
                    disabled={isCurrentFormSubmitted ? true : false}
                    className="bg-blue-500 text-white px-4 py-2 disabled:bg-gray-400   rounded-md mt-4 hover:bg-blue-600 transition-colors duration-300"
                  >
                    {isLoading && (
                      <LoaderCircle className="animate-spin mx-auto" />
                    )}
                    <p>Save and Next</p>
                  </button>
                )} */}
               
              </div>
            </Container>
          )}
        </div>

        <div
          className="   h-[100vh] md:block overflow-auto overflow-y-scroll [scrollbar-width:none] [-ms-overflow-style:none] "
          ref={resumeRef}
        >
          {resume && (
            <RenderResume resumeData={resume} templateComp={resume.templateComponent} />
          )}
        </div>
      </div>
    </Container>
  );
}

export default ResumeCreationDashboard;
