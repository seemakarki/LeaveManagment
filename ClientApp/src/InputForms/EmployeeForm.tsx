import React from "react";
import { Button, Col, DatePicker, Form, Input, Row, Select } from "antd";
import styled from "styled-components";
import axios from "axios";
import { SliderValueLabelUnstyled } from "@mui/base";

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


const onFinish = async (values: any) => {

  const res = await axios.post<any>("/employee", {
    id: 1,
    departmentId: values.department,
    firstName: values.name,
    middleName: "",
    lastName: "",
    gender: values.gender,
    address: values.address,
    dob: values.dob,
    phoneNo: values.contact,
    email: "",
    designation: values.position,
    createdOn: new Date()
  });

  if (res) {
    console.log("succes");
  }
};

const config = {
  rules: [
    { type: "object" as const, required: true, message: "Please select time!" },
  ],
};

const EmployeeForm = () => {
  return (
    <StyleEmployeeForm>
      <Form
        layout="vertical"
        name="nest-messages"
        onFinish={onFinish}
        validateMessages={validateMessages}
      >
        <Row gutter={[16, 16]}>
          <Col span={8}>
            <Form.Item
              name={"name"}
              label="Name"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name={"address"}
              label="Address"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="dob" label="Date of Birth" {...config}>
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={6}>
            <Form.Item
              name={"contact"}
              label="Contact"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              name={"position"}
              label="Position"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              name="gender"
              label="Gender"
              rules={[{ required: true }]}
            >
              <Select
                placeholder="Select Gender"
                // onChange={this.onGenderChange}
                allowClear
              >
                <Option value="male">Male</Option>
                <Option value="female">Female</Option>
                <Option value="other">Other</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              name="department"
              label="Department"
              rules={[{ required: true }]}
            >
              <Select
                placeholder="Select Depart"
                // onChange={this.onDepartChange}
                allowClear
              >
                <Option value="depart1">Depart1</Option>
                <Option value="depart2">Depart2</Option>
                <Option value="depart3">Depart3</Option>
              </Select>
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
  );
};

export default EmployeeForm;

const StyleEmployeeForm = styled.div`
  width: 80%;
  /* border: 1px solid #fff000; */
  margin: 20px auto;
  padding: 20px;
`;
