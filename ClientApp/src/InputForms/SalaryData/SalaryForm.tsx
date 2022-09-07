import { Button, Col, DatePicker, Form, Input, Row, Select } from "antd";
import { useForm } from "antd/lib/form/Form";
import TextArea from "antd/lib/input/TextArea";
import axios from "axios";
import React from "react";
import styled from "styled-components";
import SidebarMenu from "../../components/SidebarMenu";
import { showSuccessMessage } from "../../services/user.service";
import { BooleanStatus } from "../LeaveData/LeaveForm";
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

const SalaryForm = () => {
  const [form] = useForm();

  const onFinish = async (values: any) => {
    const response = await axios.post<any>("http://localhost:5002/salary", {
      employeeId: values.name,
      duration: values.days,
      salaryAmt: values.amount,
      status: values.leavestatus,
    });
    if (response) {
      showSuccessMessage("succes");
      form.resetFields();
    }
  };

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
          <Row gutter={[20, 20]}>
            <Col span={6}>
              <Form.Item
                name={"name"}
                label="Employee Name"
                rules={[{ required: true }]}
              >
                <Select
                  placeholder="Select Employee Name"
                  // onChange={onGenderChange}
                  allowClear
                >
                  <Option value={1}>Dadip</Option>
                  <Option value={2}>Bhattaria</Option>
                  <Option value={3}>The-Deep</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                name={"amount"}
                label="Salary Amount"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                name="leavestatus"
                label="Leave Status"
                rules={[{ required: true }]}
              >
                <Select
                  placeholder="Select Type"
                  // onChange={onGenderChange}
                  allowClear
                >
                  <Option value={BooleanStatus.Yes}>True</Option>
                  <Option value={BooleanStatus.No}>False</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                name={"days"}
                label="Days"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
            </Col>
            {/* <Col span={8}>
            <Form.Item
              name={["user", "days"]}
              label="Days"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </Col> */}
          </Row>
          <Row gutter={[20, 20]}>
            {/* <Col span={8}>
            <Form.Item name="month" label="Month" {...config}>
              <DatePicker picker="month" style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="Year" label="Year" {...config}>
              <DatePicker picker="year" style={{ width: "100%" }} />
            </Form.Item>
          </Col> */}
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

export default SalaryForm;

const StyleEmployeeForm = styled.div`
  width: 80%;
  /* border: 1px solid #fff000; */
  margin: 20px auto;
  padding: 20px;
`;
