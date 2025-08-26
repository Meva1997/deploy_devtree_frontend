import { Link } from "react-router-dom";

export default function HomeNavigation() {
  return (
    <>
      <Link
        className="p-2 text-xs font-black text-white uppercase cursror-pointer"
        to="/auth/login"
      >
        Sign In
      </Link>
      <Link
        className="p-2 text-xs font-black uppercase rounded-lg bg-lime-500 text-slate-800 cursror-pointer"
        to="/auth/login"
      >
        Register
      </Link>
    </>
  );
}
