import { ApiFilled, HomeFilled } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { Header } from "antd/es/layout/layout";
import React from "react";

type Props = {};

const CustomLayout = ({ children }: any) => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      {children}
      <Header className="fixed bottom-0 z-10 w-full flex justify-evenly items-center text-white text-4xl gap-20">
        <div className="w-full text-center">
          <HomeFilled
            className="cursor-pointer"
            onClick={() => {
              window.location.href = "/dashboard";
            }}
          />
        </div>

        <div className="w-full text-center">
          <ApiFilled className="cursor-pointer" />
        </div>
      </Header>
    </Layout>
  );
};

export default CustomLayout;
