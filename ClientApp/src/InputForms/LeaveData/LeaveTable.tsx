import { MinusCircleOutlined } from "@ant-design/icons";
import { Button, Space } from "antd";
import Table, { ColumnsType } from "antd/lib/table";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

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

const LeaveTable = () => {
  const [leaveEmployee, setLeaveEmployee] = useState<any>([]);

  const FetchData = async () => {
    const res = await axios.get("http://localhost:5002/leave/List");

    if (res) {
      setLeaveEmployee(res.data);
    }
  };

  useEffect(() => {
    FetchData();
  }, []);

  console.log(leaveEmployee);

  const columns: ColumnsType<DataType> = [
    {
      title: "S.N",
      dataIndex: "employeeId",
      key: "key",
    },
    {
      title: "Name",
      dataIndex: "employeeName",
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
      dataIndex: "fromDate",
      key: "fromdate",
    },
    {
      title: "To Date",
      dataIndex: "toDate",
      key: "todate",
    },
    {
      title: "Reason",
      dataIndex: "reference",
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
      <Table columns={columns} dataSource={leaveEmployee} />
    </div>
  );
};

export default LeaveTable;

const EmployeeAdd = styled.div`
  display: flex;
  justify-content: flex-end;
  /* margin: 10px; */
`;
