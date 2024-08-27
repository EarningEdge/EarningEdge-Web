


import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "./redux/hooks";
import { ConfigProvider } from "antd";

const App = () => {
  const { user, token } = useAppSelector((state) => state.auth);
  if (!token || !user || !user.role) {
    return <Navigate to={"/auth"} />;
  }

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#1890ff', 
          borderRadius: 2,
        },
        components: {
          Segmented: {
            itemActiveBg: "rgba(0, 0, 0)",
            itemColor: "#000",
          },
        },
      }}
    >
      {user && user.role ? <Navigate to={"/"} /> : <Outlet />}
    </ConfigProvider>
  );
};

export default App;
