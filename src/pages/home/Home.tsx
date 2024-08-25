import React from "react";

type Props = {};

const Home = (props: Props) => {
  return (
    <div className="bg-gray-900 min-h-svh flex items-end p-5">
      <div className="flex flex-col text-white gap-3 mb-10">
        <h1 className="text-5xl">
          Welcome to <br />
          <b>Earning Edge</b>
        </h1>
        <p>
          Empowering Traders, Enhancing Strategies - Your Success Starts Here
        </p>
        <button
          className="text-xl rounded-md font-semibold p-3 border-2 border-white"
          onClick={() => {
            window.location.href = "/signup";
          }}
        >
          Create Account
        </button>
        <button 
        className="text-xl rounded-md font-semibold bg-white text-black p-3"
        onClick={()=>{window.location.href = "/login"}}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Home;
