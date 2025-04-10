import { Page1 } from "./Page1";
import React, { useState, useEffect } from "react";
import { useLazyGetUserQuery } from "@/Services";

export const Page1Container = () => {
  const [userId, setUserId] = useState("9");

  const [fetchOne, { data, isSuccess, isLoading, isFetching, error }] =
    useLazyGetUserQuery();

  useEffect(() => {
    fetchOne(userId);
  }, [fetchOne, userId]);

  return <Page1 data={data} isLoading={isLoading} />;
};
