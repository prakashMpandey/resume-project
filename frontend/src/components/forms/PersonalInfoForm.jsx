import React, { useEffect, useRef, useState } from "react";
import { ArrowRight, LoaderCircle, User } from "lucide-react";
import Input from "../Input";
import toast from "react-hot-toast";

import { useReactToPrint } from "react-to-print";
import { api } from "../../utils/ApiList";

const PersonalInfoForm = ({changed,resumeId, data, onChange,formFilled ,onSave}) => {
  const [errors, setErrors] = useState({});
  const [isLoading,setIsLoading]=useState(false);
  const [resumeImage,setResumeImage]=useState(data.resumeImage ||"");
  const { fullName, headline, email, phoneNumber, location, linkedIn, github } = data;
const photoRef=useRef(null)
  const validate = () => {
    const newErrors = {};
    if (!fullName.trim()) newErrors.fullName = "Full name is required";
    if (!headline.trim()) newErrors.headline = "Professional headline is required";
    if (!email.trim()) newErrors.email = "Email is required";
    if (!phoneNumber.trim()) newErrors.phoneNumber = "Phone number is required";
    if (!location.trim()) newErrors.location = "Location is required";
    return newErrors;
  };

  const handleChange=(e)=>{
    changed(true);
    const {name}=e.target
    onChange(e);
    setErrors((prev)=>({...prev,[name]:""}))
  }

  const handleSave = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error("Please fill all required fields", { position: "top-center", duration: 500 });
      return;
    }

    setErrors({});
    formFilled(true)
    onSave()

  };

  const handleFileChange=async(e)=>{

   try {
    
     setIsLoading(true)
 const file=e.target.files[0];

 if(!file)
 {
  return;
 }
 const formData=new FormData();
 formData.append("resumeImage",file)
 const response=await api.post(`/resumes/${resumeId}/resume-image`,formData,  { headers: { "Content-Type": "multipart/form-data" } });

 console.log(response)
 if(response.status===200)
 {
   setResumeImage(URL.createObjectURL(file));
 }

   } catch (error) {
    console.log("error",error)
    setIsLoading(false);
   }

   finally{

    setIsLoading(false)
     e.target.value=""
   }


  }
  const handlePhotoClick=()=>{
    photoRef.current.click();
  }
  
  return (
    <div className="max-w-3xl bg-white rounded-md shadow-md p-4">
      <div className="flex gap-3 border-b-[0.5px] border-gray-200">
        <User className="text-blue-500 text-2xl mb-2" />
        <h1 className="text-xl font-semibold">Personal Information</h1>
      </div>

      <form onSubmit={handleSave}>
        <div className="flex flex-col space-y-4 mt-2 p-2">
          <div className="flex flex-col-reverse md:flex-row items-center gap-2 justify-between ">
         <div className="w-full md:w-[70%]">
             <Input
            label="Full Name"
          className={" "}
            name="fullName"
            type="text"
            value={fullName}
            onChange={handleChange}
            placeholder="Enter full name"
          />
          {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}
         </div>

          <div className="w-32 h-32 rounded-full bg-gray-200" >
          {isLoading ? <div ><LoaderCircle size="20" className="animate-spin"/></div> :
          <img onClick={handlePhotoClick} src={resumeImage || "https://placehold.co/150"}  alt='profile' className="w-32 h-32 rounded-full object-cover border" />
          }
            <input ref={photoRef} onChange={handleFileChange} accept="image/*" type="file" hidden={true}  className={"order-first md:order-last"}/>
          </div>
          </div>

          <Input
            label="Professional Headline"
            
            name="headline"
            type="text"
            value={headline}
            onChange={handleChange}
            placeholder="Enter headline"
          />
          {errors.headline && <p className="text-red-500 text-sm">{errors.headline}</p>}
        </div>


        <div className="grid grid-cols-2 gap-4 p-2 mt-4">
         <div className="flex flex-col gap-1">
           <Input
            label="Email"
       
            type="email"
            name="email"
            value={email}
            
            onChange={handleChange}
            placeholder="Enter email address"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
         </div>

  <div className="flex flex-col gap-1">
          <Input
            label="Phone Number"
        
            type="tel"
            name="phoneNumber"
            value={phoneNumber}
            onChange={handleChange}
            placeholder="Enter phone number"
          />
          {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber}</p>}
          </div>

          <div className="flex flex-col gap-1">

          <Input
            label="Location"
               type="text"
            name="location"
            value={location}
            onChange={handleChange}
            placeholder="Enter location"
          />
          {errors.location && <p className="text-red-500 text-sm">{errors.location}</p>}
          </div>


          <Input
            label="LinkedIn"
            type="text"
            name="linkedIn"
            value={linkedIn}
            onChange={handleChange}
            placeholder="Enter LinkedIn profile"
          />

          <Input
            label="GitHub"
            type="text"
            name="github"
            value={github}
            onChange={handleChange}
            placeholder="Enter GitHub profile"
          />
        </div>

        <div className="flex justify-end mt-4">
          <button
            type="submit"
            className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-700 transition"
          >
             Next <ArrowRight/>
          </button>

        </div>
      </form>
    </div>
  );
};

export default PersonalInfoForm;
