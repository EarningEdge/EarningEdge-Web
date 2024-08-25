import React from "react";

type Props = {};

const UserDetails = (props: Props) => {
  const handleDetailsSubmit = () => {


    window.location.href = "/dashboard";
  };

  return (
    <div className="bg-gray-900 min-h-svh flex items-end p-5">
      <div className="flex flex-col text-white gap-3 mb-10 w-full">
        <h1 className="text-5xl">
          Create an
          <br /> <b>Account</b>
        </h1>
        <p>First name</p>
        <input
          type="text"
          className="p-3 bg-transparent text-white text-xl border-2 border-white rounded-md w-full"
          placeholder="name@company.com"
        />
        <p>Last name</p>
        <input
          type="text"
          className="p-3 bg-transparent text-white text-xl border-2 border-white rounded-md w-full"
          placeholder="name@company.com"
        />
        <p>Password</p>
        <input
          type="password"
          className="p-3 bg-transparent text-white text-xl border-2 border-white rounded-md w-full"
          placeholder="name@company.com"
        />
        <p>Confirm password</p>
        <input
          type="password"
          className="p-3 bg-transparent text-white text-xl border-2 border-white rounded-md w-full"
          placeholder="name@company.com"
        />
        <button
          className="text-xl rounded-md font-semibold bg-white text-black p-3"
          onClick={handleDetailsSubmit}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UserDetails;
