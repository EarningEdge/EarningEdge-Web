import React from "react";
import useAxios from "../../hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { Button, Card, Col, Row } from "antd";

const TopNews = () => {
  const api = useAxios();
  const [news, setNews] = React.useState<null | any[]>(null);
  const [selectedNewsUrl, setSelectedNewsUrl] = React.useState<string | null>(
    null
  );

  const {
    data: newsData,
    isLoading: isNewsLoading,
    isError: isNewsError,
    error: newsError,
  } = useQuery({
    queryKey: ["news"],
    queryFn: async () => {
      return await api.get("/broker/news");
    },
  });

  React.useEffect(() => {
    setNews(newsData?.data?.data?.data?.feed);
  }, [newsData]);
  const renderNewsItem = (item: any) => (
    <Card
      className="bg-darkSecondary border-[0.2px] border-[#34323d] text-white"
      hoverable
      style={{ marginBottom: "16px" }}
      cover={
        <img
          alt={item.title}
          src={item.banner_image}
          style={{ height: "150px", objectFit: "cover" }}
        />
      }
      onClick={() => setSelectedNewsUrl(item.url)}
    >
      <Card.Meta
        title={<span style={{ color: "white" }}>{item.title}</span>}
        description={<span style={{ color: "white" }}>{item.summary}</span>}
      />
    </Card>
  );
  return (
    <>
      <h2 className="text-2xl my-2 text-white">Top News</h2>
      {isNewsLoading ? (
        <h1>Loading news...</h1>
      ) : isNewsError ? (
        <h1>{newsError.message}</h1>
      ) : (
        <Row gutter={16}>
          {news?.slice(0, 2)?.map((item: any) => (
            <Col key={item.url} xs={24} sm={12}>
              {renderNewsItem(item)}
            </Col>
          ))}
        </Row>
      )}

      {selectedNewsUrl && (
        <div style={{ marginTop: "32px" }}>
          <Button type="default" onClick={() => setSelectedNewsUrl(null)}>
            Close News
          </Button>
          <iframe
            src={selectedNewsUrl}
            style={{
              width: "100%",
              height: "500px",
              border: "none",
              marginTop: "16px",
            }}
            title="News"
          />
        </div>
      )}
    </>
  );
};

export default TopNews;
