import { DeleteOutlined, DownloadOutlined, EditFilled, PlusOutlined } from "@ant-design/icons";
import { Button, Space } from "antd";
import Search from "antd/lib/input/Search";
import Table, { ColumnsType } from "antd/lib/table";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, Route, RouteComponentProps, Switch } from "react-router-dom";
import styled from "styled-components";
import EmployeeForm from "./EmployeeForm";
export interface employee {
  id: number
  firstName: string;
  address: string;
  dob: string;
  designation: string
  position: string;
  gender: string
  phoneNo: string
}

const EmployeeTable = () => {

  const [employee, setEmployee] = useState<employee[]>([])
  const [entryMode, setEntryMode] = useState<boolean>();
  const [editId, setEditId] = useState<number>();

  const getData = async () => {
    const res: any = await axios.get<employee[]>("http://localhost:5002/employee/List")

    if (res) {
      setEmployee(res.data)
    }
  }

  useEffect(() => {
    getData()
  }, [])


  const columns: ColumnsType<employee> = [
    {
      title: "Name",
      dataIndex: "firstName",
      key: "firstName",
      //   render: (text: any) => <a>{text}</a>,
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Date of Birth",
      dataIndex: "dob",
      key: "dob",
    },
    {
      title: "Position",
      dataIndex: "designation",
      key: "designation",
    },

    {
      title: "Contact",
      dataIndex: "phoneNo",
      key: "phoneNo",
    },
    {
      title: "",
      key: "id",
      dataIndex: "id",
      render: (val, rec) => (
        <div style={{ cursor: 'pointer' }} ><EditFilled
         onClick={() => window.location.href = `/employee/add/${rec.id}`} /></div>
      ),
    },
    {
      title: "",
      key: "id",
      render: (_, record) => (
        <div style={{ cursor: 'pointer' }} ><DeleteOutlined /></div>
      ),
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

      <Table columns={columns} dataSource={employee} />
    </div>
  );
};

<Switch>
<React.Suspense fallback={true}>
  <Route path={`/employee/add/:id?`} component={EmployeeForm} />
</React.Suspense>
</Switch>
export default EmployeeTable;

const EmployeeAdd = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  /* margin: 10px; */
`;
