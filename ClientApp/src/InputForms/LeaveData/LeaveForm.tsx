import { Button, Col, DatePicker, Form, Input, Row, Select } from "antd";
import TextArea from "antd/lib/input/TextArea";
import React from "react";
import styled from "styled-components";

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

const onFinish = (values: any) => {
  console.log(values);
};

const config = {
  rules: [
    { type: "object" as const, required: true, message: "Please select time!" },
  ],
};

const LeaveForm = () => {
  return (
    <StyleEmployeeForm>
      <Form
        layout="vertical"
        name="nest-messages"
        onFinish={onFinish}
        validateMessages={validateMessages}
      >
        <Row gutter={[30, 30]}>
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
            {/* <Form.Item
              name={["user", "Type"]}
              label="Leave Type"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item> */}
          </Col>
          <Col span={8}>
            <Form.Item
              name={["user", "status"]}
              label="Leave Status"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name={["user", "days"]}
              label="Days"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[80, 80]}>
          <Col span={12}>
            <Form.Item name="fromDate" label="From Date" {...config}>
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="toDate" label="To Date" {...config}>
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Form.Item
              name={["user", "reason"]}
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
  );
};

export default LeaveForm;

const StyleEmployeeForm = styled.div`
  width: 80%;
  /* border: 1px solid #fff000; */
  margin: 20px auto;
  padding: 20px;
`;
