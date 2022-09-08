import { DollarCircleOutlined } from "@ant-design/icons";
import { Button, Space } from "antd";
import Table, { ColumnsType } from "antd/lib/table";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import SidebarMenu from "../../components/SidebarMenu";
import { get } from "../../services/authAjaxService";
import TopBar from "../TopBar";

interface DataType {
  key: number;
  name: string;
  account: string;
  leave: string;
  month: string;
  year: string;
}

const SalaryTable = () => {
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
  const [salary, setSalary] = useState<DataType[]>([]);

  const FetchData = async () => {
    const res = await get<DataType[]>("http://localhost:5002/salary/List");

    if (res) {
      setSalary(res.data);
    }
  };

  useEffect(() => {
    FetchData();
  }, []);


  return (
    <div style={{ width: "100%" }}>
      <TopBar />
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

      <Table columns={columns} dataSource={salary} />
    </div>
  );
};

export default SalaryTable;

const EmployeeAdd = styled.div`
  display: flex;
  justify-content: flex-end;
  /* margin: 10px; */
`;
