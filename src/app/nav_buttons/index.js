import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import DoneOutlineOutlinedIcon from "@mui/icons-material/DoneOutlineOutlined";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import TextSnippetOutlinedIcon from "@mui/icons-material/TextSnippetOutlined";

import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

const roleButtons = {
  admin: [
    { name: "Home", icon: <HomeOutlinedIcon />, href: "/", tooltip: "Home" },
    {
      name: "Explore",
      icon: <ExploreOutlinedIcon />,
      href: "/pages/explore",
      tooltip: "List of Careers",
    },
    {
      name: "Companies",
      icon: <BusinessOutlinedIcon />,
      href: "/pages/companies",
      tooltip: "List of Companies",
    },
    {
      name: "Accounts",
      icon: <PeopleAltOutlinedIcon />,
      href: "/pages/accounts",
      tooltip: "List of Accounts",
    },
    // {
    //   name: "MOA Status",
    //   icon: <DoneOutlineOutlinedIcon />,
    //   href: "/pages/moa-status",
    //   tooltip: "MOA Status",
    // },
    {
      name: "Changelog",
      icon: <HistoryOutlinedIcon />,
      href: "/pages/changelog",
      tooltip: "Changelog",
    },
    {
      name: "Profile",
      icon: <PermIdentityOutlinedIcon />,
      href: "/pages/profile",
      tooltip: "Profile",
    },
  ],
  faculty: [
    { name: "Home", icon: <HomeOutlinedIcon />, href: "/", tooltip: "Home" },
    {
      name: "Explore",
      icon: <ExploreOutlinedIcon />,
      href: "/pages/explore",
      tooltip: "List of Careers",
    },
    {
      name: "Companies",
      icon: <BusinessOutlinedIcon />,
      href: "/pages/companies",
      tooltip: "List of Companies",
    },
    // {
    //   name: "MOA Status",
    //   icon: <DoneOutlineOutlinedIcon />,
    //   href: "/pages/moa-status",
    //   tooltip: "MOA Status",
    // },
    {
      name: "Changelog",
      icon: <HistoryOutlinedIcon />,
      href: "/pages/changelog",
      tooltip: "Changelog",
    },
    {
      name: "Profile",
      icon: <PermIdentityOutlinedIcon />,
      href: "/pages/profile",
      tooltip: "Profile",
    },
  ],
  company: [
    { name: "Home", icon: <HomeOutlinedIcon />, href: "/", tooltip: "Home" },
    {
      name: "Explore",
      icon: <ExploreOutlinedIcon />,
      href: "/pages/explore",
      tooltip: "List of Careers",
    },
    // {
    //   name: "Companies",
    //   icon: <BusinessOutlinedIcon />,
    //   href: "/pages/companies",
    //   tooltip: "List of Companies",
    // },
    // {
    //   name: "MOA Status",
    //   icon: <DoneOutlineOutlinedIcon />,
    //   href: "/pages/moa-status",
    //   tooltip: "MOA Status",
    // },
    // {
    //   name: "Changelog",
    //   icon: <HistoryOutlinedIcon />,
    //   href: "/pages/changelog",
    //   tooltip: "Changelog",
    // },
    {
      name: "Employees",
      icon: <PeopleAltOutlinedIcon />,
      href: "/pages/employees",
      tooltip: "List of Employees",
    },
    {
      name: "Profile",
      icon: <PermIdentityOutlinedIcon />,
      href: "/pages/profile",
      tooltip: "Profile",
    },
  ],
  user: [
    { name: "Home", icon: <HomeOutlinedIcon />, href: "/", tooltip: "Home" },
    {
      name: "Explore",
      icon: <ExploreOutlinedIcon />,
      href: "/pages/explore",
      tooltip: "List of Careers",
    },
    {
      name: "Profile",
      icon: <PermIdentityOutlinedIcon />,
      href: "/pages/profile",
      tooltip: "Profile",
    },
  ],
};

export default roleButtons;
