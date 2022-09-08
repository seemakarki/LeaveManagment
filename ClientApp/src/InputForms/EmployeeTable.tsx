import {
  DeleteOutlined,
  DownloadOutlined,
  EditFilled,
  PlusOutlined,
} from "@ant-design/icons";
import { Button, Space } from "antd";
import Search from "antd/lib/input/Search";
import Table, { ColumnsType } from "antd/lib/table";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, Route, RouteComponentProps, Switch } from "react-router-dom";
import styled from "styled-components";
import SidebarMenu from "../components/SidebarMenu";
import { get } from "../services/authAjaxService";
import EmployeeForm from "./EmployeeForm";
import TopBar from "./TopBar";
export interface employee {
  id: number;
  firstName: string;
  middleName: string;
  lastName: string;
  address: string;
  dob: string;
  designation: string;
  position: string;
  gender: string;
  phoneNo: string;
  email: string;
}

const EmployeeTable = () => {
  const [employee, setEmployee] = useState<employee[]>([]);

  const getData = async () => {
    const res = await get<employee[]>("http://localhost:5002/employee/List");
    if (res) {
      setEmployee(res.data);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  console.log(employee);

  const handleDelete = (id: any) => {
    const deleteEmployee = employee.filter((emp) => emp.id !== id);
    setEmployee(deleteEmployee);
  };

  const columns: ColumnsType<employee> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (_, info) => (
        <span>
          {info.firstName} {info.middleName} {info.lastName}
        </span>
      ),
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
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "",
      key: "id",
      dataIndex: "id",
      render: (val, rec) => (
        <div style={{ cursor: "pointer" }}>
          <EditFilled
            onClick={() => (window.location.href = `/employee/add/${rec.id}`)}
          />
        </div>
      ),
    },
    {
      title: "",
      key: "id",
      render: (_, record) => {
        console.log(record);

        return (
          <div style={{ cursor: "pointer" }}>
            <DeleteOutlined onClick={() => handleDelete(record.id)} />
          </div>
        );
      },
    },
  ];

  const onSearch = (value: string) => console.log(value);

  return (
    <div style={{ width: "100%" }}>
    
      <TopBar />
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
</Switch>;
export default EmployeeTable;

const EmployeeAdd = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  /* margin: 10px; */
`;
