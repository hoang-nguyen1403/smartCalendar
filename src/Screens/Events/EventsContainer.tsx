import { Events } from "./Events";
import React, { useState, useEffect } from "react";
import { useLazyGetUserQuery } from "@/Services";

export const EventsContainer = () => {
  const [userId, setUserId] = useState("9");

  const [fetchOne, { data, isSuccess, isLoading, isFetching, error }] =
    useLazyGetUserQuery();

  useEffect(() => {
    fetchOne(userId);
  }, [fetchOne, userId]);

  return <Events data={data} isLoading={isLoading} />;
};
