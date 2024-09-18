import React, { useState, useEffect, ReactNode } from "react";
import {
  ConfigProvider,
  Layout,
  Menu,
  Dropdown,
  MenuProps,
  Drawer,
  Divider,
  Segmented,
} from "antd";
import { menuItems } from "../../../utils/menuItems";
import { useAppSelector } from "../../../redux/hooks";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Header } from "antd/es/layout/layout";
import { IndianRupee, LogOut, User } from "lucide-react";

import { useDispatch } from "react-redux";
import { login, logout } from "../../../redux/slices/authSlice";
import { BellOutlined } from "@ant-design/icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import useAxios from "../../../hooks/useAxios";

const { Sider, Content } = Layout;
const CustomLayout = ({ children }: { children: ReactNode }) => {
  const { user, token } = useAppSelector((state) => state.auth);
  const api = useAxios();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [open, setOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState("Unread");
  const [unreadNotificationList, setUnreadNotificationList] = useState<
    | [
        {
          notificationContent: {
            title: string;
            message: string;
          };
        }
      ]
    | []
  >([]);
  const [readNotificationList, setReadNotificationList] = useState<
    | [
        {
          notificationContent: {
            title: string;
            message: string;
          };
        }
      ]
    | []
  >([]);

  const { mutateAsync: updateUserDetails } = useMutation({
    mutationKey: ["updateUserDetails"],
    mutationFn: async () => {
      const response = await api.put("user/update/user-details", {
        userId: user?._id,
        lastNotificationViewedAt: new Date().toISOString(),
      });

      return response;
    },
    onSuccess: () => {
      const date = new Date().toISOString().replace("Z", "+00:00");
      dispatch(
        login({
          user: {
            ...user!,
            lastNotificationViewedAt: date,
          },
          token: token,
        })
      );
    },
  });

  const {
    data: unreadNotifications,
    // isLoading: isUnreadNotificationsLoading, isError: isUnreadNotificationsError, error: unUeadNotificationsError
  } = useQuery({
    queryKey: ["unreadNotifications"],
    queryFn: async () => {
      return api.get("/notification/list/" + user?._id, {
        params: {
          fetchRead: false,
          lastNotificationViewedAt: user?.lastNotificationViewedAt,
        },
      });
    },
  });

  const {
    data: readNotifications,
    refetch: refetchReadNotifications,
    // isLoading: isReadNotificationsLoading, isError: isReadNotificationsError, error: unRdNotificationsError
  } = useQuery({
    queryKey: ["readNotifications"],
    queryFn: async () => {
      return api.get("/notification/list/" + user?._id, {
        params: {
          fetchRead: true,
          lastNotificationViewedAt: user?.lastNotificationViewedAt,
        },
      });
    },
    enabled: false,
  });

  useEffect(() => {
    if (unreadNotifications && unreadNotifications.data) {
      setUnreadNotificationList(unreadNotifications.data.data);
    }
  }, [unreadNotifications]);

  useEffect(() => {
    if (readNotifications && readNotifications.data) {
      setReadNotificationList(readNotifications.data.data);
    }
  }, [readNotifications]);

  const handleFetchReadNotification = () => {
    refetchReadNotifications();
  };

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = async () => {
    setOpen(false);
    await updateUserDetails();
  };
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

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <div className="bg-darkBg border-darkStroke border-[0.4px] rounded-md px-24 flex justify-center flex-col items-center py-7 relative">
          <h1 className="text-slate-400 absolute top-1 left-1 rounded-md bg-slate-700 border-[0.4px] border-darkStroke text-center px-2">
            Free trial
          </h1>
          <img
            className="h-12 w-12 rounded-full"
            src={user?.profile_image_url || "fallback_profile.jpg"}
          ></img>
          <h1 className=" text-slate-400">
            {user?.firstName + " " + user?.lastName}
          </h1>
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <Link to={"/profile"}>
          <h1 className=" text-slate-300">View Profile</h1>
        </Link>
      ),
      icon: <User color="grey" size={15} />,
    },
    {
      key: "3",
      label: (
        <Link to={"/"}>
          <h1 className=" text-slate-300">Manage Subscription</h1>
        </Link>
      ),
      icon: <IndianRupee color="grey" size={15} />,
      disabled: true,
    },
    {
      key: "4",
      danger: true,
      icon: <LogOut color="red" size={15} />,
      label: (
        <button
          className="w-full text-left"
          onClick={() => {
            dispatch(logout());
            navigate("/auth");
          }}
        >
          Logout
        </button>
      ),
    },
  ];

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
              EarningEdge<span className="text-[#637CFF]">.app</span>
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
          <Header className="py-0 w-full flex justify-end items-center bg-darkSecondary z-10">
            <Dropdown className="bg-black" menu={{ items }}>
              <button className="w-fit">
                <img
                  className="h-10 w-10 rounded-full"
                  src={user.profile_image_url || "fallback_profile.jpg"}
                />
              </button>
            </Dropdown>
            <div>
              <button className="w-fit items-center mx-4" onClick={showDrawer}>
                <BellOutlined className=" self-center mt-5 text-3xl text-white" />
              </button>
              <Drawer
                title="Notifications"
                onClose={onClose}
                open={open}
                styles={{
                  body: {
                    padding: 0,
                  },
                }}
              >
                <div className="px-8 py-4">
                  <Segmented
                    options={["Unread", "Read"]}
                    onChange={(value) => {
                      setCurrentTab(value);
                      if (value === "Read") {
                        handleFetchReadNotification();
                      }
                      console.log(value); // string
                    }}
                    block
                    defaultValue="Unread"
                  />
                </div>
                {currentTab === "Unread" &&
                  unreadNotificationList &&
                  unreadNotificationList.length > 0 &&
                  unreadNotificationList.map((item, index) => {
                    return (
                      <>
                        <div key={index}>
                          <div className="px-4">
                            <div className="text-lg text-black font-bold">
                              {item.notificationContent.title}
                            </div>
                            <div className="text-base text-black">
                              {item.notificationContent.message}
                            </div>
                          </div>
                          <Divider
                            style={{
                              margin: 0,
                              marginTop: 8,
                              marginBottom: 8,
                            }}
                          />
                        </div>
                      </>
                    );
                  })}
                {currentTab === "Read" &&
                  readNotificationList &&
                  readNotificationList.length > 0 &&
                  readNotificationList.map((item, index) => {
                    return (
                      <>
                        <div key={index}>
                          <div className="px-4">
                            <div className="text-lg text-black font-bold">
                              {item.notificationContent.title}
                            </div>
                            <div className="text-base text-black">
                              {item.notificationContent.message}
                            </div>
                          </div>
                          <Divider
                            style={{
                              margin: 0,
                              marginTop: 8,
                              marginBottom: 8,
                            }}
                          />
                        </div>
                      </>
                    );
                  })}
              </Drawer>
            </div>
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
