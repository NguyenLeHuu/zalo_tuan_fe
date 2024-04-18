import { Box, Stack } from "@mui/material";
import React from "react";
import { Chat_History } from "../../data";
import {
  TextMsg,
  Timeline,
  MediaMsg,
  ReplyMsg,
  LinkMsg,
  DocMsg,
} from "./MsgTypes";
import { FetchChatArr } from "../../redux/slices/app";
import { useDispatch, useSelector } from "react-redux";

const Message = () => {
  const dispatch = useDispatch();

  const { ChatArr, ChatGroupArr } = useSelector((state) => state.app);

  React.useEffect(() => {}, [dispatch]);

  const [chatHistory1, setChatHistory1] = React.useState([]);

  React.useEffect(() => {
    if (ChatArr != null) {
      const newarr = ChatArr.map((chat) => {
        let message = chat.message;
        let subtype = "msg";

        // Check if the message is a link
        if (message.startsWith("http")) {
          subtype = "img";
        }
        return {
          type: "msg",
          // message: message.startsWith("http") ? "" : message,
          message: message,
          subtype: subtype,
          incoming: !chat.fromSelf,
          outgoing: chat.fromSelf,
        };
      });
      console.log("chatHistory1 ", newarr);
      setChatHistory1(newarr);
    }
  }, [ChatArr]);

  return (
    <Box p={3}>
      <Stack spacing={3}>
        {chatHistory1?.map((el) => {
          // {Chat_History?.map((el) => {
          switch (el.type) {
            case "divider":
              //Timeline
              return <Timeline el={el} />;

            case "msg":
              switch (el.subtype) {
                case "img":
                  //ims message
                  return <MediaMsg el={el} />;

                case "doc":
                  //Doc message
                  return <DocMsg el={el} />;

                case "link":
                  //link message
                  return <LinkMsg el={el} />;

                case "reply":
                  //reply message
                  return <ReplyMsg el={el} />;

                default:
                  //text msg
                  return <TextMsg el={el} />;
              }

            default:
              return <></>;
          }
        })}
      </Stack>
    </Box>
  );
};

export default Message;
