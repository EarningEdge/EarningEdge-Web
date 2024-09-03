import { Alert, Card, Button, Row, Col, message } from "antd";
import CustomLayout from "../../components/layout/custom-layout/CustomLayout";
import useFetchData from "../../hooks/useFetch";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import moment from "moment";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import usePostData from "../../hooks/usePost";
import { login } from "../../redux/slices/authSlice";

interface ConnectResponse {
  status: string;
  message: string;
}
const Index = () => {
  const user = useAppSelector((state) => state.auth.user);
  console.log(user)
  const token = useAppSelector((state) => state.auth.token);
  const dispatch = useAppDispatch()
  const { data: alert } = useFetchData<{
    status: string;
    data: { _id: string; createdAt: string; value: string }[];
  }>("/adminAlert/getAlerts");
  const { data: news } = useFetchData<{
    status: string;
    data: any;
  }>("/broker/news");

  const [selectedNewsUrl, setSelectedNewsUrl] = useState<string | null>(null);

  const {  postData,data } = usePostData<{}, ConnectResponse>('/broker/disconnect');

  const navigate = useNavigate();
  const handleDisConnect = async () => {
    await postData({});
    if(data?.status==="success"){
      message.success("Disconnected!");
      window.location.reload()
      if(user)
      dispatch(login({
        user: { ...user, isBrokerConnected: false },
        token
      }));
    }else{
      message.error("Failed to disconnect")
    }
  };

  const handleReadMore = () => {
    // Logic to navigate to a detailed news page or load more news items
  };

  const renderAlert = (alert: { _id: string; createdAt: string; value: string }) => (
    <Alert
      key={alert._id}
      message="Earning Edge Notice"
      description={
        <>
          <p>{alert.value}</p>
          <p style={{ fontSize: "0.8rem", color: "#666" }}>
            {moment(alert.createdAt).fromNow()}
          </p>
        </>
      }
      type="info"
      showIcon
      style={{ marginBottom: "16px" }}
    />
  );

  const renderNewsItem = (item: any) => (
    <Card
      hoverable
      style={{ marginBottom: "16px" }}
      cover={<img alt={item.title} src={item.banner_image} style={{ height: "150px", objectFit: "cover" }} />}
      onClick={() => setSelectedNewsUrl(item.url)}
    >
      <Card.Meta title={item.title} description={item.summary} />
    </Card>
  );

  return (
    <CustomLayout>
      
      {/* Alerts */}
      {alert?.data?.map(renderAlert)}
      {
        user?.isBrokerConnected?<Alert showIcon description={
          <>
            <p>Broker  Connected</p>
            <button className="bg-red-600 px-3 py-1 text-white rounded-md" onClick={()=>{handleDisConnect()}}>Disconnect</button>
          </>
        } type="success"/>:<Alert showIcon  type="error"  description={
          <>
            <p>Broker not Connected</p>
            <button className="bg-green-600 px-3 py-1 text-white rounded-md" onClick={()=>{navigate("/connectbroker")
                
            }}>Connect</button>
          </>
        }/>
      }

      {/* News */}
      <h2 className="text-2xl my-2">Top News</h2>
      <Row gutter={16}>
        {news?.data?.data?.feed?.slice(0, 2)?.map((item: any) => (
          <Col key={item.url} xs={24} sm={12}>
            {renderNewsItem(item)}
          </Col>
        ))}
      </Row>

      <Button type="primary" onClick={handleReadMore} style={{ marginTop: "16px" }}>
        Read More
      </Button>

      {/* WebView for selected news (optional feature) */}
      {selectedNewsUrl && (
        <div style={{ marginTop: "32px" }}>
          <Button type="default" onClick={() => setSelectedNewsUrl(null)}>
            Close News
          </Button>
          <iframe
            src={selectedNewsUrl}
            style={{ width: "100%", height: "500px", border: "none", marginTop: "16px" }}
            title="News"
          />
        </div>
      )}
    </CustomLayout>
  );
};

export default Index;
