import React from "react";
import { useState } from "react";
import { X } from "lucide-react";
import Input from "./Input";
import PasswordInput from "./PasswordInput";
import { signUpUser } from "../utils/ApiList";
import { toast } from "react-hot-toast";
function SignUpForm({ closeAuthModal, switchAuthType }) {
  const [signUpData, setSignUpData] = useState({
    email: "",
    username: "",
    password: "",
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignUpData({ ...signUpData, [name]: value });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      await toast.promise(
        signUpUser(signUpData).then((res) => {
          if (!res.success) {
            throw new Error(res.message);
          }
          return res;
        }),
        {
          loading: "loading...",
          success: (res) => res.message,
        }
      );
    } catch (error) {
      toast.error(error.message);
    } finally {
      setSignUpData({
        username: "",
        email: "",
        password: "",
      });
      closeAuthModal();
    }
  };
  return (
    <div className="bg-white  relative p-8 rounded-lg shadow-lg min-w-[320px]">
      <div>
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
      </div>
      <div>
        <button onClick={closeAuthModal}>
          <X className="w-5 h-6  font-bold absolute top-2 right-3 text-gray-900 hover:text-blue-600 " />
        </button>
      </div>
      <form action="" onSubmit={handleSubmit}>
        <Input
          required={true}
          type="text"
          label={"username"}
          value={signUpData.username}
          name="username"
          onChange={handleChange}
          placeholder="Enter your  username"
          className="border-2 border-gray-300 rounded-md p-2 w-full mb-4"
        />
        <Input
          required={true}
          type="text"
          label={"email"}
          value={signUpData.email}
          name="email"
          onChange={handleChange}
          placeholder="Enter your email "
          className="border-2 border-gray-300 rounded-md p-2 w-full mb-4"
        />

        <PasswordInput
       
          value={signUpData.password}
          name="password"
          onChange={handleChange}
          placeholder="Enter your password"
          className="border-2 border-gray-300 rounded-md p-2 w-full mb-4"
        />
        <button    className="bg-blue-500 text-white p-2 rounded-md w-full hover:bg-blue-600">
          Sign In
        </button>
      </form>
      <div>
        <p className="text-sm mt-4">
          Already Have an Account ?
          <span className="text-blue-500 cursor-pointer">
            <button onClick={() => switchAuthType("signin")}>Sign in</button>
          </span>
        </p>
      </div>
    </div>
  );
}

export default SignUpForm;
