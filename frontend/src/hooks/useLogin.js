import React from "react";
import { login } from "../lib/api";
import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

const useLogin = () => {
  const QueryClient = useQueryClient();
  const { mutate, isPending, error } = useMutation({
    mutationFn: login,
    onSuccess: () => QueryClient.invalidateQueries({ queryKey: ["authUser"] }),
  });

  return { error, isPending, loginMutation: mutate };
};

export default useLogin;
