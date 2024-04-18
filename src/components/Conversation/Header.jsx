import React from "react";
import {
  Box,
  Stack,
  IconButton,
  Avatar,
  Typography,
  Divider,
} from "@mui/material";
import { faker } from "@faker-js/faker";
import { alpha, styled, useTheme } from "@mui/material/styles";
import {
  MagnifyingGlass,
  VideoCamera,
  Phone,
  CaretDown,
} from "phosphor-react";
import StyledBadge from "../../styles/StyledBadge";
import { TonggleSiderbar } from "../../redux/slices/app";
import { useDispatch } from "../../redux/store";

const Header = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  return (
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
          <Stack onClick={() =>{
            dispatch(TonggleSiderbar());
          }} direction={"row"} spacing={2}>
            <Box>
              <StyledBadge
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                variant="dot"
              >
                <Avatar
                  alt={faker.name.fullName()}
                  src={faker.image.avatar()}
                />
              </StyledBadge>
            </Box>
            <Stack spacing={0.2}>
              <Typography variant={"subtitle2"}>
                {faker.name.fullName()}
              </Typography>
              <Typography variant={"caption"}>online</Typography>
            </Stack>
          </Stack>
          <Stack direction={"row"} alignItems={"center"} spacing={3}>
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
  )
}

export default Header
