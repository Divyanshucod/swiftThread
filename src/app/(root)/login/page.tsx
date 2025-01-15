'use client'

import { useState, useEffect, PropsWithChildren } from 'react';
type prop = PropsWithChildren<{
  type:string

}>
export default function AuthPage({  type}:prop) {
  const [currentImage, setCurrentImage] = useState(0);
  const images = ["/image1.jpg", "/image2.jpg", "/image3.jpg"];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 10000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <div className="w-full max-w-4xl flex bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Left Section */}
        <div className="w-1/2 relative">
          <img
            src={images[currentImage]}
            alt="Slideshow"
            className="w-full h-full object-cover"
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
          <button className="absolute top-4 left-4 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700">
            Back to Website
          </button>
        </div>

        {/* Right Section */}
        <div className="w-1/2 p-8">
          <h2 className="text-2xl font-bold mb-4">
            {type === "login" ? "Login to your account" : "Create an account"}
          </h2>
          {type === "signup" && (
            <div className="flex space-x-4 mb-4">
              <input
                type="text"
                placeholder="First Name"
                className="w-1/2 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Last Name"
                className="w-1/2 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 mb-4 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 mb-4 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          {type === "signup" && (
            <div className="flex items-center mb-4">
              <input type="checkbox" id="terms" className="mr-2" />
              <label htmlFor="terms" className="text-sm">
                I agree to the <a href="#" className="text-blue-500 underline">Terms & Conditions</a>
              </label>
            </div>
          )}
          <button className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 mb-4">
            {type === "login" ? "Login" : "Create Account"}
          </button>

          <p className="text-center text-sm">
            {type === "login" ? (
              <>Don't have an account? <a href="/signup" className="text-blue-500 underline">Sign up</a></>
            ) : (
              <>Already have an account? <a href="/login" className="text-blue-500 underline">Log in</a></>
            )}
          </p>

          <div className="flex items-center my-4">
            <hr className="flex-grow border-t border-gray-300" />
            <span className="px-4 text-gray-500">Or register with</span>
            <hr className="flex-grow border-t border-gray-300" />
          </div>

          <div className="flex justify-center space-x-4">
            <button className="p-3 border rounded-lg flex items-center space-x-2 hover:bg-gray-100">
              <img src="/google-icon.png" alt="Google" className="w-5 h-5" />
              <span>Google</span>
            </button>
            <button className="p-3 border rounded-lg flex items-center space-x-2 hover:bg-gray-100">
              <img src="/apple-icon.png" alt="Apple" className="w-5 h-5" />
              <span>Apple</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
