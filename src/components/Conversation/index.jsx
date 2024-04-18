import React from "react";
import {
  Box,
  Stack,
  IconButton,
  InputBase,
  Avatar,
  Badge,
  Typography,
  Divider,
  TextField,
  InputAdornment,
} from "@mui/material";
import { faker } from "@faker-js/faker";
import { alpha, styled, useTheme } from "@mui/material/styles";
import {
  MagnifyingGlass,
  VideoCamera,
  Phone,
  CaretDown,
  LinkSimple,
  Smiley,
  PaperPlaneTilt,
} from "phosphor-react";
import Header from "./Header";
import Footer from "./Footer";
import Message from "./Message";

const Conversation = () => {
  const theme = useTheme();
  return (
    <Stack height={"100%"} maxHeight={"100vh"} width={"auto"}>
      {/* chat header */}
      <Header />
      {/* msg */}
      <Box width={"100%"} sx={{ flexGrow: 1, height: "100%", overflowY: "scroll" }}>
        <Message />
      </Box>

      {/* chat footer */}
      <Footer />
    </Stack>
  );
};

export default Conversation;
