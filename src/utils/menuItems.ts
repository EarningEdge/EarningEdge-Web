import React from "react";
import { Users, House, Book } from "lucide-react";

export const menuItems = [
  {
    key: "1",
    icon: React.createElement(House),
    label: "Home",
    path: "/home",
  },
  {
    key: "4",
    icon: React.createElement(Users), // Changed to Users icon for Groups
    label: "Groups",
    path: "/group",
  },
  {
    key: "2",
    icon: React.createElement(Book),
    label: "Journal",
    path: "/journal",
  },
  // {

  //   key: "3",
  //   icon: React.createElement(Newspaper),
  //   label: "News",
  //   path: "/news",
  // },
  // {
  //   key: "5",
  //   icon: React.createElement(PlayCircle),
  //   label: "Course",
  //   path: "/course",
  // },
];
