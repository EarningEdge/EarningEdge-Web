import { Link } from "react-router-dom";
const Home = () => {
  return (
    <div className="bg-gray-900 min-h-svh flex items-end p-5 auth relative">
      <div className=" h-[90vh] w-full dark:bg-black bg-black  dark:bg-dot-white/[0.2] bg-dot-white/[0.2] relative flex items-end justify-center">
        <img className=" absolute top-0 w-72" src="/logo.png" />
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
            className="text-xl rounded-md font-semibold p-3 border text-center border-white bg-black"
            to={"/signup"}
          >
            Create Account
          </Link>
          <Link
            to={"/login"}
            className="text-xl rounded-md font-semibold bg-white text-black p-3 text-center"
          >
            Login
          </Link>
        </div>
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      </div>
    </div>
  );
};

export default Home;
