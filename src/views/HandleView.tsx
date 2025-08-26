import { useQuery } from "@tanstack/react-query";
import { Navigate, useParams } from "react-router-dom";
import { getUserByHandle } from "../api/devTreeAPI";
import LoadingHandle from "../components/LoadingHandle";
import HandleData from "../components/HandleData";

export default function HandleView() {
  const params = useParams(); // Get the handle from the URL parameters

  const handle = params.handle!;

  const { data, error, isLoading } = useQuery({
    queryFn: () => getUserByHandle(handle),
    queryKey: ["handle", handle], //! Refetch data when the handle changes and queryKey should be unique for each query
    retry: 1,
  });

  if (isLoading) return <LoadingHandle />;
  if (error) return <Navigate to="/404" />;

  if (data) return <HandleData data={data} />;
}
