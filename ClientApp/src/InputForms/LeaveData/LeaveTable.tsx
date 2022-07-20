import { MinusCircleOutlined } from "@ant-design/icons";
import { Button, Space } from "antd";
import Table, { ColumnsType } from "antd/lib/table";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const LeaveTable = () => {
  interface DataType {
    key: number;
    name: string;
    type: string;
    status: string;
    fromdate: string;
    todate: string;
    days: number;
    reason: string;
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
      title: "Leave Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Leave Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "From Date",
      dataIndex: "fromdate",
      key: "fromdate",
    },
    {
      title: "To Date",
      dataIndex: "todate",
      key: "todate",
    },
    {
      title: "Days",
      dataIndex: "days",
      key: "days",
    },
    {
      title: "Reason",
      dataIndex: "reason",
      key: "reason",
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
      type: "Full Day",
      status: "Approaved",
      fromdate: "2022-11-26",
      todate: "2022-11-26",
      days: 3,
      reason: "Whatever, I dont wanna a tell you",
    },
  ];

  return (
    <div style={{ width: "100%" }}>
      <EmployeeAdd>
        <Link to="/leave/add">
          <Button
            type="primary"
            // shape="round"
            style={{ margin: "10px" }}
            icon={<MinusCircleOutlined />}
            size="large"
          >
            Leave Request
          </Button>
        </Link>
      </EmployeeAdd>
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default LeaveTable;

const EmployeeAdd = styled.div`
  display: flex;
  justify-content: flex-end;
  /* margin: 10px; */
`;
