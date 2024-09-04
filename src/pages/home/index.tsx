import { Alert, Card, Button, Row, Col } from "antd";
import CustomLayout from "../../components/layout/custom-layout/CustomLayout";
import useFetchData from "../../hooks/useFetch";
import {
  //  useAppDispatch,
   useAppSelector } from "../../redux/hooks";
import moment from "moment";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import usePostData from "../../hooks/usePost";
// import { login } from "../../redux/slices/authSlice";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";
import { CheckCircleOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import BlurBlobs from "../journal/Blurblobs";

// interface ConnectResponse {
//   status: string;
//   message: string;
// }
const Index = () => {
  const user = useAppSelector((state) => state.auth.user);
  const api = useAxios()
  // const token = useAppSelector((state) => state.auth.token);
  const [news,setNews] = useState<null|any[]>(null)
  // const dispatch = useAppDispatch()
  const {data:newsData,isLoading:isNewsLoading,isError:isNewsError,error:newsError} = useQuery({
    queryKey:["news"],
    queryFn:async()=>{
        return await api.get("/broker/news")
    }
  })

  useEffect(()=>{setNews(newsData?.data?.data?.data?.feed)},[newsData])
  const { data: alert } = useFetchData<{
    status: string;
    data: { _id: string; createdAt: string; value: string }[];
  }>("/adminAlert/getAlerts");


  const [selectedNewsUrl, setSelectedNewsUrl] = useState<string | null>(null);

  // const {  postData,data } = usePostData<{}, ConnectResponse>('/broker/disconnect');

  const navigate = useNavigate();

  // const handleDisConnect = async () => {
  //   await postData({});
  //   if(data?.status==="success"){
  //     message.success("Disconnected!");
  //     window.location.reload()
  //     if(user)
  //     dispatch(login({
  //       user: { ...user, isBrokerConnected: false },
  //       token
  //     }));
  //   }else{
  //     message.error("Failed to disconnect")
  //   }
  // };

  // const handleReadMore = () => {
  //   // Logic to navigate to a detailed news page or load more news items
  // };

  const renderAlert = (alert: { _id: string; createdAt: string; value: string }) => (
    <div className="relative border-darkStroke px-3 py-3 rounded-md border-[0.4px] my-3 overflow-hidden">
      {/* Animated blob inside the container */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[0px] right-[20px] w-96 h-96 bg-green-500 bg-opacity-45 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
      </div>
      <p className="text-white z-10 relative">{alert.value}</p>
      <p className="text-white z-10 relative">
        {moment(alert.createdAt).fromNow()}
      </p>
    </div>
  );
  const renderNewsItem = (item: any) => (
    <Card
      className="bg-darkSecondary border-[0.2px] border-[#34323d] text-white"
      hoverable
      style={{ marginBottom: '16px' }}
      cover={
        <img
          alt={item.title}
          src={item.banner_image}
          style={{ height: '150px', objectFit: 'cover' }}
        />
      }
      onClick={() => setSelectedNewsUrl(item.url)}
    >
      <Card.Meta
        title={<span style={{ color: 'white' }}>{item.title}</span>}
        description={<span style={{ color: 'white' }}>{item.summary}</span>}
      />
    </Card>
  );
  

  return (
    <CustomLayout>
      
      {/* Alerts */}
      {alert?.data?.map(renderAlert)}
      {
        user?.isBrokerConnected?<div className="bg-green-300 px-3 w-full h-10 flex items-center justify-center space-x-3  border-[0.7px] border-green-800 rounded-md"><CheckCircleOutlined className=" text-2xl text-green-800" />
            <h1>Broker connected! 🎉</h1>
        </div>:
        <div onClick={()=>{navigate("/connectbroker")}} className=" px-3 w-full h-10 flex items-center justify-center space-x-3  border-[0.7px] border-orange-800 rounded-md cursor-pointer"><ExclamationCircleOutlined className=" text-2xl text-red-300" />
            <h1 className="text-red-300">Broker not connected</h1>
        </div>

      }

     
      <h2 className="text-2xl my-2 text-white">Top News</h2>
      {
        isNewsLoading ? <h1>Loading news...</h1>:isNewsError?<h1>{newsError.message}</h1>:   <Row gutter={16}>
        {news?.slice(0, 2)?.map((item: any) => (
          <Col key={item.url} xs={24} sm={12}>
            {renderNewsItem(item)}
          </Col>
        ))}
      </Row>
      }
      
   

    
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
