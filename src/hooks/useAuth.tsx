import useAxios from "./useAxios";

const useAuth = () => {
  const api =  useAxios();
  const loginUser = async () => {
        return await api.get("/user/login");
  };
  return { loginUser};
};
export default useAuth;