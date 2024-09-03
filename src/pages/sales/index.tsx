import { CopyOutlined, UserOutlined, DollarOutlined } from "@ant-design/icons";
import { useAppSelector } from "../../redux/hooks";
import useFetchData from "../../hooks/useFetch";
import Table from "./table";
import { Avatar } from "./avatar";
import { Card, CardContent, CardHeader, CardTitle } from "./card";
import { Button } from "./button";
import { IUser } from "../../types/data";
import CustomLayout from "../../components/layout/custom-layout/CustomLayout";

const Dashboard = () => {
  const user = useAppSelector((state) => state.auth.user);
  const { data: leads } = useFetchData<any>("/sales/getLeads/" + user?._id);

  const leadsColumn = [
    {
      title: "User",
      dataIndex: "firstName",
      key: "firstName",
      render: (_: string, record: IUser) => {
        return (
          <div className=" flex items-center space-x-1">
            <img
              className=" h-10 w-10 rounded-full"
              src={record?.profile_image_url || "/fallback_profile.jpg"}
            />
            <h1>{record.firstName + " " + record.lastName} </h1>
          </div>
        );
      },
    },
  ];
  const copyReferralCode = () => {
    navigator.clipboard.writeText(user?.referralCode + "");
  };

  return (
    <CustomLayout>
      <div className="min-h-screen bg-gray-100 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <header className="flex items-center justify-center space-x-3 bg-white p-6 rounded-lg shadow">
            <img
              className="h-12 w-12 object-contain"
              src="/logo.png"
              alt="EarningEdge Logo"
            />
            <h1 className="text-2xl font-bold text-gray-800">EarningEdge</h1>
          </header>

          <Card>
            <CardContent className="flex flex-col items-center pt-6">
              <Avatar
                src={user?.profile_image_url || "/fallback_profile.jpg"}
                alt={`${user?.firstName} ${user?.lastName}`}
                className="h-24 w-24"
              ></Avatar>
              <h2 className="mt-4 text-2xl font-semibold text-gray-800">
                {user?.firstName + " " + user?.lastName}
              </h2>
              <div className="mt-2 flex items-center space-x-2">
                <span className="text-sm text-gray-600">Referral Code:</span>
                <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">
                  {user?.referralCode}
                </code>
                <Button variant="outline" size="sm" onClick={copyReferralCode}>
                  <CopyOutlined className="h-4 w-4 mr-1" />
                  Copy
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Users
                </CardTitle>
                <UserOutlined className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{user?.usersCount}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Paid Users
                </CardTitle>
                <DollarOutlined className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{user?.paidUsersCount}</div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Leads</CardTitle>
            </CardHeader>
            <CardContent>
              <Table columns={leadsColumn} data={leads?.data || []} />
            </CardContent>
          </Card>
        </div>
      </div>
    </CustomLayout>
  );
};

export default Dashboard;
