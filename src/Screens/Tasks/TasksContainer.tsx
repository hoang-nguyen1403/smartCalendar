import { Tasks } from "./Tasks";
import React, { useState, useEffect } from "react";
import { useLazyGetUserQuery } from "@/Services";

export const TasksContainer = () => {
  const [userId, setUserId] = useState("9");

  const [fetchOne, { data, isSuccess, isLoading, isFetching, error }] =
    useLazyGetUserQuery();

  useEffect(() => {
    fetchOne(userId);
  }, [fetchOne, userId]);

  return <Tasks data={data} isLoading={isLoading} />;
};
