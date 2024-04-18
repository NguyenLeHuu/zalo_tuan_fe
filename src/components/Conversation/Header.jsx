import React from "react";
import {
  Box,
  Stack,
  IconButton,
  Avatar,
  Typography,
  Divider,
} from "@mui/material";
import { Modal, List, Checkbox, Button } from "antd";
import { faker } from "@faker-js/faker";
import { alpha, styled, useTheme } from "@mui/material/styles";
import { MagnifyingGlass, VideoCamera, Phone, CaretDown } from "phosphor-react";
import StyledBadge from "../../styles/StyledBadge";
import { TonggleSiderbar } from "../../redux/slices/app";
import { useDispatch, useSelector } from "../../redux/store";
import axiosInstance from "../../configs/axios-conf";
import { FetchGroups } from "../../redux/slices/app";

const Header = () => {
  const theme = useTheme();
  const [selectedCheckbox, setSelectedCheckbox] = React.useState({});

  const dispatch = useDispatch();
  const { nameHeader } = useSelector((state) => state.app);
  const { ListUser, curent_id } = useSelector((state) => state.app);
  const [isModalVisible, setIsModalVisible] = React.useState(false);

  console.log("list us", ListUser);

  const Addmember = async () => {
    console.log("sắp thêm groupId: ", curent_id);
    setIsModalVisible(false);
    await axiosInstance
      .post(
        `/groups/groups/addMember/${curent_id}`,
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
        console.log("response thêm thành viên :", response.data);
        dispatch(FetchGroups());
      })
      .catch((error) => {
        console.log("error :", error);
      });
  };

  const showModal = () => {
    console.log("ok");
    setIsModalVisible(true);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleGroupCancel = () => {
    setIsModalVisible(false);
  };
  // const handleAddMemToGroup = async (uid) => {
  //   console.log("them thanh vien uid ", uid);
  //   console.log("nhóm hiện tại ", curent_id);
  //   if (curent_id != null) {
  //     await axiosInstance
  //       .post(
  //         `/groups/groups/addMember/${curent_id}`,
  //         { selectedMembers: uid },
  //         {
  //           headers: {
  //             "Content-Type": "application/json",
  //             Authorization: `Bearer ${window.localStorage.getItem("token")}`,
  //           },
  //         }
  //       )
  //       .then((response) => {
  //         console.log("response thêm thành viên :", response.data);
  //         dispatch(FetchGroups());
  //       })
  //       .catch((error) => {
  //         console.log("error :", error);
  //       });
  //   }
  //   handleCancel();
  // };

  const handleCheckboxClick = (index) => {
    setSelectedCheckbox((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };
  return (
    <>
      <Box
        p={2}
        sx={{
          width: "100%",
          backgroundColor: "#F8FAFF",
          boxShadowColor: "0px 0px 2px rgba(0, 0, 0, 0.25)",
        }}
      >
        <Stack
          alignItems={"center"}
          direction={"row"}
          justifyContent={"space-between"}
          sx={{ width: "100%", height: "100%" }}
        >
          <Stack
            onClick={() => {
              dispatch(TonggleSiderbar());
            }}
            direction={"row"}
            spacing={2}
          >
            <Box>
              <StyledBadge
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                variant="dot"
              >
                <Avatar alt={nameHeader} src={faker.image.avatar()} />
              </StyledBadge>
            </Box>
            <Stack spacing={0.2}>
              <Typography variant={"subtitle2"}>{nameHeader}</Typography>
              <Typography variant={"caption"}>online</Typography>
            </Stack>
          </Stack>
          <Stack direction={"row"} alignItems={"center"} spacing={3}>
            <IconButton onClick={showModal}>
              <VideoCamera />
            </IconButton>
            <IconButton>
              <VideoCamera />
            </IconButton>
            <IconButton>
              <Phone />
            </IconButton>
            <IconButton>
              <MagnifyingGlass />
            </IconButton>
            <Divider orientation="vertical" flexItem />
            <IconButton>
              <CaretDown />
            </IconButton>
          </Stack>
        </Stack>
      </Box>
      <Modal
        title="Member Add"
        visible={isModalVisible}
        footer={null}
        onCancel={handleCancel}
      >
        <Divider />
        <Divider />
        <List
          itemLayout="horizontal"
          dataSource={ListUser}
          renderItem={(item, index) => (
            // <List.Item>
            //   <List.Item.Meta
            //     avatar={<Avatar src={item.avatar} />}
            //     title={item.fullname}
            //     onClick={() => handleAddMemToGroup(item._id)}
            //   />
            // </List.Item>
            <List.Item>
              <Checkbox
                checked={selectedCheckbox[item._id]}
                onClick={() => handleCheckboxClick(item._id)}
              />
              <List.Item.Meta
                avatar={<Avatar src={item.avatar} />}
                title={item.fullname}
                // onClick={() => handleAddMemToGroup(item._id)}
              />
            </List.Item>
          )}
        />
        <Divider />
        <Button type="primary" onClick={() => Addmember()}>
          Thêm thành viên
        </Button>
        <Button onClick={handleGroupCancel}>Cancel</Button>
      </Modal>
    </>
  );
};

export default Header;
