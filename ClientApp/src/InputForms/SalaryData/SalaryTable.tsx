import { DollarCircleOutlined } from "@ant-design/icons";
import { Button, Space } from "antd";
import Table, { ColumnsType } from "antd/lib/table";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const SalaryTable = () => {
  interface DataType {
    key: number;
    name: string;
    account: string;
    leave: string;
    month: string;
    year: string;
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
      title: "Account No.",
      dataIndex: "account",
      key: "account",
    },
    {
      title: "Leave",
      dataIndex: "leave",
      key: "leave",
    },
    {
      title: "Month",
      dataIndex: "month",
      key: "month",
    },
    {
      title: "Year",
      dataIndex: "year",
      key: "year",
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
      account: "098477436436732",
      leave: "4/20 Days",
      month: "june",
      year: "2022",
    },
  ];

  return (
    <div style={{ width: "100%" }}>
      <EmployeeAdd>
        <Link to="/salary/add">
          <Button
            type="primary"
            // shape="round"
            style={{ margin: "10px" }}
            icon={<DollarCircleOutlined />}
            size="large"
          >
            Add Salary Slip
          </Button>
        </Link>
      </EmployeeAdd>

      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default SalaryTable;

const EmployeeAdd = styled.div`
  display: flex;
  justify-content: flex-end;
  /* margin: 10px; */
`;
