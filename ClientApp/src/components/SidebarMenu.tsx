import {
  ApartmentOutlined,
  DollarCircleOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserDeleteOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import { Button, Menu } from "antd";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
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
      console.log("Hello", menuModel?.key);
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
      window.location.href = "/"
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
      {collapsed ? (
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
      )}
      <Menu
        // defaultSelectedKeys={['1']}
        onClick={(value) => pageChange(value)}
        mode="inline"
        theme="dark"
        inlineCollapsed={collapsed}
        items={items}
        style={{ fontSize: "1.1rem", height: "100%" }}
      />
    </div>
  );
};

export default SidebarMenu;

const StyleButton = styled.div`
  background-color: #001529;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
`;
