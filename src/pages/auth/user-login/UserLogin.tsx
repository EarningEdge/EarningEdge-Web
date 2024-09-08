import  { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../redux/hooks";
import { login } from "../../../redux/slices/authSlice";
import { UserLoginResponse } from "../../../types/data";
import { useMutation } from "@tanstack/react-query";
import useAxios from "../../../hooks/useAxios";
import { notify } from "../../../utils/notify";
import { AxiosError } from "axios";
import Beam from "../../../components/aceternity/Beam";
import { Eye, EyeOff } from "lucide-react";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const api = useAxios();
  const {
    mutateAsync: loginUser,
    error,
    isPending,
  } = useMutation({
    mutationKey: ["loginUser"],
    mutationFn: async (credentials: { email: string; password: string }) => {
      const response = await api.post("/user/login", credentials);
      return response.data;
    },
    onSuccess: (data: UserLoginResponse) => {
      const { user, token } = data;
      dispatch(
        login({
          user,
          token,
        })
      );
      notify("Login Success!", "success");
      navigate("/");
    },
    onError: (error: AxiosError) => {
      console.log(error);
      if (error.status == 404) {
        notify("User not found", "error");
        return;
      }
      if (error.status == 401) {
        notify("Invalid credentials", "error");
        return;
      }
      notify("Oops something went wrong!", "error");
    },
  });

  const handleLogin = async () => {
    try {
      await loginUser({ email, password });
    } catch (error) {}
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="bg-gray-900 min-h-screen flex items-end p-5 auth relative">
      <div className="h-[90vh] w-full dark:bg-black bg-black dark:bg-dot-white/[0.2] bg-dot-white/[0.2] relative flex items-end justify-center">
        <div className="absolute top-0">
          <div className="flex flex-col w-fit mx-auto p-3 items-center relative">
            <Beam className="top-0 left-0" />
            <Beam className="top-0 right-0" />
            <Beam className="bottom-0 left-0" />
            <Beam className="bottom-0 right-0" />
            <img
              className="rounded-full mix-blend-lighten top-0 w-72"
              src="/logo.png"
              alt="Logo"
            />
          </div>
        </div>
        <div className="flex flex-col text-white gap-3 mb-10 z-10 w-full md:w-[30%]">
          <h1 className="text-3xl font-thin">
            Login to <br /> <b>Earning Edge</b>
          </h1>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className="p-3 bg-black text-white text-xl border-[0.5px] border-white rounded-md w-full"
            placeholder="name@company.com"
          />
          <div className="relative">
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={showPassword ? "text" : "password"}
              className="p-3 bg-black text-white text-xl border-[0.5px] border-white rounded-md w-full"
              placeholder="Your password"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5 text-white" />
              ) : (
                <Eye className="h-5 w-5 text-white" />
              )}
            </button>
          </div>
          <button
            className="text-xl rounded-md font-semibold bg-white text-black p-3"
            onClick={handleLogin}
            disabled={isPending}
          >
            {isPending ? "Logging in..." : "Login"}
          </button>
          {error && <p className="text-red-500">{error.message}</p>}
          <Link to="/reset-password">
            <h1>Forgot password?</h1>
          </Link>
          <Link to="/signup">
            <h1>Create an account</h1>
          </Link>
        </div>
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      </div>
    </div>
  );
};

export default UserLogin;