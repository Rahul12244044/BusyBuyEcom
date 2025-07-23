import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  users: [],
};

export const signUpAsync = createAsyncThunk(
  "post/signUp",
  async (
    { payload, setNameUser, setTypeCustomer, setLoggedIn, setUserId, setUserExist },
    thunkApi
  ) => {
    try {
      const response = await fetch("http://localhost:3200/api/user/signUp", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          name: payload.name,
          email: payload.email,
          password: payload.password,
          typeUser: payload.userType,
          loggedIn: true,
        }),
      });

      if (response.status === 400) {
        return { signUp: false };
      }

      const responseJson = await response.json();

      // Add user to redux state
      thunkApi.dispatch(userActions.addUser(responseJson));

      // Set context
      setNameUser(responseJson.name);
      setTypeCustomer(responseJson.typeUser);
      setLoggedIn(responseJson.loggedIn);
      setUserId(responseJson.id);

      return {
        signUp: true,
        userId: responseJson.id,
        name: responseJson.name,
        userType: responseJson.typeUser,
      };
    } catch (error) {
      console.error("signUp error", error);
      return { signUp: false };
    }
  }
);

export const signInAsync = createAsyncThunk(
  "post/signIn",
  async ({ payload, setNameUser, setTypeCustomer, setLoggedIn, setUserId }, thunkApi) => {
    try {
      const response = await fetch("http://localhost:3200/api/user/signIn", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          email: payload.email,
          password: payload.password,
        }),
      });

      if (response.status === 404) {
        return thunkApi.rejectWithValue("Invalid email or password");
      }

      const isUserFound = await response.json();

      const structuredUser = {
        userId: isUserFound?.id,
        nameUser: isUserFound?.name,
        typeCustomer: isUserFound?.typeUser,
        loggedIn: isUserFound?.loggedIn,
      };

      setNameUser(structuredUser.nameUser);
      setTypeCustomer(structuredUser.typeCustomer);
      setLoggedIn(structuredUser.loggedIn);
      setUserId(structuredUser.userId);

      return structuredUser;
    } catch (error) {
      console.error("signIn error", error);
      return thunkApi.rejectWithValue("Something went wrong");
    }
  }
);

export const logoutAsyncUser = createAsyncThunk(
  "get/logout",
  async ({ payload, setLoggedIn, setNameUser }, thunkApi) => {
    try {
      console.log("logoutAsyncUser payload:", payload);

      if (!payload) {
        console.warn("No userId provided for logout.");
        return;
      }

      const query = new URLSearchParams({ userId: payload });
      const response = await fetch(`http://localhost:3200/api/user/logout?${query}`);

      const responseJson = await response.json();

      console.log("logout response:", responseJson);

      setLoggedIn(responseJson.loggedIn);
      setNameUser(undefined);

      return responseJson;
    } catch (error) {
      console.error("Logout error:", error);
    }
  }
);

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.users.push(action.payload);
    },
    clearUsers: (state) => {
      state.users = [];
    },
  },
});

export const userReducer = userSlice.reducer;
export const userActions = userSlice.actions;
export const userSelector = (state) => state.userReducer;
