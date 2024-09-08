import { Link, useSearchParams } from "react-router-dom";
import Beam from "../../../components/aceternity/Beam";
import { useEffect } from "react";

const Home = () => {
  const [searchParams] = useSearchParams();
  const inviteCode = searchParams.get('inviteCode');
  const username = searchParams.get('username');
  useEffect(()=>{
    localStorage.clear()
    if(inviteCode && username){
      localStorage.setItem("inviteCode",inviteCode)
      localStorage.setItem("refferalUserName",username)
    }
  },[])
  return (
    <div className="bg-gray-900 min-h-screen flex items-end p-5 auth relative">
      <div className=" h-[90vh] w-full dark:bg-black bg-black  dark:bg-dot-white/[0.2] bg-dot-white/[0.2] relative flex items-end justify-center">
        <div className="absolute top-0">
          <div className="flex  flex-col w-fit mx-auto p-3 items-center relative ">
            <Beam className="top-0 left-0" />
            <Beam className="top-0 right-0" />
            <Beam className="bottom-0 left-0" />
            <Beam className="bottom-0 right-0" />
            <img className=" rounded-full mix-blend-lighten top-0 w-72" src="/logo.png" />
          </div>
        </div>

        <div className="flex flex-col text-white gap-3 mb-10 z-10">
          <h1 className="text-3xl font-thin">
            Welcome to <br />
            <b className="text-4xl">Earning Edge</b>
          </h1>
          <p className="text-md  text-slate-300 font-light">
            Empowering retail investor with our unique live mentorship and hand
            holding support
          </p>
          <Link
            className="text-xl rounded-md font-light p-3 border text-center border-white bg-black hover:bg-white hover:text-black duration-500"
            to={"/signup"}
          >
            Create Account
          </Link>
          <Link
            to={"/login"}
            className="text-xl rounded-md font-light bg-white border text-black p-3 text-center hover:bg-black hover:border-white  hover:text-white duration-500"
          >
            Login
          </Link>
        </div>
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      </div>
    </div>
  );
};

export default Home;
