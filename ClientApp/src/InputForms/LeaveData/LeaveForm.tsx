import { Button, Col, DatePicker, Form, Row, Select } from "antd";
import { useForm } from "antd/lib/form/Form";
import TextArea from "antd/lib/input/TextArea";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import SidebarMenu from "../../components/SidebarMenu";
import { showSuccessMessage } from "../../services/user.service";
import { employee } from "../EmployeeTable";
import TopBar from "../TopBar";

const { Option } = Select;

const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};

const config = {
  rules: [
    { type: "object" as const, required: true, message: "Please select time!" },
  ],
};

export const BooleanStatus = {
  Yes: true,
  No: false,
} as const;

const LeaveForm = () => {
  const [employee, setEmployee] = useState<employee[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<employee | any>();
  const [form] = useForm();
  const history = useHistory();
  const onFinish = async (values: any) => {
    const response = await axios.post<any>("http://localhost:5002/leave", {
      employeeId: Number(values.employee),
      type: values.leavetype,
      status: values.status,
      fromDate: values.fromDate,
      toDate: values.toDate,
      reference: values.reason,
    });
    if (response) {
      showSuccessMessage("succes");
      form.resetFields();
      history.push("/leave");
    }
  };

  // const FetchData = async () => {
  //   const { data } = await axios.get("http://localhost:5002/employee/List");
  //   setEmployee(data);
  // };

  // useEffect(() => {
  //   FetchData();
  // }, []);

  const onSelectEmployee = (id: any) => {
    const findEmployee = employee.filter((eid) => eid.id === id);
    setSelectedEmployee(findEmployee[0]);
  };

  console.log(employee);

  return (
    <>
      <TopBar />
      <StyleEmployeeForm>
        <Form
          layout="vertical"
          name="nest-messages"
          onFinish={onFinish}
          validateMessages={validateMessages}
          form={form}
        >
          <Row gutter={[30, 30]}>
            <Col span={8}>
              <Form.Item
                name="employee"
                label="Employee Name"
                // rules={[{ required: true }]}
              >
                <Select
                  placeholder="Select Type"
                  onChange={onSelectEmployee}
                  allowClear
                >
                  <Option value={1}>Dadip</Option>
                  <Option value={2}>Tilak</Option>
                  <Option value={3}>Ramesh</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="leavetype"
                label="Leave Type"
                rules={[{ required: true }]}
              >
                <Select
                  placeholder="Select Type"
                  // onChange={onGenderChange}
                  allowClear
                >
                  <Option value="half">Half Day</Option>
                  <Option value="full">Full Day</Option>
                  <Option value="other">other</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name={"status"}
                label="Leave Status"
                rules={[{ required: true }]}
              >
                <Select placeholder="Select Type" allowClear>
                  <Option value={BooleanStatus.Yes}>True</Option>
                  <Option value={BooleanStatus.No}>False</Option>
                </Select>
              </Form.Item>
            </Col>
            {/* <Col span={8}>
            <Form.Item name={"days"} label="Days" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </Col> */}
          </Row>
          <Row gutter={[50, 50]}>
            <Col span={8}>
              <Form.Item name="fromDate" label="From Date" {...config}>
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="toDate" label="To Date" {...config}>
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Form.Item
                name={"reason"}
                label="Reason"
                rules={[{ required: true }]}
              >
                <TextArea
                  rows={4}
                  placeholder="Enter your Reasons"
                  style={{ resize: "none" }}
                  maxLength={100}
                />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </StyleEmployeeForm>
    </>
  );
};

export default LeaveForm;

const StyleEmployeeForm = styled.div`
  width: 80%;
  /* border: 1px solid #fff000; */
  margin: 20px auto;
  padding: 20px;
`;
