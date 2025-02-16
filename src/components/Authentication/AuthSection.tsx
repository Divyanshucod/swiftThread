"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, PropsWithChildren } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useRouter } from "next/navigation";

type Prop = PropsWithChildren<{
  type: string;
}>;

export default function AuthSection({ type }: Prop) {
  const [currentImage, setCurrentImage] = React.useState<number>(0);
  const [disableButton, setDisableButton] = React.useState<boolean>(false);
  const [isVendor,setIsVendor] = React.useState<boolean>(false)
  const router = useRouter()
  const images = [
    "/login_kids.jpg",
    "/login_pant_shirt.jpg",
    "/login_woman.jpg",
  ];

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      firstName:
        type === "/signup"
          ? Yup.string().required("First Name is required")
          : Yup.string(),
      lastName:
        type === "/signup"
          ? Yup.string().required("Last Name is required")
          : Yup.string(),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onSubmit: async (values) => {
      try {
        setDisableButton(true)
        if (type === "/signup") {
           const response = await axios.post('/api/users/signup',{...values, isVendor:isVendor})
           toast.success(response.data.message)
            router.push('/login')
        }
        else{
          const response = await axios.post('/api/users/login',{...values, isVendor:isVendor})
          toast.success(response.data.message)
          router.push('/')
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        if(error.status !== 500){
          return toast.error(error.response.data.message);
         }
        toast.error(`Error: ${error.message}`);
      }
     finally {
      setDisableButton(false); // Re-enable the button after submission
    }
    },
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 10000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <ToastContainer />
      <div className="w-full max-w-4xl flex bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Left Section */}
        <div className="w-1/2 relative">
          <Image
            src={images[currentImage]}
            alt="Slideshow"
            className="w-full h-full object-cover"
            width={500}
            height={500}
          />
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {images.map((_, index) => (
              <span
                key={index}
                className={`block w-3 h-3 rounded-full ${
                  index === currentImage ? "bg-blue-500" : "bg-gray-300"
                }`}
              ></span>
            ))}
          </div>
          <Link
            href="/"
            className="absolute top-4 left-4 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700"
          >
            Back to Website
          </Link>
        </div>

        {/* Right Section */}
        <div className="w-1/2 p-8">
          <h2 className="text-2xl font-bold mb-4">
            {type === "/login" ? "Login to your account" : "Create an account"}
          </h2>
          <form onSubmit={formik.handleSubmit}>
            {type === "/signup" && (
              <div className="flex space-x-4 mb-4">
                <div>
                  <input
                    type="text"
                    placeholder="First Name"
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    {...formik.getFieldProps("firstName")}
                  />
                  {formik.touched.firstName && formik.errors.firstName && (
                    <div className="text-red-500 text-sm">
                      {formik.errors.firstName}
                    </div>
                  )}
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    {...formik.getFieldProps("lastName")}
                  />
                  {formik.touched.lastName && formik.errors.lastName && (
                    <div className="text-red-500 text-sm">
                      {formik.errors.lastName}
                    </div>
                  )}
                </div>
              </div>
            )}
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 mb-4 border rounded-lg focus:ring-2 focus:ring-blue-500"
              {...formik.getFieldProps("email")}
            />
            {formik.touched.email && formik.errors.email && (
              <div className="text-red-500 text-sm">{formik.errors.email}</div>
            )}

            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 mb-4 border rounded-lg focus:ring-2 focus:ring-blue-500"
              {...formik.getFieldProps("password")}
            />
            {formik.touched.password && formik.errors.password && (
              <div className="text-red-500 text-sm">
                {formik.errors.password}
              </div>
            )}

            {type === "/signup" && (
              <div className="flex items-center mb-4">
                <input type="checkbox" id="terms" className="mr-2" />
                <label htmlFor="terms" className="text-sm">
                  I agree to the{" "}
                  <a href="#" className="text-blue-500 underline">
                    Terms & Conditions
                  </a>
                </label>
              </div>
            )}
            <div className="flex justify-between gap-3">
               <div onClick ={()=> setIsVendor(!isVendor)} className={`w-full p-3 rounded-lg flex justify-center items-center mb-4 ${!isVendor ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-white text-black border border-slate-800'}`}>
                 User
               </div>
               <div onClick = {()=> setIsVendor(!isVendor)} className={`w-full p-3 rounded-lg flex justify-center items-center mb-4 ${isVendor ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-white text-black border border-slate-800'}`}>
                  Vendor
               </div>
            </div>
            <button
              type="submit"
              className={`w-full p-3 rounded-lg mb-4 ${
                formik.isValid && formik.dirty && !disableButton
                  ? "bg-blue-500 text-white hover:bg-blue-600"
                  : "bg-gray-400 text-gray-200 cursor-not-allowed"
              }`}
              disabled={!(formik.isValid && formik.dirty) || disableButton}
            >
              {disableButton
                ? "Processing..."
                : type === "/login"
                ? "Login"
                : "Create Account"}
            </button>
          </form>

          <p className="text-center text-sm">
            {type === "/login" ? (
              <>
                Don&apos;t have an account?{" "}
                <a href="/signup" className="text-blue-500 underline">
                  Sign up
                </a>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <a href="/login" className="text-blue-500 underline">
                  Log in
                </a>
              </>
            )}
          </p>
          <div className="flex items-center my-4">
            <hr className="flex-grow border-t border-gray-300" />
            <span className="px-4 text-gray-500">Or register with</span>
            <hr className="flex-grow border-t border-gray-300" />
          </div>
          <div className="flex justify-center space-x-4">
            <button className="p-3 border rounded-lg flex items-center space-x-2 hover:bg-gray-100">
              <Image
                src="/search.png"
                alt="Google"
                className="w-5 h-5"
                width={100}
                height={100}
              />
              <span>Google</span>
            </button>
            <button className="p-3 border rounded-lg flex items-center space-x-2 hover:bg-gray-100">
              <Image
                src="/apple.png"
                alt="Apple"
                className="w-5 h-5"
                width={100}
                height={100}
              />
              <span>Apple</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
