import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "./redux/hooks";


const App = () => {
  const { user, token } = useAppSelector((state) => state.auth);
  if (!token || !user) {
    return <Navigate to={"/auth"} />;
  }

  return (
      user && user.role ? <Navigate to={"/home"} /> : <Outlet />
  );
};

export default App;
