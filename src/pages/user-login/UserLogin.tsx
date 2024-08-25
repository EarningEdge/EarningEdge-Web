type Props = {};

const UserLogin = (props: Props) => {
  const handleLogin = () => {


    window.location.href = "/dashboard";
  }
  return (
    <div className="bg-gray-900 min-h-svh flex items-end p-5">
      <div className="flex flex-col text-white gap-3 mb-10 w-full">
        <h1 className="text-5xl">Login to <br /> <b>Earning Edge</b></h1>
        <input type="text" className="p-3 bg-transparent text-white text-xl border-2 border-white rounded-md w-full" placeholder="name@company.com"/>
        <input type="text" className="p-3 bg-transparent text-white text-xl border-2 border-white rounded-md" placeholder="Your password"/>
        <button className="text-xl rounded-md font-semibold bg-white text-black p-3" onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
};

export default UserLogin;
