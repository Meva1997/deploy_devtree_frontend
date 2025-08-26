import { useQuery } from "@tanstack/react-query";
import { Navigate } from "react-router-dom";
import { getUser } from "../api/devTreeAPI";
import DevTree from "../components/DevTree";
import { Toaster } from "sonner";

export default function AppLayout() {
  const { data, isLoading, isError } = useQuery({
    queryFn: getUser,
    queryKey: ["user"], //! This key is used to cache the user data
    retry: 1, // Retry once on failure
    refetchOnWindowFocus: false, // Do not refetch when the window is focused
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }
  if (isError) {
    //preventing unauthorized access
    return <Navigate to={"/auth/login"} />; // Redirect to login if there's an error fetching user data
  }

  if (data)
    return (
      <>
        <DevTree data={data} />
        <Toaster richColors position="top-right" />
      </>
    );
}
