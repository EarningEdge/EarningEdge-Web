import React from "react";


import {Newspaper,CandlestickChartIcon,House,NotebookPen} from 'lucide-react'
export const menuItems = [
  {
    key: "1",
    icon: React.createElement(House),
    label: "Home",
    path: "/home",
  },
  {
    key: "2",
    icon: React.createElement(NotebookPen),
    label: "Journal",
    path: "/journal",
  },
  {
    key: "3",
    icon: React.createElement(Newspaper),
    label: "news",
    path: "/news",
  },
  {
    key: "4",
    icon: React.createElement(CandlestickChartIcon),
    label: "Stocks Screen",
    path: "/stocks",
  },
  // {
  //   key: "5",
  //   icon: React.createElement(UserOutlined),
  //   label: "Profile",
  //   path: "/profile",
  // },
];
