import { Login } from "./Login";
import React, { useState, useEffect } from "react";
import { useLazyGetUserQuery } from "@/Services";

export const LoginContainer = () => {
  const [userId, setUserId] = useState("9");

  const [fetchOne, { data, isSuccess, isLoading, isFetching, error }] =
    useLazyGetUserQuery();

  useEffect(() => {
    fetchOne(userId);
  }, [fetchOne, userId]);

  return <Login data={data} isLoading={isLoading} />;
};
