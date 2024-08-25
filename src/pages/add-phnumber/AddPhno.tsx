import React from "react";

type Props = {};

const AddPhno = (props: Props) => {
    const handleSubmitPhno = () => {


        window.location.href = "/confirm-phno";
    } 
  return (
    <div className="bg-gray-900 min-h-svh flex items-end p-5">
      <div className="flex flex-col text-white gap-3 mb-10 w-full">
        <h1 className="text-5xl">
          Create an
          <br /> <b>Account</b>
        </h1>
        <p>Phone number</p>
        <div className="flex gap-2">
          <input type="text" value={"+91"} className="p-3 bg-transparent text-white text-xl border-2 border-white rounded-md w-16" readOnly/>
          <input
            type="number"
            className="p-3 bg-transparent text-white text-xl border-2 border-white rounded-md w-full"
            placeholder="Ph.no"
          />
        </div>
        <button className="text-xl rounded-md font-semibold bg-white text-black p-3" onClick={handleSubmitPhno}>
          Next
        </button>
      </div>
    </div>
  );
};

export default AddPhno;
