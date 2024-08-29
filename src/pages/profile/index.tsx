import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import CustomLayout from "../../components/layout/custom-layout/CustomLayout";
import { logout, updateuser } from "../../redux/slices/authSlice";
import { useEffect, useState } from "react";
import { Button, message, Modal } from "antd";
import { EditOutlined } from "@ant-design/icons";
import usePostData from "../../hooks/usePut";
import { IUser } from "../../types/data";

const Profile = () => {
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  console.log(user?.profile_image_url);
  console.log(user?._id)
  if (!user) {
    return <div className="text-center text-white">Loading...</div>;
  }

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isChanged, setIsChanged] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    // email: user?.email || "",
    // phoneNumber: user?.phoneNumber || "",
    occupation: user?.occupation || "",
    profileImage: null as File | null,
  });
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // const { putData: updateProfile } = useUpdateData<FormData, any>('/user/profile-image');
  // const { putData: updateDetails } = useUpdateData<Partial<typeof formData>, any>('/user/update/user-details');
  const { postData } = usePostData<
    {
      userId: string,
      newFirstName: string,
      newLastName: string,
      newOccupation: string
    },
    {
      message: string;
      success: boolean;
      user?: IUser;
      token: string;
    }
  >("/user/update/user-details");
  const { postData: updateProfile } = usePostData<FormData, any>('/user/profile-image');

  useEffect(() => {
    setIsChanged(
      formData.firstName !== user?.firstName ||
        formData.lastName !== user?.lastName ||
        formData.occupation !== user?.occupation ||
        formData.profileImage !== null
    );
  }, [formData, user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData((prev) => ({ ...prev, profileImage: file }));
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleUpdateProfileImage = async () => {
    if(!user){
        return;
    }
    if (formData.profileImage) {
      const imageFormData = new FormData();
      imageFormData.append('profile', formData.profileImage);
      try {
        const {data} = await updateProfile(imageFormData);
        dispatch(updateuser({...user,profile_image_url:data.profile_image_url}))
        message.success('Profile image updated successfully');
      } catch (error) {
        message.error('Failed to update profile image');
      }
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    //call the update api
    const response = await postData({
      userId: user._id,
      newFirstName: formData.firstName,
      newLastName: formData.lastName,
      newOccupation: formData.occupation,
    });
    console.log(response)
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <CustomLayout>
      <div className="bg-gray-100 min-h-screen p-5 flex flex-col items-center">
        <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
          <div className="flex flex-col items-center">
            {/* Profile Image */}
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-300">
              <img
                src={
                  (user.profile_image_url != "" && user.profile_image_url) ||
                  "https://github.com/shadcn.png"
                }
                alt="Profile"
                className="object-cover w-full h-full"
              />
            </div>

            {/* User Details */}
            <h1 className="text-2xl font-semibold mt-4">
              {user.firstName} {user.lastName}
            </h1>
            <p className="text-gray-600">
              {user.occupation || "Occupation not provided"}
            </p>
            <p className="text-gray-500 text-sm mt-1">
              Role: <span className="capitalize">{user.role || "User"}</span>
            </p>
            {user.isBD && (
              <span className="text-blue-600 text-sm font-semibold mt-1">
                BD User
              </span>
            )}
          </div>

          <hr className="my-4" />

          {/* Contact Information */}
          <div className="text-left space-y-2">
            <div className="flex items-center">
              <span className="font-semibold w-24">Email:</span>
              <span className="text-gray-700">{user.email}</span>
            </div>
            <div className="flex items-center">
              <span className="font-semibold w-24">Phone:</span>
              <span className="text-gray-700">
                {user.phoneNumber || "Not provided"}
              </span>
            </div>
            {user.isBrokerConnected && (
              <div className="flex items-center">
                <span className="font-semibold w-24">Broker:</span>
                <span className="text-green-500">Connected</span>
              </div>
            )}
            <div className="flex items-center">
              <span className="font-semibold w-24">Referral:</span>
              <span className="text-gray-700">
                {user.referralCode || "Not Available"}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4 mt-6">
            <button
              onClick={showModal}
              className="w-full bg-blue-500 text-white py-2 rounded-md font-semibold hover:bg-blue-600 transition"
            >
              Edit Profile
            </button>
            <Modal
              title="Update details"
              open={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
              okText="Save changes"
              okButtonProps={{ disabled: !isChanged }}
            >
              <div className="relative w-32 h-32 mx-auto mb-4 border rounded-full p-2">
                <img
                  src={previewImage || user?.profile_image_url || "/avatar.png"}
                  alt="Profile"
                  className="w-full h-full object-cover rounded-full"
                />
                <label
                  htmlFor="profileImage"
                  className="absolute top-0 right-0 cursor-pointer"
                >
                  <EditOutlined className="text-blue-500 text-xl" />
                </label>
                <input
                  type="file"
                  id="profileImage"
                  hidden
                  onChange={handleImageChange}
                  accept="image/*"
                />
              </div>
              {formData.profileImage && (
                <Button onClick={handleUpdateProfileImage} className="mb-4">
                  Update Profile Image
                </Button>
              )}
              <div className="flex flex-col gap-3">
                <input
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  type="text"
                  className="border-2 w-full p-2"
                />
                <input
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  type="text"
                  className="border-2 w-full p-2"
                />
                <input
                  name="occupation"
                  placeholder="Occupation"
                  value={formData.occupation}
                  onChange={handleInputChange}
                  type="text"
                  className="border-2 w-full p-2"
                />
              </div>
            </Modal>
            <button
              onClick={() => {
                dispatch(logout());
              }}
              className="w-full bg-red-500 text-white py-2 rounded-md font-semibold hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </CustomLayout>
  );
};

export default Profile;
