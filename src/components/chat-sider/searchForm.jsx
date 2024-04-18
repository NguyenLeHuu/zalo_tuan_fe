import {
  Button,
  Col,
  Input,
  Row,
  Modal,
  List,
  Avatar,
  Upload,
  Divider,
  Checkbox,
} from "antd";
import { CiSearch } from "react-icons/ci";
import { AiOutlineUserAdd, AiOutlineUsergroupAdd } from "react-icons/ai";
import { UploadOutlined } from "@ant-design/icons";
import { useState } from "react";

function SearchForm() {
  const avatarStyle = {
    margin: "10px 0px 0px 5px",
    border: "0px",
  };

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isGroupModalVisible, setGroupModalVisible] = useState(false);

  const [selectedCheckbox, setSelectedCheckbox] = useState({});

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const showGroupModal = () => {
    setGroupModalVisible(true);
  };

  const handleGroupOk = () => {
    setGroupModalVisible(false);
  };

  const handleGroupCancel = () => {
    setGroupModalVisible(false);
  };

  const handleCheckboxClick = (index) => {
    setSelectedCheckbox((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  // Combined data for search results and friend requests
  const searchResults = [
    {
      name: "User 1",
      avatar:
        "http://samkyvuong.vn/wp-content/uploads/2022/05/gai-tay-lanh-lung.jpg",
      isFriend: false,
    },
    {
      name: "User 2",
      avatar:
        "https://i.pinimg.com/736x/35/cf/1b/35cf1b8fa58bcfaec27790f40a4c95aa.jpg",
      isFriend: true,
    },
    {
      name: "User 3",
      avatar:
        "https://i.pinimg.com/originals/2e/35/a6/2e35a66dc08e778e1b7fb130c9cc026e.jpg",
      isFriend: false,
    },
    {
      name: "User 4",
      avatar:
        "https://nhanisme.com/wp-content/uploads/2018/07/nhanisme-ngam-gai-tay-006.jpg",
      isFriend: true,
    },
  ];

  return (
    <>
      <Row>
        <Col span={15}>
          <Input
            size="middle"
            style={{ margin: "10px 10px 0px 10px" }}
            placeholder="search..."
            prefix={<CiSearch />}
          />
        </Col>
        <Col span={1}></Col>
        <Col span={4}>
          <Button type="text" style={avatarStyle} onClick={showModal}>
            <AiOutlineUserAdd size={20} />
          </Button>
        </Col>

        <Col span={4}>
          <Button type="text" style={avatarStyle} onClick={showGroupModal}>
            <AiOutlineUsergroupAdd size={20} />
          </Button>
        </Col>
      </Row>
      <Modal
        title="User Add"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <Input
          size="middle"
          placeholder="Search user..."
          prefix={<CiSearch />}
        />

        <List
          itemLayout="horizontal"
          dataSource={searchResults}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src={item.avatar} />}
                title={item.name}
              />
              {!item.isFriend && <Button type="primary">AddFriend</Button>}
            </List.Item>
          )}
        />
      </Modal>
      <Modal
        title="Group Add"
        visible={isGroupModalVisible}
        onCancel={handleGroupCancel}
        footer={null}
      >
        <Upload>
          <Button icon={<UploadOutlined />}>Upload Group Image</Button>
        </Upload>
        <Input placeholder="Enter group name..." />
        <Divider />
        <Input placeholder="Search user..." prefix={<CiSearch />} />
        <Divider />
        <List
          itemLayout="horizontal"
          dataSource={searchResults}
          renderItem={(item, index) => (
            <List.Item>
              <Checkbox
                checked={selectedCheckbox[index]}
                onClick={() => handleCheckboxClick(index)}
              />
              <List.Item.Meta
                avatar={<Avatar src={item.avatar} />}
                title={item.name}
              />
            </List.Item>
          )}
        />
        <Divider />
        <Button type="primary">Create Group</Button>
        <Button onClick={handleGroupCancel}>Cancel</Button>
      </Modal>
    </>
  );
}

export default SearchForm;
