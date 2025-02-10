// Cia pabaigoje butinai turi buti react entry point
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from ".";
import { logOut, setCredentials } from "../store/users/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: API_URL + "/users",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error?.status) {
    console.log("sending refresh token");
    // send refresh token
    const refreshResult = await baseQuery("/refresh", api, extraOptions);
    console.log(refreshResult);
    if (refreshResult.data) {
      const user = api.getState().auth.user;
      // dedam i auth steita duomenis
      api.dispatch(setCredentials({ ...refreshResult.data, user }));

      // tada kartojame uzklausa su nauju access tokenu
      result = await baseQuery(args, api, extraOptions);
    }
  } else {
    api.dispatch(logOut());
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({}),
});
