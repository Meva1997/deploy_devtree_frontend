import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export default function AdminNavigation() {
  const queryClient = useQueryClient();

  const logout = () => {
    localStorage.removeItem("AUTH_TOKEN");
    queryClient.invalidateQueries({ queryKey: ["user"] });
    toast.success("Logged out successfully!");
  };

  return (
    <>
      <button
        className="p-2 text-xs font-black uppercase rounded-lg cursor-pointer bg-lime-500 text-slate-800"
        onClick={logout}
      >
        Log Out
      </button>
    </>
  );
}
