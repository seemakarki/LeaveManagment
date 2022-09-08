import {
  ApartmentOutlined,
  DollarCircleOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserDeleteOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import { Button, Divider, Menu, Typography } from "antd";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";

const items = [
  {
    key: "1",
    icon: <ApartmentOutlined style={{ fontSize: "1.2rem" }} />,
    label: "Department",
  },
  {
    key: "2",
    icon: <UsergroupAddOutlined style={{ fontSize: "1.2rem" }} />,
    label: "Employee",
  },
  {
    key: "3",
    icon: <UserDeleteOutlined style={{ fontSize: "1.2rem" }} />,
    label: "Leave",
  },
  {
    key: "4",
    icon: <DollarCircleOutlined style={{ fontSize: "1.2rem" }} />,
    label: "Salary",
  },
  {
    key: "5",
    icon: <LogoutOutlined style={{ fontSize: "1.2rem" }} />,
    label: "Logout",
  },
];

const SidebarMenu = () => {
  const [collapsed, setCollapsed] = useState(false);
  const history = useHistory();
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const pageChange = (value: any) => {
    // window.href
    const menuModel = items.find((item) => item.key === value.key);

    if (menuModel?.key === "1") {
      history.push("/depart");
    }
    if (menuModel?.key === "2") {
      history.push("/employee");
    }
    if (menuModel?.key === "3") {
      history.push("/leave");
    }
    if (menuModel?.key === "4") {
      history.push("/salary");
    }
    if (menuModel?.key === "5") {
      localStorage.clear();
      window.location.href = "/login";
    }
  };

  return (
    <div
      style={{
        width: 256,
        height: "590px",
        position: "fixed",
        top: 0,
      }}
    >
      <Link to="/dashboard">
        <StyleButton>
          <Typography
            style={{
              fontSize: "1.05rem",
              fontWeight: "bold",
              color: "#fff",
              textTransform: "uppercase",
            }}
          >
            Leave Management
          </Typography>
          <Button
            type="primary"
            style={{
              backgroundColor: "teal",
              width: "80px",
              boxShadow: "none",
              border: "none",
            }}
          >
            <MenuFoldOutlined />
          </Button>
        </StyleButton>
      </Link>
      {/* {collapsed ? (
        <Button
          type="primary"
          onClick={toggleCollapsed}
          style={{ width: "80px" }}
        >
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </Button>
      ) : (
        <StyleButton>
          <Button type="primary" onClick={toggleCollapsed}>
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </Button>
        </StyleButton>
      )} */}
      <Menu
        // defaultSelectedKeys={['1']}
        onClick={(value) => pageChange(value)}
        mode="inline"
        inlineCollapsed={collapsed}
        items={items}
        style={{
          fontSize: "1.1rem",
          height: "100%",
          backgroundColor: "	#008080",
          color: "#fff",
        }}
      />
    </div>
  );
};

export default SidebarMenu;

const StyleButton = styled.div`
  background-color: teal;
  display: flex;
  padding: 9px 0;
  justify-content: space-around;
  align-items: flex-end;
  border-bottom: 2px solid #fff;
`;
