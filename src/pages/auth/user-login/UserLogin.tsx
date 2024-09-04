import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../redux/hooks";
import { login } from "../../../redux/slices/authSlice";
import { UserLoginResponse } from "../../../types/data";
import { useMutation } from "@tanstack/react-query";
import useAxios from "../../../hooks/useAxios";
import { notify } from "../../../utils/notify";
import { AxiosError } from "axios";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

  return (
    <div className="bg-gray-900 min-h-svh flex items-end p-5 auth">
      <div className="flex flex-col text-white gap-3 mb-10 w-full">
        <h1 className="text-5xl">
          Login to <br /> <b>Earning Edge</b>
        </h1>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          className="p-3 bg-black text-white text-xl border-2 border-white rounded-md w-full"
          placeholder="name@company.com"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          className="p-3 bg-black text-white text-xl border-2 border-white rounded-md"
          placeholder="Your password"
        />
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
    </div>
  );
};

export default UserLogin;
