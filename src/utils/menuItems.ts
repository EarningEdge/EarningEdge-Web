import React from "react";

import {HomeFilled,BookFilled, UserOutlined} from "@ant-design/icons"

export const menuItems = [
  {
    key: "1",
    icon: React.createElement(HomeFilled),
    label: "Home",
    path: "/home",
  },
  {
    key: "2",
    icon: React.createElement(BookFilled),
    label: "Journal",
    path: "/journal",
  },
  {
    key: "3",
    icon: React.createElement(UserOutlined),
    label: "Profile",
    path: "/profile",
  }

];
     