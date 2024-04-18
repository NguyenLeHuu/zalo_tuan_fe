import { createSlice } from "@reduxjs/toolkit";

import axiosInstance from "../../configs/axios-conf";

const initialState = {
  sidebar: {
    open: false,
    type: "CONTACT", // can be CONTACT, STARRED, SHARED
  },
  profile: [],
  ChatArr: [],
  ChatGroupArr: [],
  users: [],
  friends: [],
  groups: [],
  friendRequests: [],
};

const slice = createSlice({
  name: "app",
  initialState,
  reducers: {
    //tonggle Siderbar

    updateProfile(state, action) {
      state.profile = action.payload.profile;
    },
    updateChatArr(state, action) {
      state.ChatArr = action.payload.ChatArr;
    },
    clearChatArr(state, action) {
      state.ChatArr = null;
    },
    updateChatGroupArr(state, action) {
      state.ChatGroupArr = action.payload.ChatGroupArr;
    },

    updateUsers(state, action) {
      state.users = action.payload.users;
    },
    updateFriends(state, action) {
      state.friends = action.payload.friends;
    },
    updateGroups(state, action) {
      state.groups = action.payload.groups;
    },
    updateFriendRequests(state, action) {
      state.friendRequests = action.payload.request;
    },
    logout(state, action) {
      state = {};
    },
  },
});

export default slice.reducer;

//

export function TonggleSiderbar() {
  return async () => {
    dispatch(slice.actions.toggleSidebar());
  };
}

export function UpdateSiderbarType(type) {
  return async () => {
    dispatch(slice.actions.updateSiderbarType({ type }));
  };
}

// export const FetchProfile = () => {
//   // console.log("chay lay thong tin người dung");
//   return async (dispatch, getState) => {
//     await axiosInstance
//       .get("/users/profile", {
//         params: {
//           uid: window.localStorage.getItem("user_id"),
//         },
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${window.localStorage.getItem("token")}`,
//         },
//       })
//       .then((response) => {
//         // console.log("response get Profile:", response);

//         dispatch(slice.actions.updateProfile({ profile: response.data }));
//       })
//       .catch((error) => {
//         console.log("error :", error);
//       });
//   };
// };

export const FetchUsers = () => {
  return async (dispatch, getState) => {
    await axiosInstance
      .get("/users/get-users", {
        params: {
          uid: window.localStorage.getItem("user_id"),
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        console.log("response :", response);
        dispatch(slice.actions.updateUsers({ users: response.data.data }));
      })
      .catch((error) => {
        console.log("error :", error);
      });
  };
};

export const FetchFriends = () => {
  return async (dispatch, getState) => {
    // console.log(window.localStorage.getItem("user_id"));
    // console.log(window.localStorage.getItem("token"));
    await axiosInstance
      .get(`/users/getFriends/${window.localStorage.getItem("user_id")}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        console.log("laay ban be :", response.data);
        dispatch(slice.actions.updateFriends({ friends: response.data }));
      })
      .catch((error) => {
        console.log("error :", error);
      });
  };
};

export const FetchGroups = () => {
  return async (dispatch, getState) => {
    await axiosInstance
      .get(`/groups/all`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        console.log("lấy nhóm :", response.data.data);
        dispatch(slice.actions.updateGroups({ groups: response.data.data }));
      })
      .catch((error) => {
        console.log("error :", error);
      });
  };
};

export const FetchFriendRequests = () => {
  return async (dispatch, getState) => {
    await axiosInstance
      .get("/user/get-friend-requests", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        console.log("response :", response);
        dispatch(
          slice.actions.updateFriendRequests({ request: response.data.data })
        );
      })
      .catch((error) => {
        console.log("error :", error);
      });
  };
};
export const FetchChatArrGroup = (req, res) => {
  //cpn msg
  console.log("req nhóm: ", req.messages);
  return async (dispatch, getState) => {
    dispatch(slice.actions.updateChatArr({ ChatArr: req.messages }));
    // dispatch(slice.actions.updateChatArr({ ChatArr: req }));
  };
};
export const FetchChatArr = (to) => {
  return async (dispatch, getState) => {
    await axiosInstance
      .get(
        "/messages/getMessages",

        {
          params: {
            // from: "661b805d579003ab2d6073e4",
            // to: "661b804a579003ab2d6073e2",
            from: window.localStorage.getItem("user_id"),
            to: to,
          },
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${window.localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        console.log("cuoc noi chuyen chatArr", response.data);
        dispatch(slice.actions.updateChatArr({ ChatArr: response.data }));
      })
      .catch((error) => {
        console.log("error :", error);
      });
  };
};

export const FetchChatGroupArr1 = (id) => {
  // console.log("chay vao FetchChatGroupArr1 với id", id);
  return async (dispatch, getState) => {
    await axiosInstance
      .get(`/groups?groupId=${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        console.log("response get tro chuyen nhóm:", response.data);

        dispatch(
          slice.actions.updateChatGroupArr({
            ChatGroupArr: response.data,
          })
        );
        dispatch(slice.actions.clearChatArr({}));
      })
      .catch((error) => {
        console.log("error :", error);
      });
  };
};

export const removeMessage = (id, groupId) => {
  console.log("chay vao FetchChatGroupArr1 với id1", id);
  console.log("chay vao FetchChatGroupArr1 với grid", groupId);
  return async (dispatch, getState) => {
    await axiosInstance
      .put(
        `/groupchat/remove/`,
        {
          msgId: id,
          groupId: groupId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${window.localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        console.log("xoa tin nhan ", response);
        dispatch(FetchChatGroupArr1(groupId));
      })
      .catch((error) => {
        console.log("error :", error);
      });
  };
};
export const signOut = () => {
  return async (dispatch, getState) => {
    dispatch(slice.actions.logout());
  };
};
