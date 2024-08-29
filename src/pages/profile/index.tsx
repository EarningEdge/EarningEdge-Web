
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import CustomLayout from '../../components/layout/custom-layout/CustomLayout';
import { logout } from '../../redux/slices/authSlice';

const Profile = () => {
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
    console.log(user?.profile_image_url)
  if (!user) {
    return <div className="text-center text-white">Loading...</div>;
  }

  return (
    <CustomLayout>
      <div className="bg-gray-100 min-h-screen p-5 flex flex-col items-center">
        <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
          <div className="flex flex-col items-center">
            {/* Profile Image */}
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-300">
              <img
                src={user.profile_image_url!="" && user.profile_image_url  || 'https://github.com/shadcn.png'}
                alt="Profile"
                className="object-cover w-full h-full"
              />
            </div>

            {/* User Details */}
            <h1 className="text-2xl font-semibold mt-4">
              {user.firstName} {user.lastName}
            </h1>
            <p className="text-gray-600">{user.occupation || "Occupation not provided"}</p>
            <p className="text-gray-500 text-sm mt-1">
              Role: <span className="capitalize">{user.role || 'User'}</span>
            </p>
            {user.isBD && <span className="text-blue-600 text-sm font-semibold mt-1">BD User</span>}
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
              <span className="text-gray-700">{user.phoneNumber || 'Not provided'}</span>
            </div>
            {user.isBrokerConnected && (
              <div className="flex items-center">
                <span className="font-semibold w-24">Broker:</span>
                <span className="text-green-500">Connected</span>
              </div>
            )}
            <div className="flex items-center">
              <span className="font-semibold w-24">Referral:</span>
              <span className="text-gray-700">{user.referralCode || "Not Available"}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4 mt-6">
            {/* <button className="w-full bg-blue-500 text-white py-2 rounded-md font-semibold hover:bg-blue-600 transition">
              Edit Profile
            </button> */}
            <button onClick={()=>{dispatch(logout())}} className="w-full bg-red-500 text-white py-2 rounded-md font-semibold hover:bg-red-600 transition">
              Logout
            </button>
          </div>
        </div>
      </div>
    </CustomLayout>
  );
};

export default Profile;
