import { useState } from "react";
import usePostData from "../../../hooks/usePost";
import { Link, useNavigate } from "react-router-dom";
import { IUser } from "../../../types/data";
import { useAppDispatch } from "../../../redux/hooks";
import { login } from "../../../redux/slices/authSlice";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { postData, error,data } = usePostData<{},{success:boolean,user:IUser,token:string}>("/user/login");
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const handleLogin = async () => {
    if (!email) {
      alert("Enter email please");
      return;
    }
    if (!password) {
      alert("Enter password please");
      return;
    }
    await postData({ email, password });
    if(data && data.success){
        dispatch(login({user:data.user,token:data.token}))
        navigate("/")
    }
    if (error) alert(error.message);

  };
  return (
    <div className="bg-gray-900 min-h-svh flex items-end p-5 auth">
      <div className="flex flex-col text-white gap-3 mb-10 w-full">
        <h1 className="text-5xl">
          Login to <br /> <b>Earning Edge</b>
        </h1>
        <input
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          type="text"
          className="p-3 bg-transparent text-white text-xl border-2 border-white rounded-md w-full"
          placeholder="name@company.com"
        />
        <input
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          type="text"
          className="p-3 bg-transparent text-white text-xl border-2 border-white rounded-md"
          placeholder="Your password"
        />
        <button
          className="text-xl rounded-md font-semibold bg-white text-black p-3"
          onClick={handleLogin}
        >
          Login
        </button>
        <Link to={"/reset-password"}>
          <h1>Forgot password?</h1>
        </Link>
        <Link to={"/signup"}>
          <h1>Create an account</h1>
        </Link>
      </div>
    </div>
  );
};

export default UserLogin;
