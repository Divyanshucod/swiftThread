'use client'

import React, { useState } from "react";

interface DeleteProductWarningProps {
  productName: string;
  setdeleteWarVisible :React.Dispatch<React.SetStateAction<boolean>>; 
  id:string
}

const DeleteProductWarning: React.FC<DeleteProductWarningProps> = ({ productName,setdeleteWarVisible, id }) => {
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (e.target.value !== productName) {
      setError("Product name does not match.");
    } else {
      setError("");
    }
  };
  const handleConfirmation = ()=>{
    //TODO : call the backend to delete the product via using _id of that
    setdeleteWarVisible(false)
  }
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="p-4 bg-white shadow rounded-lg w-96">
        <h2 className="text-xl font-bold mb-4">Warning</h2>
        <p>To delete the {<b>productName</b>}, please enter the product name below:</p>
        <input
          type="text"
          placeholder="Enter product name"
          value={inputValue}
          onChange={handleChange}
          className="w-full p-2 border rounded mt-2"
        />
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        <div className="flex justify-end gap-2 mt-4">
          <button onClick={()  => setdeleteWarVisible(false)} className="p-2 bg-gray-300 text-black rounded">Cancel</button>
          <button 
            onClick={handleConfirmation} 
            className="p-2 bg-red-500 text-white rounded disabled:opacity-50" 
            disabled={inputValue !== productName}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteProductWarning;