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
import React, { useState } from "react";
import { FetchListUser, AddFriend, FetchGroups } from "../../redux/slices/app";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../../configs/axios-conf";
function SearchForm() {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const dispatch = useDispatch();
  const [searchResultsVip, setSearchResults] = useState([]);

  const { ListUser } = useSelector((state) => state.app);
  React.useEffect(() => {
    dispatch(FetchListUser());
  }, [dispatch]);
  React.useEffect(() => {
    console.log("ds user ", ListUser);
    const searchResults1 = ListUser?.map((user) => {
      return {
        id: user._id,
        name: user.fullname,
        avatar: user.photoUrl,
        isFriend: user.friends?.some(
          (friendID) => friendID === window.localStorage.getItem("user_id")
        ),
        isInvited: user.receivedFriendRequests?.some(
          (friendID) => friendID === window.localStorage.getItem("user_id")
        ),
        hasInvited: user.friendRequests?.some(
          (friendID) => friendID === window.localStorage.getItem("user_id")
        ),
      };
    });
    setSearchResults(searchResults1);
    console.log("ds user mới ", searchResultsVip);
  }, [ListUser]);

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
    console.log("mảng user ", selectedCheckbox);
  };

  const createGroup = async (name, image) => {
    console.log("sắp thêm group: ", name);
    console.log("sắp thêm group: ", image);
    await axiosInstance
      .post(
        `/groups/groups?name=${name}&uid=${window.localStorage.getItem(
          "user_id"
        )}`,
        {
          selectedMembers: selectedCheckbox,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${window.localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        console.log("response tạo nhóm :", response.data);
        dispatch(FetchGroups());
        setGroupModalVisible(false);
      })
      .catch((error) => {
        console.log("error :", error);
      });
  };

  const handleImageUpload = (info) => {
    if (info.file.status === "done") {
      setGroupImage(info.file.originFileObj);
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
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
          // dataSource={searchResults}
          dataSource={searchResultsVip}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src={item.avatar} />}
                title={item.name}
              />
              {item.hasInvited ? (
                <Button
                  type="primary"
                  // onClick={() => dispatch(AddFriend(item.id))}
                >
                  Accept
                </Button>
              ) : (
                !item.isFriend &&
                !item.isInvited && (
                  <Button
                    type="primary"
                    onClick={() => dispatch(AddFriend(item.id))}
                  >
                    AddFriend
                  </Button>
                )
              )}
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
        <Upload beforeUpload={() => false} onChange={handleImageUpload}>
          <Button icon={<UploadOutlined />}>Upload Group Image</Button>
        </Upload>
        <Input
          placeholder="Enter group name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Divider />
        <Input placeholder="Search user..." prefix={<CiSearch />} />
        <Divider />
        <List
          itemLayout="horizontal"
          dataSource={searchResultsVip}
          renderItem={(item, index) => (
            <List.Item>
              <Checkbox
                checked={selectedCheckbox[item.id]}
                onClick={() => handleCheckboxClick(item.id)}
              />
              <List.Item.Meta
                avatar={<Avatar src={item.avatar} />}
                title={item.name}
              />
            </List.Item>
          )}
        />
        <Divider />
        <Button type="primary" onClick={() => createGroup(name, image)}>
          Create Group
        </Button>
        <Button onClick={handleGroupCancel}>Cancel</Button>
      </Modal>
    </>
  );
}

export default SearchForm;
