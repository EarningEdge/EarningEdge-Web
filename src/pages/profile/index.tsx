import {
  CopyOutlined,
  DisconnectOutlined,
  DownloadOutlined,
  LineChartOutlined,
  PoweroffOutlined,
} from "@ant-design/icons";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";

import CustomLayout from "../../components/layout/custom-layout/CustomLayout";
import { Card, CardContent } from "./card";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Modal } from "antd";
import { useEffect, useState } from "react";
import { login, logout } from "../../redux/slices/authSlice";
import { AxiosError } from "axios";
import { notify } from "../../utils/notify";
import useAxios from "../../hooks/useAxios";
import { IUser } from "../../types/data";
import moment from "moment";
import { QRCodeSVG } from "qrcode.react";
import Beam from "../../components/aceternity/Beam";
import { PenIcon } from "lucide-react";

const UserDashboard = () => {
  const { user, token } = useAppSelector((state) => state.auth);
  const [leads, setLeads] = useState<null | IUser[]>(null);
  const [referralUrl, setReferralUrl] = useState("");
  const api = useAxios();
  const dispatch = useAppDispatch();
  const [files, setFiles] = useState<File>();


  const { mutateAsync: disconnectUser } = useMutation({
    mutationKey: ["disconnect"],
    mutationFn: async () => {
      const response = await api.post("/broker/disconnect");
      return response;
    },
    onSuccess: () => {
      notify("Broker Disconnected", "success");
      dispatch(login({ user: { ...user!, isBrokerConnected: false }, token }));
    },
    onError: (error: AxiosError) => {
      notify(error.message, "error");
    },
  });

  const { mutateAsync: updateUserDetails } = useMutation({
    mutationKey: ["updateUserDetails"],
    mutationFn: async (updatedUserDetails: object) => {
      const response = await api.put("user/update/user-details", {
        userId: user?._id,
        ...updatedUserDetails,
      });
      return response;
    },
    onSuccess: (_, updatedUserDetails) => {
      notify("Update successfully!", "success");
      dispatch(login({ user: { ...user!, ...updatedUserDetails }, token }));
    },
  });

  const { mutateAsync: updateProfileImage } = useMutation({
    mutationKey: ["updateProfileImage"],
    mutationFn: async () => {
      const formData = new FormData();
      formData.append("profile", files as any);
      const response = await api.put("user/profile-image", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response;
    },
    onSuccess: (data) => {
      const updatedUser: IUser = data.data.data;
      dispatch(
        login({
          user: {
            ...user!,
            profile_image_key: updatedUser.profile_image_key,
            profile_image_url: updatedUser.profile_image_url,
          },
          token,
        })
      );
    },
  });

  const {
    data: leadsResponse,
    // isLoading: isLeadsLoading, isError: isLeadsError, error: leadsError
  } = useQuery({
    queryKey: ["leads"],
    queryFn: async () => {
      return api.get("/sales/getLeads/" + user?._id);
    },
  });

  useEffect(() => {
    if (leadsResponse && leadsResponse.data) {
      setLeads(leadsResponse?.data?.data);
    }
  }, [leadsResponse]);

  const {
    data: userDetails,
    // isLoading: isUserDetailsLoading, isError: isUserError, error: userError
  } = useQuery({
    queryKey: ["userDetails"],
    queryFn: async () => {
      return api.get("/user/details/" + user?._id);
    },
  });

  useEffect(() => {
    if (userDetails && userDetails.data) {
      dispatch(login({ user: userDetails?.data?.data?.userData, token }));
    }
  }, [userDetails]);

  const {
    data: referralData,
    // isLoading: isUserDetailsLoading, isError: isUserError, error: userError
  } = useQuery({
    queryKey: ["referralData"],
    queryFn: async () => {
      return (await api.get("/analytics/referralAnalytics/" + user?._id)).data;
    },
  });

  useEffect(() => {
    if (referralData && referralData.data) {
        console.log(referralData.data.data)
    }
  }, [referralData]);


  useEffect(() => {
    if (user && user._id) {
      setReferralUrl(
        `${import.meta.env.VITE_REACT_APP_FRONTEND_URL}/auth?inviteCode=${
          user.referralCode
        }&username=${
          user.firstName?.toLowerCase() + "_" + user.lastName?.toLowerCase()
        }`
      );
    }
  }, [user]);

  // State to control modal visibility
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAnalyticsModalVisible, setIsAnalyticsModalVisible] = useState(false);
  const [actionType, setActionType] = useState("");

  const copyReferralCode = () => {
    navigator.clipboard.writeText(user?.referralCode || "");
  };

  const showConfirmModal = (action: any) => {
    setActionType(action);
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    setIsModalVisible(false);
    if (actionType === "logout") {
      dispatch(logout());
    } else if (actionType === "disconnect") {
      await disconnectUser();
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const showAnalyticsModal = () => {
    setIsAnalyticsModalVisible(true);
  };

  const handleAnalyticsCancel = () => {
    setIsAnalyticsModalVisible(false);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = e.target.files[0];
      setFiles(newFiles);
      // onFileChange([...files, ...newFiles]);
    }
  };

  useEffect(() => {
    if (files) {
      updateProfileImage();
    }
  }, [files]);

  const handleDownload = () => {
    const svg = document.querySelector(".qr-code-svg");
    const svgData = new XMLSerializer().serializeToString(svg!);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.download = "qr-code.png";
      downloadLink.href = pngFile;
      downloadLink.click();
    };
    img.src = "data:image/svg+xml;base64," + btoa(svgData);
  };

  let timeoutId: any; // Declare outside the function to persist

  const handleUpdateDetails = async (field: string, value: any) => {
    if (!value) {
      clearTimeout(timeoutId);
      notify("Please fill something!", "error");
      return;
    }
    let updatedUserDetails: object;
    switch (field) {
      case "firstName":
        updatedUserDetails = { newFirstName: value };
        break;
      case "lastName":
        updatedUserDetails = { newLastName: value };
        break;
    }
    // Clear the previous timeout before setting a new one
    clearTimeout(timeoutId);

    // Set a new timeout for the debounce
    timeoutId = setTimeout(async () => {
      await updateUserDetails(updatedUserDetails);
    }, 1000);
  };

  if (!user) {
    return <div className="text-center text-white">Loading...</div>;
  }

  return (
    <CustomLayout>
      <div className="min-h-screen bg-darkBg p-4 md:p-8">
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-50px] left-[-120px] w-96 h-96 bg-purple-500 bg-opacity-45 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
          <div className="absolute bottom-[-50px] right-[-25%] w-96 h-96 bg-purple-500 bg-opacity-45 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        </div>
        <Card className="max-w-4xl mx-auto">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-6">Personal Details</h2>
            {/* Personal Details Content */}
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-shrink-0">
                <div className="relative">
                  <img
                    src={user.profile_image_url || "/fallback_profile.jpg"}
                    alt={`${user.firstName} ${user.lastName}`}
                    className="w-24 h-24 rounded-full"
                  />
                  <label
                    htmlFor="fileInput"
                    style={{ cursor: "pointer" }}
                    className="absolute bottom-0 right-0 bg-white rounded-full p-[6px] shadow-md "
                  >
                    <PenIcon className="text-gray-600" size={20} />
                  </label>
                  <input
                    type="file"
                    id="fileInput"
                    accept="image/png, image/jpeg"
                    className="hidden"
                    onChange={handleFileUpload}
                    multiple={false}
                  />
                </div>
              </div>

              <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-100">
                    First Name
                  </label>
                  <input
                    type="text"
                    defaultValue={user.firstName}
                    onChange={(e) => {
                      handleUpdateDetails("firstName", e.target.value);
                    }}
                    className="mt-1 block w-full px-3 py-2 bg-darkSecondary border border-darkStroke rounded-md shadow-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-100">
                    Last Name
                  </label>
                  <input
                    type="text"
                    defaultValue={user.lastName}
                    onChange={(e) => {
                      handleUpdateDetails("lastName", e.target.value);
                    }}
                    className="mt-1 block w-full px-3 py-2 bg-darkSecondary border border-darkStroke rounded-md shadow-sm"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-100">
                    Email
                  </label>
                  <input
                    type="email"
                    value={user.email}
                    readOnly
                    className="mt-1 block w-full px-3 py-2 bg-darkSecondary border border-darkStroke rounded-md shadow-sm"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-100">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={user.phoneNumber || ""}
                    readOnly
                    className="mt-1 block w-full px-3 py-2 bg-darkSecondary border border-darkStroke rounded-md shadow-sm"
                  />
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-6 flex md:flex-row  justify-between items-start md:items-center w-full">
                <span className="w-1/2">Referral and Earnings</span>
                <button
                  onClick={showAnalyticsModal}
                  className="text-sm font-medium space-x-3  text-green-600 border-[0.2px] border-darkStroke  px-2 md:px-4 py-2 rounded-md shadow-md flex justify-center items-center w-1/2 md:w-1/4"
                >
                  <span>Analytics</span> <LineChartOutlined />
                </button>
              </h2>
              <div className="flex flex-col md:flex-row gap-4 items-start md:items-end">
                <div className="flex-grow w-full">
                  <label className="block text-sm font-medium text-gray-100">
                    Referral Code
                  </label>
                  <div className="mt-1 flex space-x-1 rounded-md shadow-sm w-full">
                    <input
                      type="text"
                      value={user.referralCode || ""}
                      readOnly
                      className="flex-grow px-3 py-2 bg-darkSecondary border border-darkStroke rounded-md w-3/4"
                    />
                    <button
                      onClick={copyReferralCode}
                      className="inline-flex  border-darkStroke border-[0.4px] items-center px-4 py-2  justify-center rounded-md shadow-sm text-sm font-medium text-white w-1/4 "
                    >
                      <CopyOutlined className="h-4 w-4 mr-2" />
                      Copy
                    </button>
                  </div>
                </div>
              </div>

              <h1 className="mt-6 text-lg">Users joined</h1>
              <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
                <div className="bg-darkSecondary border-[0.4px] border-darkStroke p-4 rounded-md shadow">
                  <h3 className="text-lg font-light mb-2">Current month</h3>
                  <p className="text-3xl font-bold">{referralData?.data?.data?.currentMonthCount || 0}</p>
                </div>
                <div className="bg-darkSecondary border-[0.4px] border-darkStroke p-4 rounded-md shadow">
                  <h3 className="text-lg font-light mb-2">Total users</h3>
                  <p className="text-3xl font-bold">{referralData?.data?.data?.totalUsers || 0}</p>
                </div>
              </div>
              <h1 className="mt-6 text-lg">Paid users count</h1>
              <div className=" grid grid-cols-2 md:grid-cols-2 gap-4">
                <div className="bg-darkSecondary border-[0.4px] border-darkStroke p-4 rounded-md shadow">
                  <h3 className="text-lg font-light mb-2">Current Month</h3>
                  <p className="text-3xl font-bold">{user.paidUsersCount || 0}</p>
                </div>
                <div className="bg-darkSecondary border-[0.4px] border-darkStroke p-4 rounded-md shadow">
                  <h3 className="text-lg font-light mb-2">Overall</h3>
                  <p className="text-3xl font-bold">
                    {user.paidUsersCount || 0}
                  </p>
                </div>
              </div>
              <div className="bg-darkSecondary border-[0.4px] mt-4 border-darkStroke p-4 rounded-md shadow">
                <h3 className="text-lg font-light mb-2">Credits balance</h3>
                <p className="text-3xl font-bold text-green-500">
                  ₹{user.paidUsersCount*500 || 0}
                </p>
              </div>
              <Card className="max-w-4xl mx-auto mt-8">
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Referral QR Code</h2>
                    <button
                      onClick={handleDownload}
                      className="border-darkStroke border-[0.5px] rounded-md px-2 py-1 text-green-600"
                    >
                      <DownloadOutlined className="text-xl mr-1" />
                      Download QR
                    </button>
                  </div>
                  <div className="flex flex-col w-fit mx-auto p-3 items-center relative">
                    <Beam className="top-0 left-0" />
                    <Beam className="top-0 right-0" />
                    <Beam className="bottom-0 left-0" />
                    <Beam className="bottom-0 right-0" />
                    <QRCodeSVG
                      value={referralUrl}
                      size={200}
                      className="qr-code-svg relative"
                    />
                    <p className="mt-4 text-sm text-gray-400">
                      Scan this QR code to invite friends
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-4">Actions</h2>
              <div className="flex items-center space-x-2">
                <button
                  className="text-red-400 border-[0.7px] border-red-400 rounded-md px-2 py-1"
                  onClick={() => showConfirmModal("logout")}
                >
                  <PoweroffOutlined className="text-red-400" /> Logout
                </button>
                {user.isBrokerConnected && (
                  <button
                    className="text-red-400 border-[0.7px] border-red-400 rounded-md px-2 py-1"
                    onClick={() => showConfirmModal("disconnect")}
                  >
                    <DisconnectOutlined className="text-red-400" /> Disconnect
                    broker
                  </button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Confirmation Modal */}
        <Modal
          title="Confirmation"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          okText="Yes"
          cancelText="No"
        >
          {actionType === "logout" ? (
            <p>Are you sure you want to log out?</p>
          ) : (
            <p>Are you sure you want to disconnect the broker?</p>
          )}
        </Modal>

        <Modal
          title="Leads Analytics"
          visible={isAnalyticsModalVisible}
          onCancel={handleAnalyticsCancel}
          footer={null}
        >
          <div className="space-y-4">
            <h1 className="text-slate-200">Your Leads</h1>
            {leads?.map((lead) => (
              <div
                key={lead._id}
                className="flex items-center p-2 bg-darkSecondary rounded-md"
              >
                <img
                  src={lead.profile_image_url || "/fallback_profile.jpg"}
                  alt={lead.firstName + " " + lead.lastName}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div className="text-white">
                  <p className="text-sm font-semibold">
                    {lead.firstName + " " + lead.lastName}
                  </p>
                  <p className="text-xs text-gray-400">{lead.email}</p>
                  <p className="text-xs text-gray-400">{lead.phoneNumber}</p>
                  <p className="text-xs text-gray-400">
                    Joined {moment(lead.createdAt).fromNow()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Modal>
      </div>
    </CustomLayout>
  );
};

export default UserDashboard;
