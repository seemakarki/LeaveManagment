import { DownloadOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Space } from "antd";
import Search from "antd/lib/input/Search";
import Table, { ColumnsType } from "antd/lib/table";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const EmployeeTable = () => {
  interface DataType {
    key: number;
    name: string;
    address: string;
    dateofbirth: string;
    contact: string;
    position: string;
  }

  const columns: ColumnsType<DataType> = [
    {
      title: "S.N",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      //   render: (text: any) => <a>{text}</a>,
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Date of Birth",
      dataIndex: "dateofbirth",
      key: "dateofbirth",
    },
    {
      title: "Position",
      dataIndex: "position",
      key: "position",
    },
    {
      title: "Contact",
      dataIndex: "contact",
      key: "contact",
    },

    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="large">
          <a>Edit</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];
  const data: DataType[] = [
    {
      key: 1,
      name: "Dadip Bhattarai",
      address: "Rawabeshi-3, Khotang",
      dateofbirth: "1998-11-26",
      contact: "9860832019",
      position: "Front End Developer",
    },
  ];
  const onSearch = (value: string) => console.log(value);

  return (
    <div style={{ width: "100%" }}>
      <EmployeeAdd>
        <Search
          placeholder="Search Here"
          enterButton="Search"
          size="large"
          style={{ width: "300px" }}
          onSearch={onSearch}
        />
        <Link to="/employee/add">
          <Button
            type="primary"
            // shape="round"
            style={{ margin: "10px" }}
            icon={<PlusOutlined />}
            size="large"
          >
            Add Employee
          </Button>
        </Link>
      </EmployeeAdd>

      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default EmployeeTable;

const EmployeeAdd = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  /* margin: 10px; */
`;
