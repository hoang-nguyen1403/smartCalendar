import { SignIn } from "./SignIn";
import React, { useState, useEffect } from "react";
import { useLazyGetUserQuery } from "@/Services";

export const SignInContainer = () => {
  const [userId, setUserId] = useState("9");

  const [fetchOne, { data, isSuccess, isLoading, isFetching, error }] =
    useLazyGetUserQuery();

  useEffect(() => {
    fetchOne(userId);
  }, [fetchOne, userId]);

  return <SignIn data={data} isLoading={isLoading} />;
};
