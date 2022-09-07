import { BellOutlined, MailOutlined } from "@ant-design/icons";
import { Typography, Badge, Button, Input, message, Modal } from "antd";
import TextArea from "antd/lib/input/TextArea";
import React, { ChangeEvent, useState } from "react";

const TopBar = () => {
  const [contactModal, setContactModal] = useState(false);
  const [notificationModal, setNotificationModal] = useState(false);
  const [inputDetails, setInputDetails] = useState({
    from: "",
    to: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleContact = () => {
    setContactModal(true);
  };

  const handleContactClose = () => {
    setContactModal(false);
    setInputDetails({
      from: "",
      to: "",
      subject: "",
      message: "",
    });
  };

  const handleSend = () => {
    if (inputDetails.from.length > 0 && inputDetails.to.length > 0) {
      setLoading(true);
      setTimeout(() => {
        message.success("Message sent successful!");
        setLoading(false);
        setContactModal(false);
        setInputDetails({
          from: "",
          to: "",
          subject: "",
          message: "",
        });
      }, 3000);
    } else {
      message.error("From and To fields are required");
    }
  };

  const handleInput = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setInputDetails({ ...inputDetails, [name]: value });
  };

  const name: string = "Dadip Bhattarai";
  const splitName = name.toUpperCase().split(" ");
  const value =
    splitName.length > 1
      ? `${splitName[0][0]}${splitName[1][0]}`
      : `${splitName[0][0]}${splitName[0][1]}`;

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          height: "50px",
          justifyContent: "flex-end",
          backgroundColor: "teal",
          paddingRight: "20px",
        }}
      >
        <span onClick={handleContact}>
          <MailOutlined style={{ fontSize: "25px", color: "#fff" }} />
        </span>
        <Badge size="small" count={5} style={{ margin: "0 15px" }}>
          <BellOutlined
            style={{ fontSize: "25px", color: "#fff", margin: "0 15px" }}
            onClick={() => setNotificationModal(true)}
          />
        </Badge>
        <Typography
          style={{
            backgroundColor: "gray",
            padding: "5px 8px",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            color: "white",
            fontSize: "1.1rem",
          }}
        >
          {value}
        </Typography>
      </div>
      <Modal
        title="New Message"
        visible={contactModal}
        onCancel={handleContactClose}
        onOk={handleSend}
        footer={[
          <Button type="primary" onClick={handleContactClose}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={loading}
            onClick={handleSend}
          >
            Submit
          </Button>,
        ]}
      >
        <Input
          placeholder="From"
          bordered={false}
          style={borderBottom}
          allowClear={true}
          name="from"
          size={"large"}
          onChange={handleInput}
          value={inputDetails.from}
        />
        <Input
          placeholder="To"
          bordered={false}
          style={borderBottom}
          allowClear={true}
          name="to"
          size={"large"}
          onChange={handleInput}
          value={inputDetails.to}
        />
        <Input
          placeholder="Subject"
          bordered={false}
          style={borderBottom}
          allowClear={true}
          name="subject"
          size={"large"}
          onChange={handleInput}
          value={inputDetails.subject}
        />
        <TextArea
          placeholder="Write your message!"
          autoSize={{ minRows: 8 }}
          bordered={false}
          allowClear={true}
          name="message"
          size={"large"}
          onChange={handleInput}
          value={inputDetails.message}
        />
      </Modal>

      {/* Notification */}
      <Modal
        title="Notifications"
        centered
        visible={notificationModal}
        onOk={() => setNotificationModal(false)}
        onCancel={() => setNotificationModal(false)}
        width={400}
        footer={[
          <Button type="primary" onClick={() => setNotificationModal(false)}>
            Cancel
          </Button>,
        ]}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          <img
            style={userImage}
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8&w=1000&q=80"
            alt="user profile"
          />
          <div
            style={{ display: "flex", flexWrap: "wrap", marginLeft: "10px" }}
          >
            <Typography.Title level={4}>Simran Kattel</Typography.Title>{" "}
            <span style={{ fontSize: "1.1rem", marginTop: "-15px" }}>
              wants to leave half day!
            </span>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          <img
            style={userImage}
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8&w=1000&q=80"
            alt="user profile"
          />
          <div
            style={{ display: "flex", flexWrap: "wrap", marginLeft: "10px" }}
          >
            <Typography.Title level={4}>Simran Kattel</Typography.Title>{" "}
            <span style={{ fontSize: "1.1rem", marginTop: "-15px" }}>
              wants to leave half day!
            </span>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          <img
            style={userImage}
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8&w=1000&q=80"
            alt="user profile"
          />
          <div
            style={{ display: "flex", flexWrap: "wrap", marginLeft: "10px" }}
          >
            <Typography.Title level={4}>Simran Kattel</Typography.Title>{" "}
            <span style={{ fontSize: "1.1rem", marginTop: "-15px" }}>
              wants to leave half day!
            </span>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default TopBar;

const borderBottom = {
  borderBottom: "1px solid #d8d6d6",
};
const userImage = {
  width: "80px",
  height: "70px",
  borderRadius: "50%",
};
