import React from "react";
import {
  Divider,
  Stack,
  Typography,
  Box,
  Link,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import { alpha, styled, useTheme } from "@mui/material/styles";
import { Chat_History, Message_options } from "../../data";
import {
  Columns,
  DotsThreeVertical,
  DownloadSimple,
  Image,
} from "phosphor-react";
import axiosInstance from "../../configs/axios-conf";
import { useDispatch, useSelector } from "../../redux/store";
import { FetchGroups, updateReplyId } from "../../redux/slices/app";

const DocMsg = ({ el }) => {
  const theme = useTheme();
  return (
    <Stack direction="row" justifyContent={el.incoming ? "start" : "end"}>
      <Box
        p={1.5}
        sx={{
          backgroundColor: el.incoming
            ? theme.palette.background.default
            : theme.palette.primary.main,
          borderRadius: 1.5,
          width: "max-content",
        }}
      >
        <Stack spacing={2}>
          <Stack
            p={2}
            direction="row"
            spacing={3}
            alignItems="center"
            sx={{
              backgroundColor: theme.palette.background.paper,
              borderRadius: 1,
            }}
          >
            <Image size={48} />
            <Typography variant="caption">Abstarct.png</Typography>
            <IconButton>
              <DownloadSimple />
            </IconButton>
          </Stack>
          <Typography
            variant="body2"
            color={el.incoming ? theme.palette.text : "#fff"}
          >
            {el.message}
          </Typography>
        </Stack>
      </Box>
      {/* : */}
      <MessageOptions />
    </Stack>
  );
};

const LinkMsg = ({ el }) => {
  const theme = useTheme();
  return (
    <Stack direction="row" justifyContent={el.incoming ? "start" : "end"}>
      <Box
        p={1.5}
        sx={{
          backgroundColor: el.incoming
            ? theme.palette.background.default
            : theme.palette.primary.main,
          borderRadius: 1.5,
          width: "max-content",
        }}
      >
        <Stack spacing={2}>
          <Stack
            p={2}
            spacing={3}
            alignItems="center"
            sx={{
              backgroundColor: theme.palette.background.paper,
              borderRadius: 1,
            }}
          >
            <img
              src={el.preview}
              alt={el.message}
              style={{ maxHeight: 210, borderRadius: "10px" }}
            />
            <Stack spacing={2}>
              <Typography variant="subtitle2" color={theme.palette.text}>
                Creating Chat App
              </Typography>
              <Typography
                variant="subtitle2"
                sx={{ color: theme.palette.primary.main }}
                component={Link}
                // to="//https://www.youtube.com"
              >
                {/* www.youtube.com */}
              </Typography>
              <Typography
                variant="body2"
                color={el.incoming ? theme.palette.text : "#fff"}
              >
                {el.message}
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </Box>
      {/* : */}
      <MessageOptions />
    </Stack>
  );
};

const ReplyMsg = ({ el }) => {
  const theme = useTheme();
  return (
    <Stack direction="row" justifyContent={el.incoming ? "start" : "end"}>
      <Box
        p={1.5}
        sx={{
          backgroundColor: el.incoming
            ? theme.palette.background.default
            : theme.palette.primary.main,
          borderRadius: 1.5,
          width: "max-content",
        }}
      >
        <Stack spacing={2}>
          <Stack
            p={2}
            direction="column"
            spacing={3}
            alignItems="center"
            sx={{
              backgroundColor: theme.palette.background.paper,
              borderRadius: 1,
            }}
          >
            <Typography variant="body2" color={theme.palette.text}>
              {el.message}
            </Typography>
          </Stack>
          <Typography
            variant="body2"
            color={el.incoming ? theme.palette.text : "#fff"}
          >
            {el.reply}
          </Typography>
        </Stack>
      </Box>
      {/* : */}
      <MessageOptions />
    </Stack>
  );
};

const MediaMsg = ({ el }) => {
  const theme = useTheme();
  return (
    <Stack direction="row" justifyContent={el.incoming ? "start" : "end"}>
      <Box
        p={1.5}
        sx={{
          backgroundColor: el.incoming
            ? theme.palette.background.default
            : theme.palette.primary.main,
          borderRadius: 1.5,
          width: "max-content",
        }}
      >
        <Stack spacing={1}>
          <img
            src={el.message}
            // alt={el.message}
            style={{ maxHeight: 210, maxWidth: 210, borderRadius: "10px" }}
          />
        </Stack>
        <Typography
          variant="body2"
          color={el.incoming ? theme.palette.text : "#fff"}
        >
          {/* {el.message} */}
        </Typography>
      </Box>
      {/* : */}
      <MessageOptions />
    </Stack>
  );
};

const TextMsg = ({ el }) => {
  const theme = useTheme();
  return (
    <Stack direction="row" justifyContent={el.incoming ? "start" : "end"}>
      <Box
        p={1.5}
        sx={{
          backgroundColor: el.incoming
            ? theme.palette.background.default
            : theme.palette.primary.main,
          borderRadius: 1.5,
          width: "max-content",
        }}
      >
        <Typography
          variant="body2"
          color={el.incoming ? theme.palette.text : "#fff"}
        >
          {el.message}
        </Typography>
      </Box>
      {/* : */}
      <MessageOptions msgid={el} />
    </Stack>
  );
};

const Timeline = ({ el }) => {
  const theme = useTheme();
  return (
    <Stack direction="row" alignItems="center" justifyContent="space-between">
      <Divider width="46%" />
      <Typography variant="caption" sx={{ color: theme.palette.text }}>
        {el.text}
      </Typography>
      <Divider width="46%" />
    </Stack>
  );
};

export { Timeline, TextMsg, MediaMsg, ReplyMsg, LinkMsg, DocMsg };

const MessageOptions = ({ msgid }) => {
  const dispatch = useDispatch();

  const [showReplyForm, setShowReplyForm] = React.useState(false);

  React.useEffect(() => {}, [dispatch]);

  const { curent_id } = useSelector((state) => state.app);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClickTitle = (event) => {
    setAnchorEl(event.currentTarget);
    console.log("event ", event);

    switch (event) {
      case "Reply":
        handleReply();
        break;
      case "Forward message":
        handleForward();
        break;
      case "Delete Message":
        handleDelete();
        break;
      default:
    }
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleReply = () => {
    setShowReplyForm(true);
    console.log("gọi update reply_______ ", msgid);
    dispatch(updateReplyId(msgid));
  };

  const handleDelete = async () => {
    await axiosInstance
      .put(
        `/groups/remove`,
        {
          groupId: curent_id,
          msgId: msgid.id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${window.localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        console.log("response xóa tin nhắn trong nhóm :", response.data);
        dispatch(FetchGroups());
      })
      .catch((error) => {
        console.log("error :", error);
      });
  };
  const handleForward = async () => {
    await axiosInstance
      .post(`/groups/msg/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        console.log("response reply tin nhắn trong nhóm :", response.data);
        dispatch(FetchGroups());
      })
      .catch((error) => {
        console.log("error :", error);
      });
  };

  return (
    <>
      <DotsThreeVertical
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        size={20}
      />
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <Stack spacing={1} px={1}>
          {Message_options.map((el, index) => (
            <MenuItem key={index} onClick={() => handleClickTitle(el.title)}>
              {el.title}
            </MenuItem>
          ))}
        </Stack>
      </Menu>
      {showReplyForm && (
        <Box
          sx={{
            position: "absolute",
            top: 650,
            right: 80,
            width: "70%",
            backgroundColor: "#FFFF",
            padding: "10px",
            boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
            borderRadius: "5px",
          }}
        >
          {/* Nội dung giao diện reply */}
          <Typography variant="caption">
            <b>Replying to: </b>
            {msgid.message}
          </Typography>
          <IconButton
            sx={{ marginLeft: "auto" }}
            onClick={() => {
              setShowReplyForm(false);
            }}
          >
            Close
          </IconButton>
        </Box>
      )}
    </>
  );
};
