"use client"

import { useState, useEffect } from 'react';
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import DoneOutlineOutlinedIcon from "@mui/icons-material/DoneOutlineOutlined";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import TextSnippetOutlinedIcon from "@mui/icons-material/TextSnippetOutlined";
import { supabase } from "@/utils/supabase/client";
import { useSelector } from 'react-redux';
import { selectRole } from '@/redux/slice/authSlice';

const fetchRoleButtons = () => {
  const [roleButtons, setRoleButtons] = useState([]);
  const userRole = useSelector(selectRole)

  useEffect(() => {
    const getUserProfile = async() => {
      const { data: { session } } = await supabase.auth.getSession();

      if (userRole === "admin") {
        setRoleButtons([
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
            icon: <GroupOutlinedIcon />,
            href: "/pages/accounts",
            tooltip: "List of Accounts",
          },
          {
            name: "MOA Status",
            icon: <DoneOutlineOutlinedIcon />,
            href: "/pages/moa-status",
            tooltip: "MOA Status",
          },
          {
            name: "Changelog",
            icon: <TextSnippetOutlinedIcon />,
            href: "/pages/changelog",
            tooltip: "Changelog",
          },
        ])
      } else if (userRole === "faculty") {
        setRoleButtons([
          { name: "Home", icon: <HomeOutlinedIcon />, href: "/", tooltip: "Home" },
          {
            name: "Explore",
            icon: <ExploreOutlinedIcon />,
            href: "/pages/explore",
            tooltip: "List of Careers",
          },
          {
            name: "MOA Status",
            icon: <DoneOutlineOutlinedIcon />,
            href: "/pages/moa-status",
            tooltip: "MOA Status",
          },
          {
            name: "Changelog",
            icon: <TextSnippetOutlinedIcon />,
            href: "/pages/changelog",
            tooltip: "Changelog",
          },
        ])
      } else if (userRole === "company") {
        setRoleButtons([
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
        ])
      } else if (userRole === "applicant") {
        setRoleButtons([
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
            href: `/pages/profile/${session.user.id}`,
            tooltip: "Profile",
          },
        ])
      }
    }

    getUserProfile()
  }, [userRole])

  return roleButtons
}

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

export default fetchRoleButtons;
