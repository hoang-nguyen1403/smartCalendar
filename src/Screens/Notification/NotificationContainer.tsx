import { Notification } from "./Notification";
import React, { useState, useEffect } from "react";
import { useLazyGetUserQuery } from "@/Services";

export const NotificationContainer = () => {
  const [userId, setUserId] = useState("9");

  const [fetchOne, { data, isSuccess, isLoading, isFetching, error }] =
    useLazyGetUserQuery();

  useEffect(() => {
    fetchOne(userId);
  }, [fetchOne, userId]);

  return <Notification data={data} isLoading={isLoading} />;
};
