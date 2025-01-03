"use client";

import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

import { useUser } from "@/src/context/user.provider";
import { logout } from "@/src/services/auth-service";

const AuthBtn = () => {
  const { user, setIsLoading } = useUser();
  const router = useRouter();
  const queryClient = useQueryClient();

  const handleLogout = () => {
    logout();
    router.push("/");
    queryClient.removeQueries();
    setIsLoading(true);
  };

  return (
    <>
      {user ? (
        <Button variant="light" color="danger" onClick={handleLogout}>
          Logout
        </Button>
      ) : (
        <Button
          variant="light"
          color="primary"
          onClick={() => router.push("/signin")}
        >
          Signin
        </Button>
      )}
    </>
  );
};

export default AuthBtn;
