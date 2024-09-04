import React, { useState, useEffect, ReactNode } from "react";
import { ConfigProvider, Layout, Menu } from "antd";
import { menuItems } from "../../../utils/menuItems";
import { useAppSelector } from "../../../redux/hooks";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Header } from "antd/es/layout/layout";
const { Sider, Content } = Layout;
const CustomLayout = ({ children }: { children: ReactNode }) => {
  const { user } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  useEffect(() => {
    if (!user) {
      navigate("/auth");
    }
  }, [user, navigate]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const renderMenuItems = (items: any) => {
    return items.map((item: any) => {
      if (item.children) {
        return null; // Skip submenus on mobile
      }
      return (
        <Menu.Item key={item.path} icon={item.icon}>
          <Link to={item.path}>{isMobile ? "" : item.label}</Link>
        </Menu.Item>
      );
    });
  };

  if (!user) {
    return null;
  }

  return (
    <ConfigProvider>
      <Layout style={{ minHeight: "100vh" }}>
        {!isMobile && (
          <Sider
            className="bg-dark-blue"
            style={{
              background: "#262633",
              position: "fixed",
              left: 0,
              height: "100vh",
              zIndex: 1000,
            }}
          >
            <div className="text-xl text-white text-center mt-4 mb-8 font-bold">
              EarningEdge<span className="text-[#637CFF]">.in</span>
            </div>
            <Menu
              theme="dark"
              mode="inline"
              selectedKeys={[location.pathname]}
              style={{ background: "#262633" }}
            >
              {renderMenuItems(menuItems)}
            </Menu>
          </Sider>
        )}
        <Layout style={{ marginLeft: isMobile ? 0 : 200 }}>
          <Header className="py-0 w-full flex justify-end items-center bg-darkSecondary">
              <button className=" w-fit">
                <img className="h-10 w-10 rounded-full" src={user.profile_image_url || "fallback_profile.jpg"}/> 
              </button>
          </Header>
          <Content
            style={{
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              padding: isMobile ? "10px" : "20px",
              marginBottom: isMobile ? "60px" : "0",
            }}
            className="bg-darkBg "
          >
            {children}
          </Content>
        </Layout>
        {isMobile && (
          <div className="mobile-nav">
            <nav>
              {menuItems.map((item: any) => (
                <Link key={item.path} to={item.path}>
                  {React.cloneElement(item.icon, {
                    style: { fontSize: "24px" },
                  })}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </Layout>
    </ConfigProvider>
  );
};

export default CustomLayout;
